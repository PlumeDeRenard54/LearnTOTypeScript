"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var TileFactory_1 = require("./TileFactory");
var Player = /** @class */ (function () {
    function Player(name) {
        this.name = name;
        this.deck = new Array();
        this.isAllowed = false;
    }
    Player.prototype.add2Deck = function (nb) {
        for (var i = 0; i < nb; i++) {
            this.deck.push(TileFactory_1.TileFactory.createTile());
        }
    };
    Player.prototype.fillDeck = function () {
        while (this.deck.length < Player.decksize) {
            this.deck.push(TileFactory_1.TileFactory.createTile());
        }
    };
    Player.decksize = 8;
    return Player;
}());
exports.Player = Player;
