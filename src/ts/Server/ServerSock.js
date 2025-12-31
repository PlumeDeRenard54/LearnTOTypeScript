"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerSock = void 0;
var socket_io_1 = require("socket.io");
var node_http_1 = require("node:http");
var Plateau_1 = require("../Game/Plateau");
var ServerSock = /** @class */ (function () {
    function ServerSock() {
        var _this = this;
        this.server = (0, node_http_1.createServer)();
        this.io = new socket_io_1.Server(this.server, {
            cors: {
                origin: "*" // In production, replace with your actual frontend URL
            }
        });
        this.io.on("connection", function (socket) {
            socket.on("setName", function (name) {
                socket.data.name = name;
                console.log("Nom : " + name);
                //Recuperer un namespace libre
                var i = 0;
                var nameSpace;
                do {
                    var roomName = "/room" + i;
                    if (!_this.io._nsps.has(roomName)) {
                        _this.setUpRoom(_this.io.of(roomName), i);
                    }
                    nameSpace = _this.io.of(roomName);
                    console.log(nameSpace.name);
                } while (nameSpace.sockets.size > 1);
                socket.join(nameSpace.name);
            });
        });
        this.server.listen(8080, function () {
            console.log("Server is running on http://localhost:8080");
        });
    }
    //Setting up des rooms de jeu
    ServerSock.prototype.setUpRoom = function (nameSpace, index) {
        var _this = this;
        this.jeux[index] = {
            plateau: new Plateau_1.Plateau(10, 10),
            j1: null,
            j2: null,
            currentPlayer: null
        };
        nameSpace.on("Play", function (plateau, scoreCoup) {
            var jeu = _this.jeux[index];
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
        nameSpace.on("connection", function (socket) {
            var jeu = _this.jeux[index];
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
    };
    ServerSock.getInstance = function () {
        if (this.instance == null) {
            this.instance = new ServerSock();
        }
        return this.instance;
    };
    ServerSock.prototype.getUsers = function () {
        return Object.keys(this.io.sockets);
    };
    ServerSock.prototype.getNbUsers = function () {
        return this.getUsers().length;
    };
    return ServerSock;
}());
exports.ServerSock = ServerSock;
