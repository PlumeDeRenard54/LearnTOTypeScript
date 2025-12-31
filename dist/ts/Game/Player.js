import { TileFactory } from "./TileFactory.js";
export class Player {
    static decksize = 8;
    name;
    deck;
    isAllowed;
    constructor(name) {
        this.name = name;
        this.deck = new Array();
        this.isAllowed = false;
    }
    add2Deck(nb) {
        for (let i = 0; i < nb; i++) {
            this.deck.push(TileFactory.createTile());
        }
    }
    fillDeck() {
        while (this.deck.length < Player.decksize) {
            this.deck.push(TileFactory.createTile());
        }
    }
}
