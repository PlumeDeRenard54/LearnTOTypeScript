// Fichier a executer une fois pour nettoyer la bd du fichier Words.csv
import * as fs from 'fs';
let contenu;
let lignes;
let donneesTraitees = new Array();
contenu = fs.readFileSync("../data/Words.csv").toString();
lignes = contenu.split("\n");
lignes = lignes.slice(2, lignes.length);
//Recuperation des mots
for (let ligne of lignes) {
    let mot = ligne.split(",")[1].toLowerCase();
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
for (let mot of donneesTraitees) {
    contenu += mot + "\n";
}
fs.writeFileSync("../data/dataDictionnaire", contenu);
