import {ClientSock} from "./LogIn/ClientSock.js";
import {Jeu} from "./Game/Jeu.js";

//Variable du client
let client : ClientSock;

//variable du jeu
let jeu : Jeu;

//Lance la page de logIn
logInPage();

function logInPage(){
    //Clear du body
    document.body.innerHTML = "";

    //TextField pour stocker le nom
    let nameInput = document.createElement("input");
    nameInput.placeholder = "Name";

    //Bouton de lancement
    let connectButton = document.createElement("button");
    connectButton.textContent = "Connect"

    //Recuperation du nom + Lancement
    connectButton.onclick = (ev)=>{
        jeu = new Jeu(nameInput.value);
        ClientSock.setJeu(jeu)
        client = ClientSock.getInstance();
        gamePage();

    }

    document.body.appendChild(nameInput);
    document.body.appendChild(connectButton);
}

function gamePage(){
    //Clear du body
    document.body.innerHTML = "";

    //Test d'affichage
    //TODO creation du l'UI pour le scrabble
    let test = document.createElement("label");
    test.textContent = "Test";

    document.body.appendChild(test);
}