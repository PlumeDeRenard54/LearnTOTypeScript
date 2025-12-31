import {Tile} from './Tile.js' ;


export class Plateau{
    grille : Array<Array<Tile>>

    constructor(x : number , y : number ) {
        this.grille = new Array<Array<Tile>>();
        for (let i = 0 ; i<x ; i++){
            let ligne : Array<Tile> = new Array<Tile>();
            this.grille.push(ligne);
            for (let j = 0 ; j<y ; j++){
                ligne.push(null);
            }
        }
    }

}