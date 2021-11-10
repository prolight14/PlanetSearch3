"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rng = new Phaser.Math.RandomDataGenerator("rand1");
var random = function (min, max) {
    return rng.frac() * (max - min) + min;
};
exports.default = random;
//# sourceMappingURL=random.js.map