import { Tile } from "./Tile.js";
/**
 * Factory de tiles,
 * créé des tuiles aléatoirement
 */
export class TileFactory {
    static nbA = 9;
    static nbB = 2;
    static nbC = 2;
    static nbD = 3;
    static nbE = 15;
    static nbF = 2;
    static nbG = 2;
    static nbH = 2;
    static nbI = 8;
    static nbJ = 1;
    static nbK = 1;
    static nbL = 5;
    static nbM = 3;
    static nbN = 6;
    static nbO = 6;
    static nbP = 2;
    static nbQ = 1;
    static nbR = 6;
    static nbS = 6;
    static nbT = 6;
    static nbU = 6;
    static nbV = 2;
    static nbW = 1;
    static nbX = 1;
    static nbY = 1;
    static nbZ = 1;
    static letters;
    static createTile() {
        if (this.letters == null) {
            this.init();
        }
        return this.create();
    }
    static init() {
        this.letters = new Map();
        let nbTiles = 0;
        for (let i = 0; i < this.nbA + 1; i++) {
            this.letters.set(nbTiles, new Tile("A", 1));
            nbTiles++;
        }
        for (let i = 0; i < this.nbB + 1; i++) {
            this.letters.set(nbTiles, new Tile("B", 3));
            nbTiles++;
        }
        for (let i = 0; i < this.nbC + 1; i++) {
            this.letters.set(nbTiles, new Tile("C", 3));
            nbTiles++;
        }
        for (let i = 0; i < this.nbD + 1; i++) {
            this.letters.set(nbTiles, new Tile("D", 2));
            nbTiles++;
        }
        for (let i = 0; i < this.nbE + 1; i++) {
            this.letters.set(nbTiles, new Tile("E", 1));
            nbTiles++;
        }
        for (let i = 0; i < this.nbF + 1; i++) {
            this.letters.set(nbTiles, new Tile("F", 4));
            nbTiles++;
        }
        for (let i = 0; i < this.nbG + 1; i++) {
            this.letters.set(nbTiles, new Tile("G", 2));
            nbTiles++;
        }
        for (let i = 0; i < this.nbH + 1; i++) {
            this.letters.set(nbTiles, new Tile("H", 4));
            nbTiles++;
        }
        for (let i = 0; i < this.nbI + 1; i++) {
            this.letters.set(nbTiles, new Tile("I", 1));
            nbTiles++;
        }
        for (let i = 0; i < this.nbJ + 1; i++) {
            this.letters.set(nbTiles, new Tile("J", 8));
            nbTiles++;
        }
        for (let i = 0; i < this.nbK + 1; i++) {
            this.letters.set(nbTiles, new Tile("K", 5));
            nbTiles++;
        }
        for (let i = 0; i < this.nbL + 1; i++) {
            this.letters.set(nbTiles, new Tile("L", 1));
            nbTiles++;
        }
        for (let i = 0; i < this.nbM + 1; i++) {
            this.letters.set(nbTiles, new Tile("M", 3));
            nbTiles++;
        }
        for (let i = 0; i < this.nbN + 1; i++) {
            this.letters.set(nbTiles, new Tile("N", 1));
            nbTiles++;
        }
        for (let i = 0; i < this.nbO + 1; i++) {
            this.letters.set(nbTiles, new Tile("O", 1));
            nbTiles++;
        }
        for (let i = 0; i < this.nbP + 1; i++) {
            this.letters.set(nbTiles, new Tile("P", 3));
            nbTiles++;
        }
        for (let i = 0; i < this.nbQ + 1; i++) {
            this.letters.set(nbTiles, new Tile("Q", 10));
            nbTiles++;
        }
        for (let i = 0; i < this.nbR + 1; i++) {
            this.letters.set(nbTiles, new Tile("R", 1));
            nbTiles++;
        }
        for (let i = 0; i < this.nbS + 1; i++) {
            this.letters.set(nbTiles, new Tile("S", 1));
            nbTiles++;
        }
        for (let i = 0; i < this.nbT + 1; i++) {
            this.letters.set(nbTiles, new Tile("T", 1));
            nbTiles++;
        }
        for (let i = 0; i < this.nbU + 1; i++) {
            this.letters.set(nbTiles, new Tile("U", 1));
            nbTiles++;
        }
        for (let i = 0; i < this.nbV + 1; i++) {
            this.letters.set(nbTiles, new Tile("V", 4));
            nbTiles++;
        }
        for (let i = 0; i < this.nbW + 1; i++) {
            this.letters.set(nbTiles, new Tile("W", 4));
            nbTiles++;
        }
        for (let i = 0; i < this.nbX + 1; i++) {
            this.letters.set(nbTiles, new Tile("X", 8));
            nbTiles++;
        }
        for (let i = 0; i < this.nbY + 1; i++) {
            this.letters.set(nbTiles, new Tile("Y", 4));
            nbTiles++;
        }
        for (let i = 0; i < this.nbZ + 1; i++) {
            this.letters.set(nbTiles, new Tile("Z", 10));
            nbTiles++;
        }
    }
    static create() {
        let indice = Math.round(Math.random() * this.getNbTiles());
        let tile = structuredClone(this.letters.get(indice));
        try {
            return tile;
        }
        catch (e) {
            return new Tile("A", 1);
        }
    }
    static getNbTiles() {
        return this.letters.size;
    }
}
//# sourceMappingURL=TileFactory.js.map