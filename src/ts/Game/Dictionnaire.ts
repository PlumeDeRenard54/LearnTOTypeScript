/**
 * Dictionnaire contenant la liste entiere des mots utilisables
 */
export class Dictionnaire{

    /**
     * instance du dictionnaire
     * @private
     */
    private static singleton : Dictionnaire;

    /**
     * dictionnaire
     */
    dictionnaire : Array<string>;

    private constructor() {
        this.dictionnaire = new Array<string>();
        this.loadDictionary();
    }

    private async loadDictionary() {
        const response = await fetch('../data/dataDictionnaire'); // Path relative to your HTML
        const csvData = await response.text();
        this.dictionnaire = csvData.split("\n");
        // Now you can parse your CSV string
    }

    /**
     * Methode de recuperation du dico
     */
    public static getDictionnaire() : Dictionnaire{
        if (this.singleton==null){
            this.singleton = new Dictionnaire();
        }
        return this.singleton;
    }

    /**
     * recherche de mot
     * @param s
     */
    public contains(s:string) : boolean{
        return (this.dictionnaire.indexOf(s) != -1);
    }


}