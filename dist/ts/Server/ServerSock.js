import { Server } from "socket.io";
import { createServer } from "node:http";
import { Plateau } from "../Game/Plateau.js";
export class ServerSock {
    static instance;
    io;
    server;
    jeux;
    constructor() {
        this.server = createServer();
        this.io = new Server(this.server, {
            cors: {
                origin: "*" // In production, replace with your actual frontend URL
            }
        });
        this.io.on("connection", (socket) => {
            socket.on("setName", (name) => {
                socket.data.name = name;
                console.log("Nom : " + name);
                //Recuperer un namespace libre
                let i = 0;
                let nameSpace;
                do {
                    let roomName = "/room" + i;
                    if (!this.io._nsps.has(roomName)) {
                        this.setUpRoom(this.io.of(roomName), i);
                    }
                    nameSpace = this.io.of(roomName);
                    console.log(nameSpace.name);
                } while (nameSpace.sockets.size > 1);
                socket.join(nameSpace.name);
            });
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
            jeu.currentPlayer.score += scoreCoup;
            if (jeu.currentPlayer == jeu.j1) {
                jeu.currentPlayer = jeu.j2;
            }
            else {
                jeu.currentPlayer = jeu.j1;
            }
            jeu.currentPlayer.socket.emit("permissionDeJeu");
        });
        nameSpace.on("connection", (socket) => {
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
