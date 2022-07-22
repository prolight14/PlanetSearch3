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
var SolarSystem_1 = require("../../Systems/SolarSystem");
var spaceManagerScene = (function (_super) {
    __extends(spaceManagerScene, _super);
    function spaceManagerScene() {
        var _this = _super.call(this, "spaceManager") || this;
        _this.solarSystems = [];
        return _this;
    }
    spaceManagerScene.prototype.preload = function () {
    };
    spaceManagerScene.prototype.create = function () {
        var _this = this;
        this.scene.setVisible(false);
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, function () {
            _this.destroySolarSystems();
        });
    };
    spaceManagerScene.prototype.addSystem = function (name, stars) {
        var system = new SolarSystem_1.default(name);
        if (!Array.isArray(stars)) {
            stars = [stars];
        }
        system.addStars(stars);
        this.solarSystems.push(system);
        return system;
    };
    spaceManagerScene.prototype.update = function (time, delta) {
        for (var i = 0; i < this.solarSystems.length; i++) {
            var system = this.solarSystems[0];
            system.update();
        }
    };
    spaceManagerScene.prototype.destroySolarSystems = function () {
        for (var i = 0; i < this.solarSystems.length; i++) {
            var system = this.solarSystems[0];
            system.destroy();
            this.solarSystems.shift();
        }
    };
    return spaceManagerScene;
}(Phaser.Scene));
exports.default = spaceManagerScene;
//# sourceMappingURL=SpaceManagerScene.js.map