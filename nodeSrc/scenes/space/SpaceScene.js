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
var SpaceStarScene_1 = require("./SpaceStarScene");
var PlayerShip_1 = require("../../gameObjects/space/PlayerShip");
var Planet_1 = require("../../gameObjects/space/Planet");
var SpaceScene = (function (_super) {
    __extends(SpaceScene, _super);
    function SpaceScene() {
        return _super.call(this, "space") || this;
    }
    SpaceScene.prototype.preload = function () {
        this.load.image("playerShip", "./assets/Space/Ships/playerShip.png");
        this.load.image("IcyDwarfPlanet", "./assets/Space/Planets/IcyDwarfPlanet.png");
        this.load.image("RedDustPlanet", "./assets/Space/Planets/RedDustPlanet.png");
        this.load.scenePlugin({
            key: "CartesianSystemPlugin",
            url: "./libraries/CartesianSystemPlugin.js",
            sceneKey: 'csp'
        });
    };
    SpaceScene.prototype.create = function () {
        this.cspConfig = {
            window: {
                width: this.game.config.width,
                height: this.game.config.height
            },
            grid: {
                cols: 200,
                rows: 200,
                cellWidth: 800,
                cellHeight: 800
            }
        };
        this.csp.initWorld(this.cspConfig);
        this.addGameObjects();
        this.csp.syncWithGrid();
        this.runScenes();
    };
    SpaceScene.prototype.addGameObjects = function () {
        var world = this.csp.world;
        var planets = world.add.gameObjectArray(Planet_1.default);
        planets.add(this, 69000, 60000, "IcyDwarfPlanet").setScale(13, 13);
        planets.add(this, 56000, 70000, "RedDustPlanet").setScale(13, 13);
        var playerShip = world.add.gameObjectArray(PlayerShip_1.default).add(this, 69000, 61000, "playerShip");
        this.setCameraTarget(playerShip);
        this.playerShip = playerShip;
    };
    SpaceScene.prototype.setCameraTarget = function (target) {
        this.cameraTarget = target;
        this.cameras.main.startFollow(target);
    };
    SpaceScene.prototype.getCameraTarget = function () {
        return this.cameraTarget;
    };
    SpaceScene.prototype.runScenes = function () {
        this.scene.run("spaceCameraController");
        this.runDebugScenes();
        this.runStarScenes();
    };
    SpaceScene.prototype.runDebugScenes = function () {
        var _this = this;
        this.scene.run("spaceDebug");
        this.scene.run("spaceUIDebug");
        this.scene.sleep("spaceDebug");
        this.input.keyboard.on("keydown-U", function () {
            if (_this.scene.isSleeping("spaceUIDebug")) {
                _this.scene.wake("spaceUIDebug");
            }
            else {
                _this.scene.sleep("spaceUIDebug");
            }
        });
        this.input.keyboard.on("keydown-I", function () {
            if (_this.scene.isSleeping("spaceDebug")) {
                _this.scene.wake("spaceDebug");
            }
            else {
                _this.scene.sleep("spaceDebug");
            }
        });
    };
    SpaceScene.prototype.runStarScenes = function () {
        this.scene.add("spaceStar", SpaceStarScene_1.default, true, {
            starsPerCell: 100,
            starSize: 3,
            starScroll: 1
        });
        this.scene.sendToBack("spaceStar");
        this.scene.add("spaceStar2", SpaceStarScene_1.default, true, {
            starsPerCell: 124,
            starSize: 2,
            starScroll: 0.73
        });
        this.scene.sendToBack("spaceStar2");
        this.scene.add("spaceStar3", SpaceStarScene_1.default, true, {
            starsPerCell: 250,
            starSize: 1,
            starScroll: 0.56
        });
        this.scene.sendToBack("spaceStar3");
        this.starScenesSleeping = false;
    };
    SpaceScene.prototype.sleepScenes = function () {
        this.scene.sleep("spaceCameraController");
        this.scene.sleep("spaceDebug");
        this.scene.sleep("spaceUIDebug");
        this.scene.sleep("spaceStar");
        this.scene.sleep("spaceStar2");
        this.scene.sleep("spaceStar3");
        this.starScenesSleeping = true;
    };
    SpaceScene.prototype.update = function (time, delta) {
        var follow = this.getCameraTarget();
        this.csp.setFollow(follow.x, follow.y);
        this.csp.updateWorld();
        this.updatePlanets();
        this.updateStarFade();
    };
    SpaceScene.prototype.updatePlanets = function () {
        var _this = this;
        var world = this.csp.world;
        var playerShip = this.playerShip;
        this.sys.displayList.list.forEach(function (object) {
            if (object._arrayName === "planet") {
                var planet = object;
                var dx = planet.x - playerShip.x;
                var dy = planet.y - playerShip.y;
                if (dx * dx + dy * dy < Math.pow(planet.displayWidth / 2, 2)) {
                    _this.gotoPlanetSceneGroup();
                }
            }
        });
    };
    SpaceScene.prototype.gotoPlanetSceneGroup = function () {
        var entryScene = this.scene.get("entry");
        entryScene.sleepSceneGroup("space");
        entryScene.runSceneGroup("planet");
    };
    SpaceScene.prototype.updateStarFade = function () {
        if (this.starScenesSleeping) {
            return;
        }
        if (this.cameras.main.zoom <= 0.5) {
            this.scene.sleep("spaceStar3");
        }
        else {
            this.scene.wake("spaceStar3");
        }
        if (this.cameras.main.zoom <= 0.35) {
            this.scene.sleep("spaceStar2");
        }
        else {
            this.scene.wake("spaceStar2");
        }
    };
    return SpaceScene;
}(Phaser.Scene));
exports.default = SpaceScene;
//# sourceMappingURL=SpaceScene.js.map