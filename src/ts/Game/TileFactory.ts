import {Tile} from "./Tile.js";

/**
 * Factory de tiles,
 * créé des tuiles aléatoirement
 */
export class TileFactory{

    private static nbA : number = 9;
    private static nbB : number = 2;
    private static nbC : number = 2;
    private static nbD : number = 3;
    private static nbE : number = 15;
    private static nbF : number = 2;
    private static nbG : number = 2;
    private static nbH : number = 2;
    private static nbI : number = 8;
    private static nbJ : number = 1;
    private static nbK : number = 1;
    private static nbL : number = 5;
    private static nbM : number = 3;
    private static nbN : number = 6;
    private static nbO : number = 6;
    private static nbP : number = 2;
    private static nbQ : number = 1;
    private static nbR : number = 6;
    private static nbS : number = 6;
    private static nbT : number = 6;
    private static nbU : number = 6;
    private static nbV : number = 2;
    private static nbW : number = 1;
    private static nbX : number = 1;
    private static nbY : number = 1;
    private static nbZ : number = 1;

    private static letters : Map<number,Tile>

    public static createTile() : Tile{
        if (this.letters == null){
            this.init();
        }

        return this.create()
    }


    private static init() : void{
        this.letters = new Map<number, Tile>();
        let nbTiles = 0;
        for (let i = 0 ; i<this.nbA+1 ; i++) {
            this.letters.set(nbTiles, new Tile("A", 1))
            nbTiles++;
        }
        for (let i = 0 ; i<this.nbB+1 ; i++) {
            this.letters.set(nbTiles, new Tile("B", 3))
            nbTiles++;
        }
        for (let i = 0 ; i<this.nbC+1 ; i++) {
            this.letters.set(nbTiles, new Tile("C", 3))
            nbTiles++;
        }
        for (let i = 0 ; i<this.nbD+1 ; i++) {
            this.letters.set(nbTiles, new Tile("D", 2))
            nbTiles++;
        }
        for (let i = 0 ; i<this.nbE+1 ; i++) {
            this.letters.set(nbTiles, new Tile("E", 1))
            nbTiles++;
        }
        for (let i = 0 ; i<this.nbF+1 ; i++) {
            this.letters.set(nbTiles, new Tile("F", 4))
            nbTiles++;
        }
        for (let i = 0 ; i<this.nbG+1 ; i++) {
            this.letters.set(nbTiles, new Tile("G", 2))
            nbTiles++;
        }
        for (let i = 0 ; i<this.nbH+1 ; i++) {
            this.letters.set(nbTiles, new Tile("H", 4))
            nbTiles++;
        }
        for (let i = 0 ; i<this.nbI+1 ; i++) {
            this.letters.set(nbTiles, new Tile("I", 1))
            nbTiles++;
        }
        for (let i = 0 ; i<this.nbJ+1 ; i++) {
            this.letters.set(nbTiles, new Tile("J", 8))
            nbTiles++;
        }
        for (let i = 0 ; i<this.nbK+1 ; i++) {
            this.letters.set(nbTiles, new Tile("K", 5))
            nbTiles++;
        }
        for (let i = 0 ; i<this.nbL+1 ; i++) {
            this.letters.set(nbTiles, new Tile("L", 1))
            nbTiles++;
        }
        for (let i = 0 ; i<this.nbM+1 ; i++) {
            this.letters.set(nbTiles, new Tile("M", 3))
            nbTiles++;
        }
        for (let i = 0 ; i<this.nbN+1 ; i++) {
            this.letters.set(nbTiles, new Tile("N", 1))
            nbTiles++;
        }
        for (let i = 0 ; i<this.nbO+1 ; i++) {
            this.letters.set(nbTiles, new Tile("O", 1))
            nbTiles++;
        }
        for (let i = 0 ; i<this.nbP+1 ; i++) {
            this.letters.set(nbTiles, new Tile("P", 3))
            nbTiles++;
        }
        for (let i = 0 ; i<this.nbQ+1 ; i++) {
            this.letters.set(nbTiles, new Tile("Q", 10))
            nbTiles++;
        }
        for (let i = 0 ; i<this.nbR+1 ; i++) {
            this.letters.set(nbTiles, new Tile("R", 1))
            nbTiles++;
        }
        for (let i = 0 ; i<this.nbS+1 ; i++) {
            this.letters.set(nbTiles, new Tile("S", 1))
            nbTiles++;
        }
        for (let i = 0 ; i<this.nbT+1 ; i++) {
            this.letters.set(nbTiles, new Tile("T", 1))
            nbTiles++;
        }
        for (let i = 0 ; i<this.nbU+1 ; i++) {
            this.letters.set(nbTiles, new Tile("U", 1))
            nbTiles++;
        }
        for (let i = 0 ; i<this.nbV+1 ; i++) {
            this.letters.set(nbTiles, new Tile("V", 4))
            nbTiles++;
        }
        for (let i = 0 ; i<this.nbW+1 ; i++) {
            this.letters.set(nbTiles, new Tile("W", 4))
            nbTiles++;
        }
        for (let i = 0 ; i<this.nbX+1 ; i++) {
            this.letters.set(nbTiles, new Tile("X", 8))
            nbTiles++;
        }
        for (let i = 0 ; i<this.nbY+1 ; i++) {
            this.letters.set(nbTiles, new Tile("Y", 4))
            nbTiles++;
        }
        for (let i = 0 ; i<this.nbZ+1 ; i++) {
            this.letters.set(nbTiles, new Tile("Z", 10))
            nbTiles++;
        }

    }

    private static create() : Tile{
        let indice : number = Math.round(Math.random()*this.getNbTiles());
        let tile :Tile | undefined = structuredClone(this.letters.get(indice));
        try{
            return tile as Tile;
        }catch (e){
            return new Tile("A",1);
        }
    }

    private static getNbTiles() : number{
        return this.letters.size;
    }
}