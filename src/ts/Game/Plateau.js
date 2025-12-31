"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plateau = void 0;
var Plateau = /** @class */ (function () {
    function Plateau(x, y) {
        this.grille = new Array();
        for (var i = 0; i < x; i++) {
            var ligne = new Array();
            this.grille.push(ligne);
            for (var j = 0; j < y; j++) {
                ligne.push(null);
            }
        }
    }
    return Plateau;
}());
exports.Plateau = Plateau;
