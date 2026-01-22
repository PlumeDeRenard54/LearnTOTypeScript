// @ts-ignore
import { io } from "https://cdn.socket.io/4.8.3/socket.io.esm.min.js";
import { gamePage } from "../MainCode.js";
//Partie client du server
export class ClientSock {
    //Instance du client
    static instance;
    static opponent;
    //Socket reliant le client au server
    socket;
    //Jeu géré par le client
    static jeu;
    constructor() {
        this.socket = io("http://prawnsuit.hopto.org/:5469");
        this.socket.on("askToConnect", (room) => {
            console.log("Connexion à la room " + room);
            this.socket.disconnect();
            this.socket = io("http://prawnsuit.hopto.org:5469" + room);
            this.socket.on("launchGame", (opponent, plateau) => {
                console.log("Lancement du jeu");
                console.log("Your opponent is " + opponent);
                ClientSock.opponent = opponent;
                ClientSock.jeu.plateau = plateau;
                ClientSock.jeu.joueur.fillDeck();
                gamePage();
            });
            this.socket.on("permissionDeJeu", () => {
                console.log("Reception de la permission de jeu");
                ClientSock.jeu.joueur.add2Deck(2);
                ClientSock.jeu.joueur.isAllowed = true;
                gamePage();
            });
            this.socket.on("sendWelcomeText", (message) => {
                console.log(message);
            });
            this.socket.emit("setName", ClientSock.jeu.joueur.name);
            this.socket.on("updatePlateau", (map) => {
                ClientSock.jeu.plateau = map;
            });
            this.socket.on("interruptionPartie", () => {
                ClientSock.instance = null;
                ClientSock.opponent = null;
                gamePage();
            });
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
    async play() {
        let play = ClientSock.jeu.validerJeu();
        if (play != -1) {
            console.log("A joué !");
            this.socket.emit("Play", ClientSock.jeu.plateau, play);
            gamePage();
        }
    }
    disconnect() {
        this.socket.emit("Disconnect");
    }
}
//# sourceMappingURL=ClientSock.js.map