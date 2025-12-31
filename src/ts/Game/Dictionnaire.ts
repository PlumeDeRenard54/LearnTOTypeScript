import * as fs from 'fs';

export class Dictionnaire{

    private static singleton : Dictionnaire;

    dictionnaire : Array<string>;

    private constructor() {
        let contenu : string = fs.readFileSync("../data/dataDictionnaire").toString();
        this.dictionnaire = contenu.split("\n");
    }

    public static getDictionnaire() : Dictionnaire{
        if (this.singleton==null){
            this.singleton = new Dictionnaire();
        }
        return this.singleton;
    }

    public contains(s:string) : boolean{
        return (this.dictionnaire.indexOf(s) != -1);
    }


}