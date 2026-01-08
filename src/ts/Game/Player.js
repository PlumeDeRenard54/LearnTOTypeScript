import { TileFactory } from "./TileFactory.js";
/**
 * Représente un joueur
 */
export class Player {
    //Nombre max de tuiles que l'utilisateur peut avoir dans son deck
    static decksize = 9;
    name;
    deck;
    isAllowed;
    constructor(name) {
        this.name = name;
        this.deck = new Array();
        this.isAllowed = false;
    }
    //Ajoute un nombre de tuiles au deck du joueur
    add2Deck(nb) {
        for (let i = 0; i < nb && this.deck.length <= Player.decksize; i++) {
            this.deck.push(TileFactory.createTile());
        }
    }
    //remplis entierement le deck du joueur
    fillDeck() {
        while (this.deck.length < Player.decksize) {
            this.deck.push(TileFactory.createTile());
        }
    }
}
//# sourceMappingURL=Player.js.map