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
var InfoBar_1 = require("../../UI/planet/InfoBar");
var PlanetUIScene = (function (_super) {
    __extends(PlanetUIScene, _super);
    function PlanetUIScene() {
        return _super.call(this, "planetUI") || this;
    }
    PlanetUIScene.prototype.create = function () {
        var _this = this;
        this.infoBar = new InfoBar_1.default(this);
        this.time.delayedCall(100, function () {
            _this.infoBar.init();
        });
    };
    PlanetUIScene.prototype.update = function () {
        if (this.scene.isActive("planetLogic")) {
            this.infoBar.update();
        }
    };
    return PlanetUIScene;
}(Phaser.Scene));
exports.default = PlanetUIScene;
//# sourceMappingURL=PlanetUIScene.js.map