"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileFactory = void 0;
var Tile_1 = require("./Tile");
var TileFactory = /** @class */ (function () {
    function TileFactory() {
    }
    TileFactory.createTile = function () {
        if (this.letters == null) {
            this.init();
        }
        return this.create();
    };
    TileFactory.init = function () {
        this.letters = new Array();
        this.letters.push(new Tile_1.Tile("A", 1));
        this.letters.push(new Tile_1.Tile("B", 3));
        this.letters.push(new Tile_1.Tile("C", 3));
        this.letters.push(new Tile_1.Tile("D", 2));
        this.letters.push(new Tile_1.Tile("E", 1));
        this.letters.push(new Tile_1.Tile("F", 4));
        this.letters.push(new Tile_1.Tile("G", 2));
        this.letters.push(new Tile_1.Tile("H", 4));
        this.letters.push(new Tile_1.Tile("I", 1));
        this.letters.push(new Tile_1.Tile("J", 8));
        this.letters.push(new Tile_1.Tile("K", 5));
        this.letters.push(new Tile_1.Tile("L", 1));
        this.letters.push(new Tile_1.Tile("M", 3));
        this.letters.push(new Tile_1.Tile("N", 1));
        this.letters.push(new Tile_1.Tile("O", 1));
        this.letters.push(new Tile_1.Tile("P", 3));
        this.letters.push(new Tile_1.Tile("Q", 10));
        this.letters.push(new Tile_1.Tile("R", 1));
        this.letters.push(new Tile_1.Tile("S", 1));
        this.letters.push(new Tile_1.Tile("T", 1));
        this.letters.push(new Tile_1.Tile("U", 1));
        this.letters.push(new Tile_1.Tile("V", 4));
        this.letters.push(new Tile_1.Tile("W", 4));
        this.letters.push(new Tile_1.Tile("X", 8));
        this.letters.push(new Tile_1.Tile("Y", 4));
        this.letters.push(new Tile_1.Tile("Z", 10));
    };
    TileFactory.create = function () {
        var indice = Math.round(Math.random() * this.letters.length);
        return structuredClone(this.letters[indice]);
    };
    return TileFactory;
}());
exports.TileFactory = TileFactory;
