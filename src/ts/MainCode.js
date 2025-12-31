"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientSock_1 = require("./LogIn/ClientSock");
var Jeu_1 = require("./Game/Jeu");
var client;
var jeu;
logInPage();
function logInPage() {
    document.body.innerHTML = "";
    var nameInput = document.createElement("input");
    nameInput.placeholder = "Name";
    var connectButton = document.createElement("button");
    connectButton.textContent = "Connect";
    connectButton.onclick = function (ev) {
        jeu = new Jeu_1.Jeu(nameInput.value);
        ClientSock_1.ClientSock.setJeu(jeu);
        client = ClientSock_1.ClientSock.getInstance();
        gamePage();
    };
    document.body.appendChild(nameInput);
    document.body.appendChild(connectButton);
}
function gamePage() {
    document.body.innerHTML = "";
    var test = document.createElement("label");
    test.textContent = "Test";
    document.body.appendChild(test);
}
