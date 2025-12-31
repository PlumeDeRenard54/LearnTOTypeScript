"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dictionnaire = void 0;
var fs = require("fs");
var Dictionnaire = /** @class */ (function () {
    function Dictionnaire() {
        var contenu = fs.readFileSync("../data/dataDictionnaire").toString();
        this.dictionnaire = contenu.split("\n");
    }
    Dictionnaire.getDictionnaire = function () {
        if (this.singleton == null) {
            this.singleton = new Dictionnaire();
        }
        return this.singleton;
    };
    Dictionnaire.prototype.contains = function (s) {
        return (this.dictionnaire.indexOf(s) != -1);
    };
    return Dictionnaire;
}());
exports.Dictionnaire = Dictionnaire;
