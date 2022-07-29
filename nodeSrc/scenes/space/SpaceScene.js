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
var SpaceGrid_1 = require("./SpaceGrid");
var SpaceScene = (function (_super) {
    __extends(SpaceScene, _super);
    function SpaceScene() {
        var _this = _super.call(this, {
            key: "space",
        }) || this;
        _this.loaded = false;
        _this.stepMatter = 0;
        return _this;
    }
    SpaceScene.prototype.preload = function () {
        this.load.image("helixShip", "./assets/Space/Ships/helixShip.png");
        this.load.image("helixShipParticle", "./assets/Space/Ships/helixShipParticle.png");
        this.load.image("helixShipLvl1Bullet", "./assets/Space/Bullets/helixShipLvl1Bullet.png");
        this.load.json("helixShipShape", "./assets/Space/Ships/helixShipShape.json");
        this.load.spritesheet("greenShip", "./assets/Space/Ships/GreenShip1.png", { frameWidth: 24, frameHeight: 24 });
        this.load.image("hyperBeamerSTypeGreen", "./assets/Space/Ships/hyperBeamerSTypeGreen.png");
        this.load.image("hyperBeamerSTypeGreenParticle", "./assets/Space/Ships/hyperBeamerSTypeGreenParticle.png");
        this.load.image("xpStar", "./assets/Space/DroppedItems/XPStar.png");
        this.load.image("smallXPStar", "./assets/Space/DroppedItems/SmallXPStar.png");
        this.load.image("crest", "./assets/Space/DroppedItems/Crest.png");
        this.load.image("IcyDwarfPlanet", "./assets/Space/Planets/IcyDwarfPlanet.png");
        this.load.image("RedDustPlanet", "./assets/Space/Planets/RedDustPlanet.png");
        this.load.image("JunglePlanet", "./assets/Space/Planets/JunglePlanet.png");
        this.load.image("Sun", "./assets/Space/Suns/Sun.png");
        this.load.image("asteroid1", "./assets/Space/Asteroids/Asteroid.png");
        this.load.image("grayNebula", "./assets/Space/nebula/grayNebula.png");
        this.load.image("purpleNebula", "./assets/Space/nebula/purpleNebula.png");
        this.load.image("shrapnel1", "./assets/Space/Shrapnel/shrapnel1.png");
        this.load.image("shrapnel2", "./assets/Space/Shrapnel/shrapnel2.png");
        this.load.image("shrapnel3", "./assets/Space/Shrapnel/shrapnel3.png");
        this.load.image("shrapnel4", "./assets/Space/Shrapnel/shrapnel4.png");
        this.load.spritesheet("shipHealthBar", "./assets/Space/UI/ShipHealthBar.png", { frameWidth: 40, frameHeight: 57 });
        this.load.glsl("planetLighting", "./assets/space/shaders/planetLighting.glsl");
        this.load.audio("space", "./assets/Music/space.mp3");
    };
    SpaceScene.prototype.create = function () {
        var worldWidth = 204800;
        var worldHeight = 204800;
        var cellWidth = 512;
        var cellHeight = 512;
        this.cspConfig = {
            window: {
                width: this.game.config.width,
                height: this.game.config.height
            },
            grid: {
                cols: worldWidth / cellWidth,
                rows: worldHeight / cellHeight,
                cellWidth: cellWidth,
                cellHeight: cellHeight
            },
            seed: this.game.config.seed
        };
        this.world = new SpaceGrid_1.default(this.sys, this.cspConfig);
        this.world.buildSpace();
        this.scene.get("spaceLogic").addObjectsToSpace();
        this.runScenes(false);
        this.prepareStatsGraphics();
        this.generateBulletsTextures();
        this.cameras.main.startFollow(this.scene.get("spaceLogic").playerShip);
        this.loaded = true;
        var spaceMusic = this.sound.add("space", {
            loop: true
        });
        spaceMusic.play();
    };
    SpaceScene.prototype.generateBulletsTextures = function () {
        this.generateBullet("lightningBlue", 2, 16, 0x3CD3F8);
        this.generateBullet("lightningBlueLong", 2, 24, 0x3CD3F8);
    };
    SpaceScene.prototype.generateBullet = function (key, width, length, color) {
        var rt = this.add.renderTexture(0, 0, width, length);
        var graphics = this.add.graphics();
        graphics.fillStyle(color);
        graphics.fillRect(0, 0, width, length);
        rt.draw(graphics);
        graphics.setVisible(false);
        graphics.destroy();
        rt.saveTexture(key);
        rt.setVisible(false);
    };
    SpaceScene.prototype.handleGameOver = function () {
        this.reloadSpace();
    };
    SpaceScene.prototype.reloadSpace = function () {
        this.scene.get("spaceManager").destroySolarSystems();
        this.world.resetSpace();
        this.scene.get("spaceLogic").addObjectsToSpace();
        this.cameras.main.startFollow(this.scene.get("spaceLogic").playerShip);
    };
    SpaceScene.prototype.prepareStatsGraphics = function () {
        this.statsGraphics = this.add.graphics().setDepth(4);
    };
    SpaceScene.prototype.runScenes = function (calledByEntryScene) {
        this.runDebugScenes();
        this.scene.run("spaceLogic");
        this.scene.run("spaceCameraController");
        this.scene.run("starSceneController");
        this.scene.run("spaceUI");
        this.scene.run("spaceMap");
        this.scene.run("spaceManager");
        this.scene.bringToTop("spaceMap");
        var playerShip = this.scene.get("spaceLogic").playerShip;
        if (calledByEntryScene) {
            playerShip.y += 500;
            playerShip.resetKeys();
        }
    };
    SpaceScene.prototype.runDebugScenes = function () {
        var _this = this;
        this.scene.run("spaceDebug");
        this.scene.sleep("spaceDebug");
        this.scene.bringToTop("spaceUIDebug");
        this.scene.run("spaceUIDebug");
        this.scene.sleep("spaceUIDebug");
        this.scene.get("spaceUIDebug").scene.setVisible(false);
        this.input.keyboard.on("keydown-U", function () {
            if (_this.scene.isSleeping("spaceUIDebug")) {
                _this.scene.wake("spaceUIDebug");
                _this.scene.bringToTop("spaceUIDebug");
                _this.scene.get("spaceUIDebug").scene.setVisible(true);
            }
            else {
                _this.scene.sleep("spaceUIDebug");
                _this.scene.get("spaceUIDebug").scene.setVisible(false);
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
    SpaceScene.prototype.sleepDebugScenes = function () {
        this.scene.sleep("spaceDebug");
        this.scene.sleep("spaceUIDebug");
    };
    SpaceScene.prototype.sleepScenes = function (calledByEntryScene) {
        this.scene.moveBelow("spaceUI");
        this.scene.sleep("spaceUI");
        this.scene.sleep("starSceneController");
        this.scene.sleep("spaceCameraController");
        this.scene.sleep("spaceMap");
        this.scene.sleep("spaceLogic");
        this.sleepDebugScenes();
    };
    SpaceScene.prototype.stopScenes = function () {
        this.scene.stop("spaceUIDebug");
        this.scene.stop("spaceDebug");
        this.scene.stop("spaceUI");
        this.scene.stop("starSceneController");
        this.scene.stop("spaceCameraController");
        this.scene.stop("spaceMap");
        this.scene.stop("spaceLogic");
        this.scene.stop("spaceManager");
    };
    SpaceScene.prototype.switchToPlanetSceneGroup = function (levelInfo) {
        var entryScene = this.scene.get("entry");
        entryScene.switchSceneGroup("planet", function (fromScene, nextScene) {
            nextScene.receiveInfo(levelInfo);
        });
    };
    SpaceScene.prototype.update = function (time, delta) {
        var _this = this;
        var cam = this.cameras.main;
        this.world.updateScroll(cam.scrollX + cam.centerX, cam.scrollY + cam.centerY);
        this.world.updateSpace();
        this.sys.displayList.list.forEach(function (gameObject) {
            if (gameObject.particles !== undefined) {
                _this.sys.displayList.add(gameObject.particles);
            }
        });
        this.updateStatsGraphics();
        if (this.stepMatter++ >= 2) {
            this.matter.step(1000 / 30, 0);
            this.stepMatter = 0;
        }
    };
    SpaceScene.prototype.updateStatsGraphics = function () {
        var _this = this;
        this.statsGraphics.clear();
        this.statsGraphics.setAngle(0);
        this.sys.displayList.list.forEach(function (object) {
            if (object.showHpBar) {
                var enemyShip = object;
                var graphics = _this.statsGraphics;
                if (enemyShip.getHp() < enemyShip.getMaxHp()) {
                    var barX = enemyShip.x - enemyShip.width * 0.5;
                    var barY = enemyShip.y - enemyShip.width * 0.7;
                    graphics.fillStyle(0x0A297E);
                    graphics.fillRect(barX, barY, enemyShip.width, 4);
                    graphics.fillStyle(0x54B70E);
                    graphics.fillRect(barX, barY, enemyShip.getHp() * enemyShip.width / enemyShip.getMaxHp(), 4);
                    graphics.lineStyle(10, 0x0FAB23);
                }
            }
        });
        this.sys.displayList.add(this.statsGraphics);
    };
    return SpaceScene;
}(Phaser.Scene));
exports.default = SpaceScene;
//# sourceMappingURL=SpaceScene.js.map