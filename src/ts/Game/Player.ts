import {Tile} from "./Tile.js";
import {TileFactory} from "./TileFactory.js";

export class Player{
    private static decksize : number = 8;

    name : string
    deck : Array<Tile>
    isAllowed : boolean

    public constructor(name : string) {
        this.name = name;
        this.deck = new Array<Tile>();
        this.isAllowed = false;
    }

    public add2Deck(nb : number){
        for (let i = 0 ; i<nb ; i++){
            this.deck.push(TileFactory.createTile());
        }
    }

    public fillDeck(){
        while (this.deck.length<Player.decksize){
            this.deck.push(TileFactory.createTile());
        }
    }
}