import { io } from "socket.io-client";
//Partie client du server
export class ClientSock {
    //Instance du client
    static instance;
    //Socket reliant le client au server
    socket;
    //Jeu géré par le client
    static jeu;
    constructor() {
        this.socket = io("http://localhost:8080");
        let sock = this.socket;
        sock.connect();
        sock.on("launchGame", (opponent, plateau) => {
            console.log("Your opponent is " + opponent);
            ClientSock.jeu.plateau = plateau;
        });
        sock.emit("setName", ClientSock.jeu.joueur.name);
        sock.on("permissionDeJeu", () => {
            ClientSock.jeu.joueur.isAllowed = true;
        });
        sock.on("sendWelcomeText", (message) => {
            console.log(message);
        });
    }
    static getInstance() {
        if (this.instance == null) {
            this.instance = new ClientSock();
        }
        return this.instance;
    }
    static setJeu(jeu) {
        this.jeu = jeu;
    }
}
