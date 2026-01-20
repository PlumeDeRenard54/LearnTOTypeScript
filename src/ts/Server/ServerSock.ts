import {Namespace, Server,Socket} from "socket.io";
import {createServer,Server as httpServer} from "node:http";
import {Plateau} from "../Game/Plateau.js";

/**
 * Fonctions Server -> Client
 */
interface ServerToClientEvents {

    askToConnect : (room : string)=>void;
    permissionDeJeu : () => void;
    sendWelcomeText : (message : string) => void;
    launchGame : (opponent : string, plateau : Plateau) => void;
    updatePlateau : (map : Plateau) => void;
    interruptionPartie : ()=>void;

}

/**
 * Fonctions Client -> Server
 */
interface ClientToServerEvents {
    setName: (name:string) => void;
    Play : (plateau : Plateau, scoreCoup : number) => void;
    Disconnect : () => void ;
}

/**
 * Inutile (Server -> Server)
 */
interface InterServerEvents {
    ping: () => void;
}

/**
 * Données stockées avec les sockets client
 */
interface SocketData {
    name: string;
}

/**
 * Type joueur server
 */
type joueur = {
    nom : string
    score : number
    socket : Socket
}

/**
 * Type jeu server
 */
type game = {
    plateau : Plateau
    j1 : joueur |null
    j2 : joueur | null
    currentPlayer : joueur | null
}

/**
 * Classe server
 */
export class ServerSock {
    //Instance server
    private static instance: ServerSock

    //Server Socket.io
    private io: Server
    //Server http
    private server : httpServer;
    //Games supportées par le server
    private jeux : Array<game>

    private currentRoom = 0;
    private currentRoomFill = 2

    private constructor() {
        this.jeux = new Array<game>()
        this.server = createServer();
        this.io = new Server<
            ClientToServerEvents,
            ServerToClientEvents,
            InterServerEvents,
            SocketData
        >(this.server,{
            cors: {
                origin: "*" // In production, replace with your actual frontend URL
            }
        });


        this.io.on("connection", (socket) => {

            //Recuperer un namespace libre

            let name = "/room";

            if (this.currentRoomFill < 2){
                this.currentRoomFill++;
            }else{
                this.currentRoomFill = 1;
                this.currentRoom++;
                this.setUpRoom(this.io.of(name+this.currentRoom),this.currentRoom)
                console.log("Ouverture de la room : " + name+this.currentRoom);
            }

            socket.emit("askToConnect","/room"+this.currentRoom);
        });

        this.server.listen(8080, () => {
            console.log("Server is running on http://localhost:8080");
        });
    }

    //Setting up des rooms de jeu
    private setUpRoom(nameSpace : Namespace,index : number){


        this.jeux[index]={
            plateau : new Plateau(10,10),
            j1 : null,
            j2 :null,
            currentPlayer : null
        };

        nameSpace.on("connection",(socket) =>{

            socket.on("setName", (name:string) => {
                socket.data.name = name;
                console.log("Nom : " + name);

                console.log("Remplissage de la room" + index);
                console.log(nameSpace.sockets.size + " personnes connectées");

                let jeu = this.jeux[index];
                if (jeu.j1 == null) {
                    jeu.j1 = {nom: socket.data.name, score: 0, socket: socket}
                    socket.emit("sendWelcomeText", "Welcome to room " + index + " please wait for an opponent")
                } else {
                    jeu.j2 = {nom: socket.data.name, score: 0, socket: socket}
                    socket.emit("sendWelcomeText", "We were waiting for you, let's start")
                    jeu.currentPlayer = jeu.j1;

                    //Lancement de la partie
                    jeu.j1.socket.emit("launchGame", jeu.j2.nom, jeu.plateau);
                    jeu.j2.socket.emit("launchGame", jeu.j1.nom, jeu.plateau);

                    //Permission de jouer
                    jeu.currentPlayer.socket.emit("permissionDeJeu");
                }
            });

            socket.on("Play",(plateau : Plateau , scoreCoup : number)=>{
                console.log(this.jeux[index].currentPlayer?.nom + " a joué!")
                let jeu = this.jeux[index];
                jeu.plateau = plateau;
                // @ts-ignore
                jeu.currentPlayer.score += scoreCoup;
                if (jeu.currentPlayer == jeu.j1){
                    jeu.currentPlayer = jeu.j2;
                }else {
                    jeu.currentPlayer = jeu.j1
                }
                jeu.currentPlayer?.socket.emit("updatePlateau",jeu.plateau);
                jeu.currentPlayer?.socket.emit("permissionDeJeu")
            });

            socket.on("Disconnect", ()=>{
                console.log("Deconnection de " + socket.data.name);
                if (this.jeux[index].j1?.nom == socket.data.name ){
                    this.jeux[index].j2?.socket.emit("interruptionPartie");
                }else{
                    this.jeux[index].j1?.socket.emit("interruptionPartie");
                }

                socket.disconnect();
            });
        })

    }

    public static getInstance(): ServerSock{
        if (this.instance == null){
            this.instance = new ServerSock();
        }
        return this.instance;
    }

    public getUsers(){
        return Object.keys(this.io.sockets);
    }

    public getNbUsers(){
        return this.getUsers().length;
    }
}

ServerSock.getInstance();