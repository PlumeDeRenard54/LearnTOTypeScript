
import { io, Socket } from "socket.io-client";
import {Jeu} from "../Game/Jeu.js";
import {Plateau} from "../Game/Plateau.js";

//Fonction Server -> Client
interface ServerToClientEvents {

    permissionDeJeu : () => void;
    sendWelcomeText : (message : string) => void;
    launchGame : (opponent : string, plateau : Plateau) => void;
}

//Fonction Client -> Server
interface ClientToServerEvents {
    setName: (name:string) => void;
    Play : (plateau : Plateau, scoreCoup : number) => void;
}

//Partie client du server
export class ClientSock {

    //Instance du client
    private static instance : ClientSock

    //Socket reliant le client au server
    private socket : Socket<ServerToClientEvents, ClientToServerEvents>;
    //Jeu géré par le client
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