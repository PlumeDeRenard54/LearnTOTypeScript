
// @ts-ignore
import { io, Socket } from "https://cdn.socket.io/4.8.3/socket.io.esm.min.js";
import {Jeu} from "../Game/Jeu.js";
import {Plateau} from "../Game/Plateau.js";
import {gamePage} from "../MainCode.js";

//Fonction Server -> Client
interface ServerToClientEvents {

    askToConnect : (room : string)=>void;
    permissionDeJeu : () => void;
    sendWelcomeText : (message : string) => void;
    launchGame : (opponent : string, plateau : Plateau) => void;
    updatePlateau : (map : Plateau) => void;
    interruptionPartie : ()=>void;
}

//Fonction Client -> Server
interface ClientToServerEvents {
    setName: (name:string) => void;
    Play : (plateau : Plateau, scoreCoup : number) => void;
    Disconnect : () => void ;
}

//Partie client du server
export class ClientSock {

    //Instance du client
    private static instance : null | ClientSock

    public static opponent : null | string;

    //Socket reliant le client au server
    private socket : Socket<ServerToClientEvents, ClientToServerEvents>;
    //Jeu géré par le client
    private static jeu : Jeu;


    private constructor() {

        this.socket = io("http://prawn:80");

        this.socket.on("askToConnect",(room : string)=>{
            console.log("Connexion à la room " + room);
            this.socket = io("http://localhost:80"+room);

            this.socket.on("launchGame",(opponent : string, plateau : Plateau)=>{
                console.log("Lancement du jeu")
                console.log("Your opponent is " + opponent);
                ClientSock.opponent = opponent;
                ClientSock.jeu.plateau = plateau;
                ClientSock.jeu.joueur.fillDeck();
                gamePage();
            })

            this.socket.on("permissionDeJeu",() => {
                console.log("Reception de la permission de jeu")
                ClientSock.jeu.joueur.add2Deck(2);
                ClientSock.jeu.joueur.isAllowed = true;
                gamePage();
            });

            this.socket.on("sendWelcomeText",(message : string) => {
                console.log(message);
            })

            this.socket.emit("setName",ClientSock.jeu.joueur.name);

            this.socket.on("updatePlateau",(map : Plateau) =>  {
                ClientSock.jeu.plateau = map;
            })

            this.socket.on("interruptionPartie",()=>{
                ClientSock.instance = null;
                ClientSock.opponent = null;
                gamePage();
            })
        });
    }

    public static getInstance():ClientSock{
        if (this.instance == null){
            this.instance = new ClientSock();
        }
        return this.instance;
    }

    public static setJeu(jeu : Jeu){
        this.jeu = jeu;
    }

    public async play(){
        let play = ClientSock.jeu.validerJeu();

        if (play != -1){
            console.log("A joué !");
            this.socket.emit("Play",ClientSock.jeu.plateau,play);
            gamePage();
        }

    }

    public disconnect():void{
        this.socket.emit("Disconnect");
    }

}
