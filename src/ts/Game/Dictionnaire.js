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
        this.dictionnaire = new Array();
        this.loadDictionary();
    }
    async loadDictionary() {
        const response = await fetch('../data/dataDictionnaire'); // Path relative to your HTML
        const csvData = await response.text();
        this.dictionnaire = csvData.split("\n");
        // Now you can parse your CSV string
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
//# sourceMappingURL=Dictionnaire.js.map