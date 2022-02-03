"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var trig = (function () {
    function trig() {
    }
    trig.cos = function (angle) {
        return Math.cos(angle * Phaser.Math.DEG_TO_RAD);
    };
    trig.sin = function (angle) {
        return Math.sin(angle * Phaser.Math.DEG_TO_RAD);
    };
    trig.tan = function (angle) {
        return Math.sin(angle * Phaser.Math.DEG_TO_RAD);
    };
    return trig;
}());
exports.default = trig;
//# sourceMappingURL=trig.js.map