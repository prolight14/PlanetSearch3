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
var TitleScene = (function (_super) {
    __extends(TitleScene, _super);
    function TitleScene() {
        return _super.call(this, "title") || this;
    }
    TitleScene.prototype.preload = function () {
        this.load.image("planetSearch", "./assets/Title/PlanetSearch.png");
    };
    TitleScene.prototype.create = function () {
        var _this = this;
        var gameWidth = this.game.canvas.width;
        var gameHeight = this.game.canvas.height;
        this.add.image(0, 0, "planetSearch").setOrigin(0, 0).setDisplaySize(gameWidth, gameHeight);
        this.add.text(gameWidth * 0.5, gameHeight * 0.7, "Press any key to play!").setOrigin(0.5).setAlign("center");
        this.input.keyboard.once("keydown", function () {
            _this.cameras.main.fadeOut(500, 0, 0, 0);
            _this.cameras.main.once("camerafadeoutcomplete", function () {
                _this.scene.start("entry");
            });
        });
    };
    return TitleScene;
}(Phaser.Scene));
exports.default = TitleScene;
//# sourceMappingURL=TitleScene.js.map