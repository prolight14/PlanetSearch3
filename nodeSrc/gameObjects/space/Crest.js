"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SpaceGameObject_1 = require("./SpaceGameObject");
var Crest = (function (_super) {
    __extends(Crest, _super);
    function Crest(scene, x, y, texture) {
        var _this = _super.call(this, scene, x, y, texture) || this;
        _this.amt = 1;
        _this.setAngle(Phaser.Math.RND.between(0, 180));
        _this.setCollisionGroup(2);
        _this.setCollidesWith(0);
        _this.setOnCollide(function (colData) {
            if (colData.bodyA.gameObject && colData.bodyA.gameObject._arrayName === "playerShip") {
                var playerShip = colData.bodyA.gameObject;
                _this.onCollide(playerShip);
            }
        });
        return _this;
    }
    Crest.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
    };
    Crest.prototype.onCollide = function (playerShip) {
        playerShip.collectCrests(this);
        this.bodyConf.destroy();
        this.destroy();
    };
    return Crest;
}(SpaceGameObject_1.default));
exports.default = Crest;
//# sourceMappingURL=Crest.js.map