import { ClientSock } from "./LogIn/ClientSock.js";
import { Jeu } from "./Game/Jeu.js";
let client;
let jeu;
logInPage();
function logInPage() {
    document.body.innerHTML = "";
    let nameInput = document.createElement("input");
    nameInput.placeholder = "Name";
    let connectButton = document.createElement("button");
    connectButton.textContent = "Connect";
    connectButton.onclick = (ev) => {
        jeu = new Jeu(nameInput.value);
        ClientSock.setJeu(jeu);
        client = ClientSock.getInstance();
        gamePage();
    };
    document.body.appendChild(nameInput);
    document.body.appendChild(connectButton);
}
function gamePage() {
    document.body.innerHTML = "";
    let test = document.createElement("label");
    test.textContent = "Test";
    document.body.appendChild(test);
}
