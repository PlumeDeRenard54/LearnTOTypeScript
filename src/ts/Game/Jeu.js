import { Dictionnaire } from "./Dictionnaire.js";
import { Plateau } from "./Plateau.js";
import { Player } from "./Player.js";
/**
 * Classe représentant le backend du jeu
 */
export class Jeu {
    // Dictionnaire utilisé
    dico = Dictionnaire.getDictionnaire();
    // Plateau contenant les tiles
    plateau;
    //Joueur local
    joueur;
    constructor(playerName) {
        this.joueur = new Player(playerName);
        this.plateau = new Plateau(10, 10);
    }
    //Methode pour placer un nouveau jeton sur la grille
    placerJeton(x, y, jeton) {
        jeton.isNew = true;
        this.plateau.grille[x][y] = jeton;
    }
    //Checke si le jeu est valide et renvoie le score de l'action
    validerJeu() {
        if (this.checkHorizontal() && this.checkVertical()) {
            let score = this.calulerScore();
            console.log("score du coup : " + score);
            this.joueur.isAllowed = false;
            return score;
        }
        else {
            return -1;
        }
    }
    //Calcule le score de l'action et note les nouvelles tiles comme déjà jouées
    calulerScore() {
        let score = 0;
        for (let ligne of this.plateau.grille) {
            for (let caseo of ligne) {
                if (caseo != null && caseo.isNew) {
                    score += caseo.score;
                    caseo.isNew = false;
                }
            }
        }
        return score;
    }
    //Verifie que les mots verticaux sont valides
    checkVertical() {
        let inMot = false;
        let grille = this.plateau.grille;
        let mots = new Array();
        let nbMot = -1;
        for (let ligne of grille) {
            for (let tile of ligne) {
                if (tile != null) {
                    if (inMot) {
                        nbMot++;
                        mots[nbMot] = "";
                        inMot = true;
                    }
                    mots[nbMot] += tile.lettre;
                }
                else {
                    inMot = false;
                }
            }
        }
        for (let mot of mots) {
            console.log("verif vertical" + mots);
            if (mot.length > 1 && !this.dico.contains(mot)) {
                return false;
            }
        }
        return true;
    }
    //Check si les mots horizontaux sont valides
    checkHorizontal() {
        let inMot = false;
        let grille = this.plateau.grille;
        let mots = new Array();
        let nbMot = -1;
        for (let i = 0; i < grille[0].length; i++) {
            for (let j = 0; j < grille.length; j++) {
                if (grille[j][i] != null) {
                    if (!inMot) {
                        nbMot++;
                        mots[nbMot] = "";
                        inMot = true;
                    }
                    mots[nbMot] += grille[j][i].lettre;
                }
                else {
                    inMot = false;
                }
            }
            inMot = false;
            console.log("verif horizontal " + mots);
        }
        for (let mot of mots) {
            if (mot.length > 1 && !this.dico.contains(mot)) {
                return false;
            }
        }
        return true;
    }
}
//# sourceMappingURL=Jeu.js.map