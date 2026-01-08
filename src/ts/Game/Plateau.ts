import {Tile} from './Tile.js' ;

/**
 * Représente la plateau de jeu
 */
export class Plateau{
    grille : Array<Tile | null>[]

    constructor(x : number , y : number ) {
        this.grille = new Array<Array<Tile|null>>();
        for (let i = 0 ; i<x ; i++){
            let ligne : Array<Tile|null> = new Array<Tile>();
            this.grille.push(ligne);
            for (let j = 0 ; j<y ; j++){
                ligne.push(null);
            }
        }
    }

}