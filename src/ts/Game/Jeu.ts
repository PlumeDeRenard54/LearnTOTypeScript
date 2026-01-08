import {Dictionnaire} from "./Dictionnaire.js";
import {Plateau} from "./Plateau.js";
import {Tile} from "./Tile.js";
import {Player} from "./Player.js";

/**
 * Classe représentant le backend du jeu
 */
export class Jeu {
    // Dictionnaire utilisé
    dico : Dictionnaire = Dictionnaire.getDictionnaire();
    // Plateau contenant les tiles
    plateau : Plateau;
    //Joueur local
    joueur : Player;


    public constructor(playerName : string ) {
        this.joueur = new Player(playerName);
        this.plateau = new Plateau(10,10);
    }

    //Methode pour placer un nouveau jeton sur la grille
    public placerJeton(x : number,y:number , jeton : Tile) : void{
        jeton.isNew = true;
        this.plateau.grille[x][y] = jeton;
    }

    //Checke si le jeu est valide et renvoie le score de l'action
    public validerJeu():number{
        if (this.checkHorizontal() && this.checkVertical() && this.checkLonelyTiles()){
            let score : number = this.calulerScore()
            console.log("score du coup : " + score);
            this.joueur.isAllowed = false;
            return score;
        }else{
            console.log("Coup non Valide")
            return -1;
        }
    }

    //Calcule le score de l'action et note les nouvelles tiles comme déjà jouées
    private calulerScore():number {
        let score = 0;
        for (let ligne of this.plateau.grille ){
            for (let caseo of ligne){
                if (caseo != null && caseo.isNew ){
                    score += caseo.score;
                    caseo.isNew = false;
                }
            }
        }

        return score;
    }

    //Verifie que les mots verticaux sont valides
    public checkVertical(): boolean{
        let inMot = false;
        let grille : Array<Array<Tile|null>> = this.plateau.grille;
        let mots : Array<string> = new Array<string>();
        let nbMot : number = -1;

        for (let ligne of grille){
            for (let tile of ligne){
                if (tile != null){
                    if (inMot){
                        nbMot++;
                        mots[nbMot] = "";
                        inMot = true;

                    }
                    mots[nbMot] += tile.lettre;
                }else{
                    inMot = false;
                }
            }
        }
        for (let mot of mots) {
            if (mot.length > 1 && !this.dico.contains(mot.toLowerCase())) {
                console.log("CheckVertical negatif")
                return false;
            }
        }
        return true;
    }

    //Check si les mots horizontaux sont valides
    public checkHorizontal() : boolean{
        let inMot : boolean = false;
        let grille : Array<Array<Tile|null>> = this.plateau.grille;
        let mots : Array<string> = new Array<string>();
        let nbMot : number = -1;

        for (let i = 0 ; i<grille[0].length ; i++){
            for (let j = 0 ; j<grille.length ; j++){
                if (grille[j][i] != null){
                    if (!inMot){
                        nbMot++;
                        mots[nbMot] = "";
                        inMot = true;
                    }
                    // @ts-ignore
                    mots[nbMot] += grille[j][i].lettre;
                }else{
                    inMot = false;
                }
            }
            inMot = false;
        }
        for (let mot of mots) {
            if (mot.length > 1 && !this.dico.contains(mot.toLowerCase())) {
                console.log("Check Horizontal negatif")
                return false;
            }
        }
        return true;
    }

    public checkLonelyTiles() : boolean {
        let grille  = this.plateau.grille;
        for ( let i = 0 ; i< grille.length ; i++){
            for (let  j = 0 ; j<grille[0].length ; j++){
                if (grille[i][j]!=null && this.isLonely(i,j)){
                    console.log("Check alone negatif")
                    return false;
                }
            }
        }

        return true;
    }

    //Checke si la case est lonely
    private isLonely(x : number,y : number){
        let grille = this.plateau.grille;
        for ( let i = x-1 ; i< x+2 ; i++){
            try {
                if (i != x && grille[i][y] != null) {
                    return false
                }
            }catch (e) {}
        }

        for (let  j = y-1 ; j<y+2 ; j++){
            try {
                if (j != y && grille[x][j] != null) {
                    return false
                }
            }catch (e){}
        }

        return true;
    }


}