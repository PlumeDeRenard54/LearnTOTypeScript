import {ClientSock} from "./LogIn/ClientSock.js";
import {Jeu} from "./Game/Jeu.js";
import {VueTile} from "./Affichage/VueTile.js";

customElements.define("vue-tile", VueTile);

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
    nameInput.className = "nameInput"
    nameInput.placeholder = "Name";

    //Bouton de lancement
    let connectButton = document.createElement("button");
    connectButton.className = "connectButton"
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

export function gamePage(){
    //Clear du body
    document.body.innerHTML = "";

    //Nom de l'utilisateur
    let nom : HTMLLabelElement = document.createElement("label")
    nom.textContent = jeu.joueur.name;

    //Grille
    let grille = document.createElement("div");
    grille.className = "grille"
    grille.style.gridTemplateColumns = "repeat("+jeu.plateau.grille.length+",1fr)";

    for ( let i = 0 ; i<jeu.plateau.grille.length ; i++){
        for (let j=0 ; j<jeu.plateau.grille[0].length ; j++){
            let vue : VueTile =new VueTile(jeu.plateau.grille[i][j],i,j,jeu)
            grille.appendChild(vue)
            if (!jeu.joueur.isAllowed){
                vue.style.backgroundColor = "grey";
                vue.draggable = false;
            }
        }
    }

    //Deck
    let deck = document.createElement("div");
    deck.className = "deck"
    deck.style.gridTemplateColumns = "repeat("+jeu.joueur.deck.length +",1fr)";
    for ( let tile of jeu.joueur.deck){
        let vue : VueTile = new VueTile(tile,-1,-1,jeu);
        deck.appendChild(vue)
        if (!jeu.joueur.isAllowed){
            vue.style.backgroundColor = "grey";
            vue.draggable = false;
        }
    }

    //Bonton de validafion
    let validation : HTMLElement = document.createElement("Button");
    validation.textContent = "Validation"
    if (jeu.joueur.isAllowed){
        validation.onclick=(e)=>{
            ClientSock.getInstance().play();
        }
    }else{
        validation.style.backgroundColor = "grey";
    }
    deck.appendChild(validation);


    document.body.appendChild(nom)
    document.body.appendChild(grille);
    document.body.appendChild(deck)
}