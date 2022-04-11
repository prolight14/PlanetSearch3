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
var timer_1 = require("../gameObjects/Utils/timer");
var EntryScene = (function (_super) {
    __extends(EntryScene, _super);
    function EntryScene() {
        var _this = _super.call(this, "entry") || this;
        _this.effectRunning = false;
        return _this;
    }
    EntryScene.prototype.preload = function () {
        this.currentSceneGroup = "space";
        this.load.spritesheet("transitionTile", "./assets/Loading/TransitionTile.png", {
            frameWidth: 64,
            frameHeight: 64
        });
    };
    EntryScene.prototype.createEffect = function () {
        var _this = this;
        var cam = this.cameras.main;
        this.effect = this.add.tileSprite(cam.x, cam.y, cam.width * 2, cam.height * 2, "transitionTile");
        this.effectFrame = 0;
        this.effectDirection = 1;
        this.effectDelay = 5;
        var first = false;
        this.effectTimer = timer_1.default(true, this.effectDelay, function () {
            if (!first) {
                first = true;
                return;
            }
            if (_this.effectFrame < 0) {
                _this.effectRunning = false;
                return;
            }
            else if (_this.effectFrame > 27) {
                _this.effectDirection = -_this.effectDirection;
                _this.effectCallback.apply(_this.effectCallbackScope);
            }
            _this.effectFrame += _this.effectDirection;
            _this.effect.setFrame(_this.effectFrame);
            _this.effectTimer.reset();
        });
    };
    EntryScene.prototype.startEffect = function (callback, scope) {
        if (scope === undefined) {
            scope = this;
        }
        this.effectFrame = 0;
        this.effectDirection = 1;
        this.effectDelay = 50;
        this.effectRunning = true;
        this.effect.setVisible(true);
        this.effectCallback = callback;
        this.effectCallbackScope = scope;
    };
    EntryScene.prototype.updateEffect = function () {
        if (this.effectRunning) {
            this.effectTimer.update();
        }
        this.effect.setVisible(this.effectRunning);
    };
    EntryScene.prototype.create = function () {
        this.scene.run(this.currentSceneGroup);
        this.scene.bringToTop();
        this.createEffect();
    };
    EntryScene.prototype.update = function (time, delta) {
        this.updateEffect();
    };
    EntryScene.prototype.newSwitchSceneGroup = function (sceneGroup, callback, callbackScope) {
        var _this = this;
        this.startEffect(function () {
            _this.switchSceneGroup(sceneGroup, callback, callbackScope);
        });
    };
    EntryScene.prototype.switchSceneGroup = function (sceneGroup, callback, callbackScope) {
        if (sceneGroup === this.currentSceneGroup) {
            throw "You are already in \"" + sceneGroup + "\" scene group";
        }
        this.scene.sleep(this.currentSceneGroup);
        this.scene.get(this.currentSceneGroup).sleepScenes(true);
        if (callback !== undefined) {
            callback.apply(callbackScope, [this.scene.get(this.currentSceneGroup), this.scene.get(sceneGroup)]);
        }
        this.scene.run(sceneGroup);
        var nextScene = this.scene.get(sceneGroup);
        if (nextScene.loaded) {
            nextScene.runScenes(true);
        }
        this.currentSceneGroup = sceneGroup;
    };
    return EntryScene;
}(Phaser.Scene));
exports.default = EntryScene;
//# sourceMappingURL=EntryScene.js.map