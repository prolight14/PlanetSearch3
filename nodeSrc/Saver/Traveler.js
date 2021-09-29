"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Traveler = (function () {
    function Traveler() {
        this.containsInfo = false;
    }
    Traveler.prototype.setInfo = function (data) {
        this.info = data;
        this.containsInfo = true;
    };
    Traveler.prototype.getInfo = function () {
        return this.info;
    };
    return Traveler;
}());
exports.default = Traveler;
//# sourceMappingURL=Traveler.js.map