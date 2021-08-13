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
var Door = (function (_super) {
    __extends(Door, _super);
    function Door(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "door") || this;
        scene.add.existing(_this);
        scene.physics.add.existing(_this);
        _this.setVisible(false);
        _this.setMaxVelocity(0, 0);
        _this.setOrigin(0.5, 0.5);
        _this.setSize(16, 32);
        _this.goto = {
            level: "",
            door: "",
        };
        return _this;
    }
    Door.prototype.restartScene = function (scene) {
        scene.scene.restart({
            loadType: "door",
            gotoLevel: this.goto.level,
            gotoDoor: this.goto.door,
            playerStats: scene.getPlayerStats()
        });
    };
    Door.prototype.onCollide = function (player) {
        var _this = this;
        if (player.activate() && Math.abs(player.body.y - this.body.y) < 0.5 && Math.abs(player.body.velocity.y) < 0.05) {
            var scene_1 = this.scene;
            var effectsScene = scene_1.scene.get("planetEffects");
            effectsScene.fadeOut(500, 0, 0, 0);
            scene_1.scene.pause("planetLogic");
            effectsScene.cameras.main.once("camerafadeoutcomplete", function () {
                scene_1.scene.run("planetLogic");
                _this.restartScene(scene_1);
            });
            this.destroy();
        }
    };
    return Door;
}(Phaser.Physics.Arcade.Image));
exports.default = Door;
//# sourceMappingURL=Door.js.map