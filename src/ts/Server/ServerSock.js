import { Server } from "socket.io";
import { createServer } from "node:https";
import { Plateau } from "../Game/Plateau.js";
import { readFileSync } from "node:fs";
/**
 * Classe server
 */
export class ServerSock {
    //Instance server
    static instance;
    //Server Socket.io
    io;
    //Server http
    server;
    //Games supportées par le server
    jeux;
    currentRoom = 0;
    currentRoomFill = 2;
    constructor() {
        this.jeux = new Array();
        this.server = createServer({
            key: readFileSync('/etc/letsencrypt/live/prawnsuit.hopto.org/privkey.pem'),
            cert: readFileSync('/etc/letsencrypt/live/prawnsuit.hopto.org/fullchain.pem')
        });
        this.io = new Server(this.server, {
            cors: {
                origin: "*" // In production, replace with your actual frontend URL
            }
        });
        this.io.on("connection", (socket) => {
            //Recuperer un namespace libre
            let name = "/room";
            if (this.currentRoomFill < 2) {
                this.currentRoomFill++;
            }
            else {
                this.currentRoomFill = 1;
                this.currentRoom++;
                this.setUpRoom(this.io.of(name + this.currentRoom), this.currentRoom);
                console.log("Ouverture de la room : " + name + this.currentRoom);
            }
            socket.emit("askToConnect", "/room" + this.currentRoom);
        });
        this.server.listen(5469, () => {
            console.log("Server is running on https://localhost:5469");
        });
    }
    //Setting up des rooms de jeu
    setUpRoom(nameSpace, index) {
        this.jeux[index] = {
            plateau: new Plateau(10, 10),
            j1: null,
            j2: null,
            currentPlayer: null
        };
        nameSpace.on("connection", (socket) => {
            socket.on("setName", (name) => {
                socket.data.name = name;
                console.log("Nom : " + name);
                console.log("Remplissage de la room" + index);
                console.log(nameSpace.sockets.size + " personnes connectées");
                let jeu = this.jeux[index];
                if (jeu.j1 == null) {
                    jeu.j1 = { nom: socket.data.name, score: 0, socket: socket };
                    socket.emit("sendWelcomeText", "Welcome to room " + index + " please wait for an opponent");
                }
                else {
                    jeu.j2 = { nom: socket.data.name, score: 0, socket: socket };
                    socket.emit("sendWelcomeText", "We were waiting for you, let's start");
                    jeu.currentPlayer = jeu.j1;
                    //Lancement de la partie
                    jeu.j1.socket.emit("launchGame", jeu.j2.nom, jeu.plateau);
                    jeu.j2.socket.emit("launchGame", jeu.j1.nom, jeu.plateau);
                    //Permission de jouer
                    jeu.currentPlayer.socket.emit("permissionDeJeu");
                }
            });
            socket.on("Play", (plateau, scoreCoup) => {
                console.log(this.jeux[index].currentPlayer?.nom + " a joué!");
                let jeu = this.jeux[index];
                jeu.plateau = plateau;
                // @ts-ignore
                jeu.currentPlayer.score += scoreCoup;
                if (jeu.currentPlayer == jeu.j1) {
                    jeu.currentPlayer = jeu.j2;
                }
                else {
                    jeu.currentPlayer = jeu.j1;
                }
                jeu.currentPlayer?.socket.emit("updatePlateau", jeu.plateau);
                jeu.currentPlayer?.socket.emit("permissionDeJeu");
            });
            socket.on("Disconnect", () => {
                console.log("Deconnection de " + socket.data.name);
                if (this.jeux[index].j1?.nom == socket.data.name) {
                    this.jeux[index].j2?.socket.emit("interruptionPartie");
                }
                else {
                    this.jeux[index].j1?.socket.emit("interruptionPartie");
                }
                socket.disconnect();
            });
        });
    }
    static getInstance() {
        if (this.instance == null) {
            this.instance = new ServerSock();
        }
        return this.instance;
    }
    getUsers() {
        return Object.keys(this.io.sockets);
    }
    getNbUsers() {
        return this.getUsers().length;
    }
}
ServerSock.getInstance();
//# sourceMappingURL=ServerSock.js.map