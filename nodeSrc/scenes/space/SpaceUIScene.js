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
var SpaceUIScene = (function (_super) {
    __extends(SpaceUIScene, _super);
    function SpaceUIScene() {
        return _super.call(this, "spaceUI") || this;
    }
    SpaceUIScene.prototype.create = function () {
        var spaceLogicScene = this.scene.get("spaceLogic");
        this.playerShip = spaceLogicScene.playerShip;
        var statsY = this.game.config.height - 145;
        var statsContainer = this.add.image(0, statsY, "shipHealthBar", 0).setScrollFactor(0).setScale(2.5).setOrigin(0).setFlipX(true);
        var statsHpBar = this.add.image(0, statsY, "shipHealthBar", 2).setScrollFactor(0).setScale(2.5).setOrigin(0).setFlipX(true);
        var statsHpMask = this.add.image(0, statsY, "shipHealthBar", 2).setScrollFactor(0).setScale(2.5).setOrigin(0).setFlipX(true);
        statsHpMask.setVisible(false);
        statsHpBar.mask = new Phaser.Display.Masks.BitmapMask(this, statsHpMask);
        this.setHpBar = function (hp, maxHp) {
            statsHpBar.y = statsY + statsHpBar.displayHeight - (hp * statsHpBar.displayHeight / maxHp);
        };
        var statsXpBar = this.add.image(0, statsY, "shipHealthBar", 3).setScrollFactor(0).setScale(2.5).setOrigin(0).setFlipX(true);
        var statsXpMask = this.add.image(0, statsY, "shipHealthBar", 3).setScrollFactor(0).setScale(2.5).setOrigin(0).setFlipX(true);
        statsXpMask.setVisible(false);
        statsXpBar.mask = new Phaser.Display.Masks.BitmapMask(this, statsXpMask);
        this.setXpBar = function (xp, maxXp) {
            var xpBarLength = 93;
            statsXpBar.y = statsY + xpBarLength - (xp * xpBarLength / maxXp);
        };
    };
    SpaceUIScene.prototype.update = function (time, delta) {
        var cam = this.cameras.main;
        cam.setRoundPixels(true);
        this.setHpBar(this.playerShip.getHp(), this.playerShip.getMaxHp());
        this.setXpBar(this.playerShip.getXp(), this.playerShip.getNextLevelXp());
    };
    return SpaceUIScene;
}(Phaser.Scene));
exports.default = SpaceUIScene;
//# sourceMappingURL=SpaceUIScene.js.map