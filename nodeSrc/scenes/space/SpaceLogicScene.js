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
var PlayerShip_1 = require("../../gameObjects/space/PlayerShip");
var Planet_1 = require("../../gameObjects/space/Planet");
var Nebula_1 = require("../../gameObjects/space/Nebula");
var Shrapnel_1 = require("../../gameObjects/space/Shrapnel");
var XPStar_1 = require("../../gameObjects/space/XPStar");
var Crest_1 = require("../../gameObjects/space/Crest");
var Star_1 = require("../../gameObjects/space/Star");
var HyperBeamerShip_1 = require("../../gameObjects/space/HyperBeamerShip");
var SpaceLogicScene = (function (_super) {
    __extends(SpaceLogicScene, _super);
    function SpaceLogicScene() {
        return _super.call(this, "spaceLogic") || this;
    }
    SpaceLogicScene.prototype.addObjectsToSpace = function () {
        var _this = this;
        this.spaceScene = this.scene.get("space");
        var RND = Phaser.Math.RND;
        var world = this.spaceScene.world;
        var nebulae = world.add.gameObjectArray(Nebula_1.default, "nebula");
        var gridConfig = this.spaceScene.cspConfig.grid;
        var placeWidth = gridConfig.cols * gridConfig.cellWidth;
        var placeHeight = gridConfig.rows * gridConfig.cellHeight;
        var nebulaeAmt = Math.floor((placeWidth * placeHeight) / 10000000);
        for (var i = 0; i < 300; i++) {
            nebulae.add(this.spaceScene, 69000 + 13000 * RND.frac(), 60500 + 13000 * RND.frac(), "purpleNebula");
        }
        var planets = world.add.gameObjectArray(Planet_1.default, "planet");
        var spaceManagerScene = this.scene.get("spaceManager");
        var suns = world.add.gameObjectArray(Star_1.default, "star");
        var betaSun = suns.add(this.spaceScene, 66000, 60000, "Sun").setScale(7);
        var betaSystem = spaceManagerScene.addSystem("beta", [betaSun]);
        betaSystem.addPlanet(planets.add(this.spaceScene, 80000, 60000, "RedDustPlanet").setScale(4), {
            radius: 14000
        });
        betaSystem.addPlanet(planets.add(this.spaceScene, 86500, 60000, "JunglePlanet").setScale(4), {
            radius: 20500,
        });
        betaSystem.addPlanet(planets.add(this.spaceScene, 97000, 60000, "IcyDwarfPlanet").setScale(4), {
            radius: 31000,
        });
        world.add.gameObjectArray(XPStar_1.default, "xpStar");
        world.add.gameObjectArray(Crest_1.default, "crest");
        var shrapnels = world.add.gameObjectArray(Shrapnel_1.default, "shrapnel");
        var shrapnelClustAmt = Math.floor((placeWidth * placeHeight) / 100000000);
        for (var i = 0; i < shrapnelClustAmt; i++) {
            var shrapnelClusterX = RND.integerInRange(500, placeWidth - 500);
            var shrapnelClusterY = RND.integerInRange(500, placeHeight - 500);
            for (var j = 0; j < RND.integerInRange(4, 6); j++) {
                shrapnels.add(this.spaceScene, shrapnelClusterX + RND.integerInRange(-200, 200), shrapnelClusterY + RND.integerInRange(-200, 200), "shrapnel" + Math.floor(RND.integerInRange(1, 5)));
            }
        }
        shrapnels.add(this.spaceScene, 69000, 62000, "shrapnel1");
        shrapnels.add(this.spaceScene, 69000, 62200, "shrapnel2");
        shrapnels.add(this.spaceScene, 69130, 62200, "shrapnel3");
        shrapnels.add(this.spaceScene, 69170, 62100, "shrapnel4");
        shrapnels.add(this.spaceScene, 69190, 62000, "shrapnel3");
        if (!world.get.gameObjectArray("playerShip")) {
            var playerShips = world.add.gameObjectArray(PlayerShip_1.default, "playerShip");
            playerShips.define("ignoreDestroy", true);
            this.playerShip = playerShips.add(this.spaceScene, 69000, 60200);
        }
        else {
            this.playerShip.resetStats();
            this.playerShip.x = 69000;
            this.playerShip.y = 60200;
            this.playerShip.bodyConf.update();
            this.playerShip.setDepth(8);
            this.playerShip.particles.setDepth(20);
        }
        var hyperBeamerShips = world.add.gameObjectArray(HyperBeamerShip_1.default, "hyperBeamerShip");
        hyperBeamerShips.add(this.spaceScene, 69200, 60500);
        this.hyperBeamerShipArray = [];
        hyperBeamerShips.forEach(function (ship) {
            _this.hyperBeamerShipArray.push(ship);
        });
    };
    SpaceLogicScene.prototype.addXPStar = function (x, y) {
        var xpStars = this.spaceScene.world.get.gameObjectArray("xpStar");
        var star = xpStars.add(this.spaceScene, x + Phaser.Math.RND.between(-50, 50), y + Phaser.Math.RND.between(-50, 50), "xpStar");
        var angle = Phaser.Math.Angle.Between(star.x, star.y, x, y) * Phaser.Math.RAD_TO_DEG + 180 + Phaser.Math.RND.between(-30, 30);
        var speed = 0.5 + Phaser.Math.RND.frac() * 0.5;
        star.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
    };
    SpaceLogicScene.prototype.addSmallXPStar = function (x, y) {
        var smallXPStars = this.spaceScene.world.get.gameObjectArray("xpStar");
        var star = smallXPStars.add(this.spaceScene, x + Phaser.Math.RND.between(-50, 50), y + Phaser.Math.RND.between(-50, 50), "smallXPStar");
        var angle = Phaser.Math.Angle.Between(star.x, star.y, x, y) * Phaser.Math.RAD_TO_DEG + 180 + Phaser.Math.RND.between(-30, 30);
        var speed = 0.5 + Phaser.Math.RND.frac() * 0.5;
        star.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
    };
    SpaceLogicScene.prototype.addCrests = function (x, y) {
        var crest = this.spaceScene.world.get.gameObjectArray("crest").add(this.spaceScene, x + Phaser.Math.RND.between(-50, 50), y + Phaser.Math.RND.between(-50, 50), "crest");
        var angle = Phaser.Math.Angle.Between(crest.x, crest.y, x, y) * Phaser.Math.RAD_TO_DEG + 180 + Phaser.Math.RND.between(-30, 30);
        var speed = 0.5 + Phaser.Math.RND.frac() * 0.5;
        crest.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
    };
    SpaceLogicScene.prototype.update = function (time, delta) {
        this.updatePlanets();
    };
    SpaceLogicScene.prototype.updatePlanets = function () {
        var _this = this;
        var playerShip = this.playerShip;
        this.spaceScene.sys.displayList.list.forEach(function (object) {
            switch (object._arrayName) {
                case "planet":
                    var planet = object;
                    var dx = planet.x - playerShip.x;
                    var dy = planet.y - playerShip.y;
                    var radius = planet.displayWidth / 2;
                    if (dx * dx + dy * dy < radius * radius) {
                        _this.spaceScene.switchToPlanetSceneGroup({
                            type: "planet",
                            from: planet
                        });
                    }
                    break;
                case "star":
                    var star = object;
                    var dx = star.x - playerShip.x;
                    var dy = star.y - playerShip.y;
                    var radius = star.displayWidth / 2;
                    if (dx * dx + dy * dy < radius * radius) {
                        star.onCollide(playerShip);
                    }
                    break;
            }
        });
    };
    return SpaceLogicScene;
}(Phaser.Scene));
exports.default = SpaceLogicScene;
//# sourceMappingURL=SpaceLogicScene.js.map