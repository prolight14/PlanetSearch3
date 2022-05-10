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
        _this.renderTracker = false;
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
        this.miniMapZoom = 0.1;
        this.tracker = new ExplorationTracker_1.default(this);
        this.setTrackerView();
        this.input.keyboard.on("keyup-M", function () {
            _this.mapExplorer.open = !_this.mapExplorer.open;
            _this.updateScenesStates(_this.mapExplorer.open);
        });
        this.fpsText = this.add.text(40, 20, "");
    };
    SpaceMapScene.prototype.setMapExplorerMask = function (mask) {
        this.mapExplorer.setMask(mask);
    };
    SpaceMapScene.prototype.setTrackerView = function () {
        var _a = this.miniMap.getViewportSize(), width = _a.width, height = _a.height;
        this.tracker.setDiscoverViewport(width, height);
    };
    SpaceMapScene.prototype.updateScenesStates = function (open) {
        if (open) {
            this.scene.sleep("space");
            this.scene.sleep("spaceLogic");
            this.scene.sleep("spaceUI");
            this.scene.sleep("spaceCameraController");
            this.scene.sleep("spaceUIDebug");
        }
        else {
            this.scene.wake("space");
            this.scene.wake("spaceLogic");
            this.scene.wake("spaceUI");
            this.scene.wake("spaceCameraController");
            this.scene.wake("spaceUIDebug");
        }
    };
    SpaceMapScene.prototype.update = function (time, delta) {
        var _this = this;
        this.fpsText.setText("Fps: " + (1000 / delta).toFixed(0));
        if (!this.scene.isActive("starSceneController")) {
            return;
        }
        this.mapExplorer.update();
        this.mapExplorer.render();
        this.runMiniMap();
        if (this.renderTracker) {
            this.mapExplorer.renderTracker(this.tracker);
        }
        var setMask = false;
        this.tracker.update(function () {
            _this.setMapExplorerMask(_this.tracker.createMask(_this.mapExplorer.getCamera()));
            setMask = true;
        });
        if (this.mapExplorer.open && !setMask && this.tracker.outMask !== undefined) {
            this.setMapExplorerMask(this.tracker.createMask(this.mapExplorer.getCamera()));
        }
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
        this.setTrackerView();
    };
    return SpaceMapScene;
}(Phaser.Scene));
exports.default = SpaceMapScene;
//# sourceMappingURL=SpaceMapScene.js.map