import {Tile} from "./Tile.js";

/**
 * Factory de tiles,
 * créé des tuiles aléatoirement
 */
export class TileFactory{

    private static letters : Array<Tile>

    public static createTile() : Tile{
        if (this.letters == null){
            this.init();
        }

        return this.create()
    }


    private static init() : void{
        this.letters = new Array<Tile>();
        this.letters.push(new Tile("A",1))
        this.letters.push(new Tile("B",3))
        this.letters.push(new Tile("C",3))
        this.letters.push(new Tile("D",2))
        this.letters.push(new Tile("E",1))
        this.letters.push(new Tile("F",4))
        this.letters.push(new Tile("G",2))
        this.letters.push(new Tile("H",4))
        this.letters.push(new Tile("I",1))
        this.letters.push(new Tile("J",8))
        this.letters.push(new Tile("K",5))
        this.letters.push(new Tile("L",1))
        this.letters.push(new Tile("M",3))
        this.letters.push(new Tile("N",1))
        this.letters.push(new Tile("O",1))
        this.letters.push(new Tile("P",3))
        this.letters.push(new Tile("Q",10))
        this.letters.push(new Tile("R",1))
        this.letters.push(new Tile("S",1))
        this.letters.push(new Tile("T",1))
        this.letters.push(new Tile("U",1))
        this.letters.push(new Tile("V",4))
        this.letters.push(new Tile("W",4))
        this.letters.push(new Tile("X",8))
        this.letters.push(new Tile("Y",4))
        this.letters.push(new Tile("Z",10))
    }

    private static create() : Tile{
        let indice : number = Math.round(Math.random()*this.letters.length);
        return structuredClone(this.letters[indice]);
    }

}