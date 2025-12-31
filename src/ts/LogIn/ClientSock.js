"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSock = void 0;
var socket_io_client_1 = require("socket.io-client");
var ClientSock = /** @class */ (function () {
    function ClientSock() {
        this.socket = (0, socket_io_client_1.io)("http://localhost:8080");
        var sock = this.socket;
        sock.connect();
        sock.on("launchGame", function (opponent, plateau) {
            console.log("Your opponent is " + opponent);
            ClientSock.jeu.plateau = plateau;
        });
        sock.emit("setName", ClientSock.jeu.joueur.name);
        sock.on("permissionDeJeu", function () {
            ClientSock.jeu.joueur.isAllowed = true;
        });
        sock.on("sendWelcomeText", function (message) {
            console.log(message);
        });
    }
    ClientSock.getInstance = function () {
        if (this.instance == null) {
            this.instance = new ClientSock();
        }
        return this.instance;
    };
    ClientSock.setJeu = function (jeu) {
        this.jeu = jeu;
    };
    return ClientSock;
}());
exports.ClientSock = ClientSock;
