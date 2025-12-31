import * as fs from 'fs';
/**
 * Dictionnaire contenant la liste entiere des mots utilisables
 */
export class Dictionnaire {
    /**
     * instance du dictionnaire
     * @private
     */
    static singleton;
    /**
     * dictionnaire
     */
    dictionnaire;
    constructor() {
        let contenu = fs.readFileSync("../data/dataDictionnaire").toString();
        this.dictionnaire = contenu.split("\n");
    }
    /**
     * Methode de recuperation du dico
     */
    static getDictionnaire() {
        if (this.singleton == null) {
            this.singleton = new Dictionnaire();
        }
        return this.singleton;
    }
    /**
     * recherche de mot
     * @param s
     */
    contains(s) {
        return (this.dictionnaire.indexOf(s) != -1);
    }
}
