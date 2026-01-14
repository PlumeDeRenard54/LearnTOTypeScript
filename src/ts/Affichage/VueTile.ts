import {Tile} from "../Game/Tile.js";
import {Jeu} from "../Game/Jeu.js";

export class VueTile extends HTMLElement{
    tile : Tile|null;
    x : number;
    y : number;

    public constructor(tilet :Tile|null,x : number,y: number,jeu : Jeu) {
        super();
        this.x = x;
        this.y = y;
        this.draggable = true;
        if (tilet == null){
            this.textContent = '';
        }else {
            this.textContent = tilet.lettre;
            if (!tilet.isNew){
                this.style.backgroundColor = "brown";
                this.draggable = false;
            }
        }
        this.tile = tilet;

        this.ondragstart = (e)=>{
            if (this.tile!=null) {
                e.dataTransfer!.setData("text/plain", JSON.stringify(this.tile));
            }
        };

        this.ondrop = (e)=>{
            e.preventDefault();
            if (e.dataTransfer?.getData("text/plain") != null) {
                this.tile = JSON.parse(e.dataTransfer.getData("text/plain"));
                this.textContent = this.tile!.lettre;
                if (this.tile != null && this.x != -1) {
                    jeu.plateau.grille[x][y] = this.tile;
                }
            }

            this.style.backgroundColor = "";

        }

        this.ondragend = (e)=>{
            if (e.dataTransfer?.dropEffect === "move") {
                if (this.tile != null && this.x != -1) {
                    jeu.plateau.grille[x][y] = null;
                }
                this.tile = null;
                this.textContent = ""
            }

            this.style.backgroundColor = "";
        }

        this.ondragenter = (e)=>{
            this.style.backgroundColor = "blue";
        }

        this.ondragleave = (e) => {
            this.style.backgroundColor = "";
        }

        this.ondragover = (e) => {
            console.log(this.tile?.lettre);
            if (e.dataTransfer && this.tile == null && JSON.stringify(this.tile) != e.dataTransfer.getData("text/plain")) {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
            }
        };


    }


}