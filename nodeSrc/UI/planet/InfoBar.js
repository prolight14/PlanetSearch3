"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InfoBar = (function () {
    function InfoBar(scene) {
        this.scene = scene;
        this.graphics = scene.add.graphics();
        this.graphics.fillStyle(0x000000, 0.4);
        this.graphics.fillRect(0, 0, 800, 25);
        this.hpBarGraphics = scene.add.graphics();
        this.initialized = false;
    }
    InfoBar.prototype.init = function () {
        this.initialized = true;
        this.playerHpText = this.scene.add.text(20, 5, "HP: ? / ?", {
            fontSize: "18px",
            align: "left"
        });
    };
    InfoBar.prototype.update = function () {
        if (!this.initialized) {
            return;
        }
        var playerStats = this.scene.scene.get("planetLogic").getPlayerStats();
        var hp = playerStats.hp;
        var maxHp = playerStats.maxHp;
        this.playerHpText.setText("HP: " + hp.toFixed(0) + " / " + maxHp);
        var hpBarWidth = 200;
        this.hpBarGraphics.clear();
        this.hpBarGraphics.fillStyle(0x000000, 0.5);
        this.hpBarGraphics.fillRect(0, 0, hpBarWidth, 25);
        this.hpBarGraphics.fillStyle(0x58DA12);
        this.hpBarGraphics.fillRect(0, 0, (hp * hpBarWidth / maxHp), 25);
    };
    return InfoBar;
}());
exports.default = InfoBar;
//# sourceMappingURL=InfoBar.js.map