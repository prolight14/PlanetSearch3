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
var ExplorationTracker_1 = require("../../mapSystem/space/ExplorationTracker");
var MapExplorer_1 = require("../../mapSystem/space/MapExplorer");
var MiniMapSystem_1 = require("../../mapSystem/space/MiniMapSystem");
var SpaceMapScene = (function (_super) {
    __extends(SpaceMapScene, _super);
    function SpaceMapScene() {
        var _this = _super.call(this, "spaceMap") || this;
        _this.miniMapZoom = 1;
        return _this;
    }
    SpaceMapScene.prototype.create = function () {
        var _this = this;
        this.starScene = this.scene.get("starSceneController");
        this.spaceSceneCam = this.scene.get("space").cameras.main;
        this.miniMap = new MiniMapSystem_1.default();
        var mapWidth = 250 * 1.2;
        var mapHeight = 150 * 1.0;
        this.miniMap.createMap(this, this.spaceSceneCam.width - mapWidth, this.spaceSceneCam.height - mapHeight, mapWidth, mapHeight);
        this.mapExplorer = new MapExplorer_1.default(this);
        this.updateScenesStates(this.mapExplorer.open);
        this.input.keyboard.on("keyup-M", function () {
            _this.mapExplorer.open = !_this.mapExplorer.open;
            _this.updateScenesStates(_this.mapExplorer.open);
        });
        this.tracker = new ExplorationTracker_1.default(this);
        this.mapExplorer.setCanRender(this.tracker.hasBeenUncovered, this.tracker);
        this.miniMapZoom = 0.1;
    };
    SpaceMapScene.prototype.updateScenesStates = function (open) {
        if (open) {
            this.scene.sleep("space");
            this.scene.sleep("spaceLogic");
            this.scene.sleep("spaceUI");
            this.scene.sleep("spaceCameraController");
        }
        else {
            this.scene.run("space");
            this.scene.run("spaceLogic");
            this.scene.run("spaceUI");
            this.scene.run("spaceCameraController");
        }
    };
    SpaceMapScene.prototype.update = function () {
        if (!this.scene.isActive("starSceneController")) {
            return;
        }
        this.mapExplorer.update();
        this.mapExplorer.render();
        this.mapExplorer.renderTracker(this.tracker);
        this.runMiniMap();
        this.tracker.update();
    };
    SpaceMapScene.prototype.runMiniMap = function () {
        var starScene = this.starScene;
        var zoom = this.miniMapZoom;
        this.miniMap.updateMap(zoom, this.spaceSceneCam, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            starScene.updateToRenderTexture.apply(starScene, args);
        });
        var _a = this.miniMap.getViewportSize(), width = _a.width, height = _a.height;
        this.tracker.setDiscoverViewport(0, 0, width / zoom, height / zoom);
    };
    return SpaceMapScene;
}(Phaser.Scene));
exports.default = SpaceMapScene;
//# sourceMappingURL=SpaceMapScene.js.map