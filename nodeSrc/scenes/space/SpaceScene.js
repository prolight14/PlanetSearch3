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
var Planet_1 = require("../../gameObjects/space/Planet");
var PlayerShip_1 = require("../../gameObjects/space/PlayerShip");
var SpaceScene = (function (_super) {
    __extends(SpaceScene, _super);
    function SpaceScene() {
        var _this = _super.call(this, "space") || this;
        _this.loaded = false;
        return _this;
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
        this.addObjectsToSpace();
        this.csp.syncWithGrid();
        this.runScenes(false);
        this.loaded = true;
    };
    SpaceScene.prototype.addObjectsToSpace = function () {
        var world = this.csp.world;
        var planets = world.add.gameObjectArray(Planet_1.default);
        planets.add(this, 69000, 60000, "IcyDwarfPlanet").setScale(13, 13);
        planets.add(this, 56000, 70000, "RedDustPlanet").setScale(13, 13);
        this.playerShip = world.add.gameObjectArray(PlayerShip_1.default).add(this, 56000, 70000 + 1000, "playerShip");
        this.setCameraTarget(this.playerShip);
    };
    SpaceScene.prototype.updatePlanets = function () {
        var _this = this;
        var playerShip = this.playerShip;
        this.sys.displayList.list.forEach(function (object) {
            if (object._arrayName === "planet") {
                var planet = object;
                var dx = planet.x - playerShip.x;
                var dy = planet.y - playerShip.y;
                if (dx * dx + dy * dy < Math.pow(planet.displayWidth / 2, 2)) {
                    _this.switchToPlanetSceneGroup();
                }
            }
        });
    };
    SpaceScene.prototype.runScenes = function (calledByEntryScene) {
        this.scene.run("spaceCameraController");
        this.scene.run("starSceneController");
        this.runDebugScenes();
        if (calledByEntryScene) {
            this.playerShip.y += 500;
        }
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
    SpaceScene.prototype.sleepScenes = function (calledByEntryScene) {
        this.scene.sleep("spaceLogic");
        this.scene.sleep("spaceCameraController");
        this.scene.sleep("spaceDebug");
        this.scene.sleep("spaceUIDebug");
        this.scene.sleep("starSceneController");
    };
    SpaceScene.prototype.switchToPlanetSceneGroup = function () {
        var entryScene = this.scene.get("entry");
        entryScene.switchSceneGroup("planet");
    };
    SpaceScene.prototype.setCameraTarget = function (cameraTarget) {
        this.cameraTarget = cameraTarget;
        this.cameras.main.startFollow(this.cameraTarget);
    };
    SpaceScene.prototype.getCameraTarget = function () {
        return this.cameraTarget;
    };
    SpaceScene.prototype.update = function (time, delta) {
        var cam = this.cameras.main;
        this.csp.setFollow(cam.scrollX, cam.scrollY);
        this.csp.updateWorld();
        this.updatePlanets();
    };
    return SpaceScene;
}(Phaser.Scene));
exports.default = SpaceScene;
//# sourceMappingURL=SpaceScene.js.map