
import { io, Socket } from "socket.io-client";
import {Jeu} from "../Game/Jeu.js";
import {Plateau} from "../Game/Plateau.js";

interface ServerToClientEvents {

    permissionDeJeu : () => void;
    sendWelcomeText : (message : string) => void;
    launchGame : (opponent : string, plateau : Plateau) => void;
}

interface ClientToServerEvents {
    setName: (name:string) => void;
    Play : (plateau : Plateau, scoreCoup : number) => void;
}

export class ClientSock {

    private static instance : ClientSock

    private socket : Socket<ServerToClientEvents, ClientToServerEvents>;
    private static jeu : Jeu;


    private constructor() {

        this.socket = io("http://localhost:8080");

        let sock = this.socket;

        sock.connect();

        sock.on("launchGame",(opponent : string, plateau : Plateau)=>{
            console.log("Your opponent is " + opponent);
            ClientSock.jeu.plateau = plateau;
        })

        sock.emit("setName",ClientSock.jeu.joueur.name);

        sock.on("permissionDeJeu",() => {
            ClientSock.jeu.joueur.isAllowed = true;
        });

        sock.on("sendWelcomeText",(message : string) => {
            console.log(message);
        })

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

}