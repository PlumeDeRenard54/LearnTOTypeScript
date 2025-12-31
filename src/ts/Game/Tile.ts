/**
 * Objet Tile
 */
export class Tile {
    //Lettre de la tuile
    lettre: string
    //Nombre de points donnés lors du scoring
    score : number
    //Si la tuile viens d'être placée ou pas
    isNew : boolean

    constructor(lettre : string , score : number) {
            this.lettre = lettre;
            this.score = score;
    }

}