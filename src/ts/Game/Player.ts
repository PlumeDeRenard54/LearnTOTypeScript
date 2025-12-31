import {Tile} from "./Tile.js";
import {TileFactory} from "./TileFactory.js";

/**
 * Représente un joueur
 */
export class Player{
    //Nombre max de tuiles que l'utilisateur peut avoir dans son deck
    private static decksize : number = 8;

    name : string
    deck : Array<Tile>
    isAllowed : boolean

    public constructor(name : string) {
        this.name = name;
        this.deck = new Array<Tile>();
        this.isAllowed = false;
    }

    //Ajoute un nombre de tuiles au deck du joueur
    public add2Deck(nb : number){
        for (let i = 0 ; i<nb && this.deck.length<=Player.decksize ; i++){
            this.deck.push(TileFactory.createTile());
        }
    }

    //remplis entierement le deck du joueur
    public fillDeck(){
        while (this.deck.length<Player.decksize){
            this.deck.push(TileFactory.createTile());
        }
    }
}