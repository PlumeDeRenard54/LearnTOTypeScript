/**
 * Objet Tile
 */
export class Tile {
    //Lettre de la tuile
    lettre;
    //Nombre de points donnés lors du scoring
    score;
    //Si la tuile viens d'être placée ou pas
    isNew;
    constructor(lettre, score) {
        this.lettre = lettre;
        this.score = score;
    }
}
