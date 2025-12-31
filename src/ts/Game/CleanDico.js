"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var contenu;
var lignes;
var donneesTraitees = new Array();
contenu = fs.readFileSync("../data/Words.csv").toString();
lignes = contenu.split("\n");
lignes = lignes.slice(2, lignes.length);
//Recuperation des mots
for (var _i = 0, lignes_1 = lignes; _i < lignes_1.length; _i++) {
    var ligne = lignes_1[_i];
    var mot = ligne.split(",")[1].toLowerCase();
    mot = mot.replace(/[éêè]/g, "e");
    mot = mot.replace("'", "");
    mot = mot.replace("-", "");
    mot = mot.replace("ù", "u");
    mot = mot.replace("ô", "o");
    mot = mot.replace(/[àâ]/g, "a");
    donneesTraitees.push(mot);
}
//Concatenation des donnees
contenu = "";
for (var _a = 0, donneesTraitees_1 = donneesTraitees; _a < donneesTraitees_1.length; _a++) {
    var mot = donneesTraitees_1[_a];
    contenu += mot + "\n";
}
fs.writeFileSync("../data/dataDictionnaire", contenu);
