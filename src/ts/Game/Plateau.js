/**
 * Représente la plateau de jeu
 */
export class Plateau {
    grille;
    constructor(x, y) {
        this.grille = new Array();
        for (let i = 0; i < x; i++) {
            let ligne = new Array();
            this.grille.push(ligne);
            for (let j = 0; j < y; j++) {
                ligne.push(null);
            }
        }
    }
}
//# sourceMappingURL=Plateau.js.map