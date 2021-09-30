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
var BlockIndexes_1 = require("./BlockIndexes");
var PlanetEffectsScene = (function (_super) {
    __extends(PlanetEffectsScene, _super);
    function PlanetEffectsScene() {
        return _super.call(this, "planetEffects") || this;
    }
    PlanetEffectsScene.prototype.preload = function () {
        this.load.audio("brickBreak", "./assets/Planet/Sounds/quickBoom.wav");
        this.load.spritesheet("brick", "./assets/Planet/GameObjects/blocks/brick.png", {
            frameWidth: 8,
            frameHeight: 8,
        });
    };
    PlanetEffectsScene.prototype.create = function () {
        this.brickParticles = this.add.particles("brick");
        this.brickEmitter = this.brickParticles.createEmitter({
            gravityY: 1600,
            lifespan: 5000
        });
        this.brickEmitter.stop();
        this.logicCam = this.scene.get("planetLogic").cameras.main;
        this.sounds = {
            brickBreak: this.sound.add("brickBreak")
        };
    };
    PlanetEffectsScene.prototype.playSound = function (key) {
        this.sounds[key].play();
    };
    ;
    PlanetEffectsScene.prototype.emitBricks = function (bounds) {
        this.logicCam = this.scene.get("planetLogic").cameras.main;
        var emitter = this.brickEmitter;
        var xSpeed = 20;
        var ySpeed = 300;
        emitter.setFrame(0).setSpeedX(-xSpeed).setSpeedY(-ySpeed).emitParticleAt(bounds.x + 0.25 * bounds.width, bounds.y + 0.25 * bounds.height);
        emitter.setFrame(1).setSpeedX(xSpeed).setSpeedY(-ySpeed).emitParticleAt(bounds.x + 0.75 * bounds.width, bounds.y + 0.25 * bounds.height);
        emitter.setFrame(2).setSpeedX(-xSpeed * 2).setSpeedY(-ySpeed).emitParticleAt(bounds.x + 0.25 * bounds.width, bounds.y + 0.75 * bounds.height);
        emitter.setFrame(3).setSpeedX(xSpeed * 2).setSpeedY(-ySpeed).emitParticleAt(bounds.x + 0.75 * bounds.width, bounds.y + 0.75 * bounds.height);
        this.playSound("brickBreak");
    };
    PlanetEffectsScene.prototype.processBrickCollision = function (player, tilemap) {
        if (!player.body.blocked.up) {
            return;
        }
        var logicCam = this.scene.get("planetLogic").cameras.main;
        var tileLeft = tilemap.getTileAtWorldXY(player.body.x, player.body.y - 1, undefined, logicCam, "World");
        var tileRight = tilemap.getTileAtWorldXY(player.body.right, player.body.y - 1, undefined, logicCam, "World");
        if (tileLeft && tileLeft.index === BlockIndexes_1.default.GRASS_PLANET_2.BRICK) {
            var bounds = tileLeft.getBounds();
            tilemap.removeTileAt(tileLeft.x, tileLeft.y, true, true, "World");
            this.emitBricks(bounds);
        }
        else if (tileRight && tileRight.index === BlockIndexes_1.default.GRASS_PLANET_2.BRICK) {
            var bounds = tileRight.getBounds();
            tilemap.removeTileAt(tileRight.x, tileRight.y, true, true, "World");
            this.emitBricks(bounds);
        }
    };
    PlanetEffectsScene.prototype.update = function (time, delta) {
        var mainCam = this.cameras.main;
        var logicCam = this.logicCam;
        mainCam.setScroll(logicCam.scrollX, logicCam.scrollY);
        mainCam.setZoom(logicCam.zoom);
    };
    PlanetEffectsScene.prototype.fadeOut = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.cameras.main.fadeOut.apply(this.cameras.main, arguments);
    };
    PlanetEffectsScene.prototype.fadeIn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.cameras.main.fadeIn.apply(this.cameras.main, arguments);
    };
    return PlanetEffectsScene;
}(Phaser.Scene));
exports.default = PlanetEffectsScene;
//# sourceMappingURL=PlanetEffectsScene.js.map