import { Dictionnaire } from "./Dictionnaire.js";
import { Player } from "./Player.js";
export class Jeu {
    dico = Dictionnaire.getDictionnaire();
    plateau;
    joueur;
    constructor(playerName) {
        this.joueur = new Player(playerName);
    }
    placerJeton(x, y, jeton) {
        jeton.isNew = true;
        this.plateau.grille[x][y] = jeton;
    }
    validerJeu() {
        if (this.checkHorizontal() && this.checkVertical()) {
            return this.calulerScore();
        }
        else {
            return -1;
        }
    }
    calulerScore() {
        let score = 0;
        for (let ligne of this.plateau.grille) {
            for (let caseo of ligne) {
                if (caseo.isNew) {
                    score += caseo.score;
                    caseo.isNew = false;
                }
            }
        }
        return score;
    }
    checkVertical() {
        let grille = this.plateau.grille;
        for (let ligne of grille) {
            let mots = new Array();
            let nbMot = 1;
            for (let tile of ligne) {
                if (tile == null) {
                    nbMot++;
                }
                else {
                    mots[nbMot] += tile.lettre;
                }
            }
            for (let mot of mots) {
                if (mot.length > 1 && !this.dico.contains(mot)) {
                    return false;
                }
            }
        }
        return true;
    }
    checkHorizontal() {
        let grille = this.plateau.grille;
        for (let i = 0; i < grille[0].length; i++) {
            let mots = new Array();
            let nbMot = 1;
            for (let j = 0; j < grille.length; j++) {
                if (grille[j][i] == null) {
                    nbMot++;
                }
                else {
                    mots[nbMot] += grille[j][i].lettre;
                }
            }
            for (let mot of mots) {
                if (mot.length > 1 && !this.dico.contains(mot)) {
                    return false;
                }
            }
        }
        return true;
    }
}
