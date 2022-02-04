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
var CameraTargetTracker_1 = require("./CameraTargetTracker");
var SpaceScene = (function (_super) {
    __extends(SpaceScene, _super);
    function SpaceScene() {
        var _this = _super.call(this, {
            key: "space",
            physics: {
                default: "matter",
                matter: {
                    gravity: false,
                    autoUpdate: false,
                    positionIterations: 4,
                    velocityIterations: 2,
                    constraintIterations: 1
                }
            }
        }) || this;
        _this.loaded = false;
        _this.stepMatter = 0;
        _this.cameraTargetTracker = new CameraTargetTracker_1.default();
        return _this;
    }
    SpaceScene.prototype.preload = function () {
        this.load.image("helixShip", "./assets/Space/Ships/helixShip.png");
        this.load.image("helixShipParticle", "./assets/Space/Ships/helixShipParticle.png");
        this.load.image("helixShipLvl1Bullet", "./assets/Space/Bullets/helixShipLvl1Bullet.png");
        this.load.json("helixShipShape", "./assets/Space/Ships/helixShipShape.json");
        this.load.image("hyperBeamerSTypeGreen", "./assets/Space/Ships/hyperBeamerSTypeGreen.png");
        this.load.image("hyperBeamerSTypeGreenParticle", "./assets/Space/Ships/hyperBeamerSTypeGreenParticle.png");
        this.load.spritesheet("shipHealthBar", "./assets/Space/UI/ShipHealthBar.png", { frameWidth: 40, frameHeight: 57 });
        this.load.image("asteroid1", "./assets/Space/Asteroids/Asteroid.png");
        this.load.image("IcyDwarfPlanet", "./assets/Space/Planets/IcyDwarfPlanet.png");
        this.load.image("RedDustPlanet", "./assets/Space/Planets/RedDustPlanet.png");
        this.load.image("GreenPlanet", "./assets/Space/Planets/GreenPlanet.png");
        this.load.image("grayNebula", "./assets/Space/nebula/grayNebula.png");
        this.load.image("xpStar", "./assets/Space/DroppedItems/XPStar.png");
        this.load.image("smallXPStar", "./assets/Space/DroppedItems/SmallXPStar.png");
        this.load.image("crest", "./assets/Space/DroppedItems/Crest.png");
        this.load.image("shrapnel1", "./assets/Space/Shrapnel/shrapnel1.png");
        this.load.image("shrapnel2", "./assets/Space/Shrapnel/shrapnel2.png");
        this.load.image("shrapnel3", "./assets/Space/Shrapnel/shrapnel3.png");
        this.load.image("shrapnel4", "./assets/Space/Shrapnel/shrapnel4.png");
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
        this.scene.get("spaceLogic").addObjectsToSpace();
        this.csp.syncWithGrid();
        this.runScenes(false);
        this.loaded = true;
        this.prepareStatsGraphics();
        this.cameras.main.startFollow(this.cameraTargetTracker);
    };
    SpaceScene.prototype.handleGameOver = function () {
        this.reloadSpace();
    };
    SpaceScene.prototype.reloadSpace = function () {
        this.csp.initWorld(this.cspConfig);
        this.scene.get("spaceLogic").addObjectsToSpace();
        this.csp.syncWithGrid();
    };
    SpaceScene.prototype.prepareStatsGraphics = function () {
        this.statsGraphics = this.add.graphics().setDepth(4);
    };
    SpaceScene.prototype.runScenes = function (calledByEntryScene) {
        this.scene.run("spaceBackground");
        this.scene.run("spaceLogic");
        this.scene.run("spaceCameraController");
        this.scene.run("starSceneController");
        this.scene.run("spaceUI");
        this.runDebugScenes();
        this.scene.bringToTop("spaceUI");
        var playerShip = this.scene.get("spaceLogic").playerShip;
        if (calledByEntryScene) {
            playerShip.y += 500;
            playerShip.resetKeys();
        }
    };
    SpaceScene.prototype.setCameraTarget = function (object) {
        this.cameraTargetTracker.setTrackedObject(object);
    };
    SpaceScene.prototype.getCameraTarget = function () {
        return this.cameraTargetTracker;
    };
    SpaceScene.prototype.runDebugScenes = function () {
        var _this = this;
        this.scene.run("spaceDebug");
        this.scene.sleep("spaceUIDebug");
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
        this.scene.sleep("spaceBackground");
        this.scene.sleep("spaceLogic");
        this.scene.sleep("spaceCameraController");
        this.scene.sleep("spaceDebug");
        this.scene.sleep("spaceUIDebug");
        this.scene.sleep("starSceneController");
        this.scene.sleep("spaceUI");
    };
    SpaceScene.prototype.switchToPlanetSceneGroup = function (levelInfo) {
        var entryScene = this.scene.get("entry");
        entryScene.switchSceneGroup("planet", function (fromScene, nextScene) {
            nextScene.receiveInfo(levelInfo);
        });
    };
    SpaceScene.prototype.update = function (time, delta) {
        var _this = this;
        var playerShip = this.scene.get("spaceLogic").playerShip;
        this.cameraTargetTracker.update();
        this.csp.setFollow(playerShip.x, playerShip.y);
        this.csp.updateWorld(function (csp) {
            _this.updateStatsGraphics();
            _this.csp.systems.displayList.add(playerShip.particles);
            _this.sys.displayList.list.forEach(function (object) {
                if (object.particles) {
                    csp.systems.displayList.add(object.particles);
                }
                if (object.dead) {
                    object.bodyConf.destroy();
                    object.destroy();
                    csp.systems.displayList.remove(object);
                }
            });
        });
        if (this.stepMatter++ >= 2) {
            this.matter.step(33.33333);
            this.stepMatter = 0;
        }
    };
    SpaceScene.prototype.updateStatsGraphics = function () {
        var _this = this;
        this.csp.systems.displayList.add(this.statsGraphics);
        var cam = this.cameras.main;
        this.statsGraphics.clear();
        this.statsGraphics.setAngle(0);
        this.sys.displayList.list.forEach(function (object) {
            if (object.getTypeName !== undefined && object.getTypeName() === "enemyShip" && object.getHp() < object.getMaxHp()) {
                var enemyShip = object;
                var barX = enemyShip.x - enemyShip.width * 0.5;
                var barY = enemyShip.y - enemyShip.width * 0.7;
                _this.statsGraphics.fillStyle(0x0A297E);
                _this.statsGraphics.fillRect(barX, barY, enemyShip.width, 4);
                _this.statsGraphics.fillStyle(0x54B70E);
                _this.statsGraphics.fillRect(barX, barY, enemyShip.getHp() * enemyShip.width / enemyShip.getMaxHp(), 4);
            }
        });
    };
    return SpaceScene;
}(Phaser.Scene));
exports.default = SpaceScene;
//# sourceMappingURL=SpaceScene.js.map