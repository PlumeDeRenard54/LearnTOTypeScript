import * as fs from 'fs';

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
        let contenu : string = fs.readFileSync("../data/dataDictionnaire").toString();
        this.dictionnaire = contenu.split("\n");
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