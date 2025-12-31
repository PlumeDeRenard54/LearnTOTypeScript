import {Dictionnaire} from "./Dictionnaire.js";
import {Plateau} from "./Plateau.js";
import {Tile} from "./Tile.js";
import {Player} from "./Player.js";

export class Jeu {
    dico : Dictionnaire = Dictionnaire.getDictionnaire();
    plateau : Plateau;
    joueur : Player;


    public constructor(playerName : string ) {
        this.joueur = new Player(playerName);
    }

    public placerJeton(x : number,y:number , jeton : Tile) : void{
        jeton.isNew = true;
        this.plateau.grille[x][y] = jeton;
    }

    public validerJeu():number{
        if (this.checkHorizontal() && this.checkVertical()){
            return this.calulerScore();
        }else{
            return -1;
        }
    }

    private calulerScore():number {
        let score = 0;
        for (let ligne of this.plateau.grille ){
            for (let caseo of ligne){
                if (caseo.isNew){
                    score += caseo.score;
                    caseo.isNew = false;
                }
            }
        }

        return score;
    }

    public checkVertical(): boolean{
        let grille : Array<Array<Tile>> = this.plateau.grille;
        for (let ligne of grille){
            let mots : Array<string> = new Array<string>();
            let nbMot : number = 1;
            for (let tile of ligne){
                if (tile == null){
                    nbMot++;
                }else{
                    mots[nbMot] += tile.lettre;
                }
            }
            for (let mot of mots) {
                if (mot.length > 1 && !this.dico.contains(mot)) {
                    return false;
                }
            }
        }
        return true;
    }

    public checkHorizontal() : boolean{
        let grille : Array<Array<Tile>> = this.plateau.grille;
        for (let i = 0 ; i<grille[0].length ; i++){
            let mots : Array<string> = new Array<string>();
            let nbMot : number = 1;
            for (let j = 0 ; j<grille.length ; j++){
                if (grille[j][i] == null){
                    nbMot++;
                }else{
                    mots[nbMot] += grille[j][i].lettre;
                }
            }
            for (let mot of mots) {
                if (mot.length > 1 && !this.dico.contains(mot)) {
                    return false;
                }
            }
        }
        return true;
    }



}