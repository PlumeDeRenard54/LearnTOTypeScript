import {Tile} from "../Game/Tile.js";

export class VueTile extends HTMLElement{
    tile : Tile|null;

    public constructor(tilet :Tile) {
        super();
        if (tilet == null){
            this.textContent = '';
        }else {
            this.textContent = tilet.lettre;
        }
        this.tile = tilet;

    }


}