"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jeu = void 0;
var Dictionnaire_1 = require("./Dictionnaire");
var Player_1 = require("./Player");
var Jeu = /** @class */ (function () {
    function Jeu(playerName) {
        this.dico = Dictionnaire_1.Dictionnaire.getDictionnaire();
        this.joueur = new Player_1.Player(playerName);
    }
    Jeu.prototype.placerJeton = function (x, y, jeton) {
        jeton.isNew = true;
        this.plateau.grille[x][y] = jeton;
    };
    Jeu.prototype.validerJeu = function () {
        if (this.checkHorizontal() && this.checkVertical()) {
            return this.calulerScore();
        }
        else {
            return -1;
        }
    };
    Jeu.prototype.calulerScore = function () {
        var score = 0;
        for (var _i = 0, _a = this.plateau.grille; _i < _a.length; _i++) {
            var ligne = _a[_i];
            for (var _b = 0, ligne_1 = ligne; _b < ligne_1.length; _b++) {
                var caseo = ligne_1[_b];
                if (caseo.isNew) {
                    score += caseo.score;
                    caseo.isNew = false;
                }
            }
        }
        return score;
    };
    Jeu.prototype.checkVertical = function () {
        var grille = this.plateau.grille;
        for (var _i = 0, grille_1 = grille; _i < grille_1.length; _i++) {
            var ligne = grille_1[_i];
            var mots = new Array();
            var nbMot = 1;
            for (var _a = 0, ligne_2 = ligne; _a < ligne_2.length; _a++) {
                var tile = ligne_2[_a];
                if (tile == null) {
                    nbMot++;
                }
                else {
                    mots[nbMot] += tile.lettre;
                }
            }
            for (var _b = 0, mots_1 = mots; _b < mots_1.length; _b++) {
                var mot = mots_1[_b];
                if (mot.length > 1 && !this.dico.contains(mot)) {
                    return false;
                }
            }
        }
        return true;
    };
    Jeu.prototype.checkHorizontal = function () {
        var grille = this.plateau.grille;
        for (var i = 0; i < grille[0].length; i++) {
            var mots = new Array();
            var nbMot = 1;
            for (var j = 0; j < grille.length; j++) {
                if (grille[j][i] == null) {
                    nbMot++;
                }
                else {
                    mots[nbMot] += grille[j][i].lettre;
                }
            }
            for (var _i = 0, mots_2 = mots; _i < mots_2.length; _i++) {
                var mot = mots_2[_i];
                if (mot.length > 1 && !this.dico.contains(mot)) {
                    return false;
                }
            }
        }
        return true;
    };
    return Jeu;
}());
exports.Jeu = Jeu;
