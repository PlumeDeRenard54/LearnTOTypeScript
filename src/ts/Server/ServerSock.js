import { Server } from "socket.io";
import { createServer } from "node:http";
import { Plateau } from "../Game/Plateau.js";
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
    constructor() {
        this.jeux = new Array();
        this.server = createServer();
        this.io = new Server(this.server, {
            cors: {
                origin: "*" // In production, replace with your actual frontend URL
            }
        });
        this.io.on("connection", (socket) => {
            //Recuperer un namespace libre
            let i = 0;
            let nameSpace;
            do {
                let roomName = "/room" + i;
                if (!this.io._nsps.has(roomName)) {
                    this.setUpRoom(this.io.of(roomName), i);
                    console.log("Ouverture de la room : " + roomName);
                }
                nameSpace = this.io.of(roomName);
            } while (nameSpace.sockets.size > 1);
            socket.emit("askToConnect", nameSpace.name);
        });
        this.server.listen(8080, () => {
            console.log("Server is running on http://localhost:8080");
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
        nameSpace.on("Play", (plateau, scoreCoup) => {
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
            // @ts-ignore
            jeu.currentPlayer.socket.emit("permissionDeJeu");
        });
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