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
var PlanetScene = (function (_super) {
    __extends(PlanetScene, _super);
    function PlanetScene() {
        var _this = _super.call(this, "planet") || this;
        _this.loaded = false;
        return _this;
    }
    PlanetScene.prototype.receiveInfo = function (levelInfo) {
        this.scene.get("planetLogic").receiveLevelInfo(levelInfo);
    };
    PlanetScene.prototype.create = function () {
        this.spaceBar = this.input.keyboard.addKey("Space");
        this.runScenes();
        this.loaded = true;
    };
    PlanetScene.prototype.update = function () {
        if (this.spaceBar.isDown) {
            this.switchToSpaceSceneGroup();
        }
    };
    PlanetScene.prototype.sleepScenes = function (calledByEntryScene) {
        this.scene.sleep("planetLogic");
        this.scene.sleep("planetEffects");
        this.scene.sleep("planetBack");
        this.scene.sleep("planetUI");
    };
    PlanetScene.prototype.runScenes = function (calledByEntryScene) {
        this.scene.run("planetBack");
        this.scene.run("planetLogic");
        this.scene.run("planetUI");
        this.scene.run("planetEffects");
    };
    PlanetScene.prototype.switchToSpaceSceneGroup = function () {
        var entryScene = this.scene.get("entry");
        this.spaceBar.reset();
        entryScene.switchSceneGroup("space");
    };
    return PlanetScene;
}(Phaser.Scene));
exports.default = PlanetScene;
//# sourceMappingURL=PlanetScene.js.map