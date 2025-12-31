import * as fs from 'fs';
export class Dictionnaire {
    static singleton;
    dictionnaire;
    constructor() {
        let contenu = fs.readFileSync("../data/dataDictionnaire").toString();
        this.dictionnaire = contenu.split("\n");
    }
    static getDictionnaire() {
        if (this.singleton == null) {
            this.singleton = new Dictionnaire();
        }
        return this.singleton;
    }
    contains(s) {
        return (this.dictionnaire.indexOf(s) != -1);
    }
}
