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
var StarSceneControllerScene = (function (_super) {
    __extends(StarSceneControllerScene, _super);
    function StarSceneControllerScene() {
        return _super.call(this, "starSceneController") || this;
    }
    StarSceneControllerScene.prototype.preload = function () {
        this.load.image("starBackground1", "./assets/Space/Stars/starBackground1.png");
        this.load.image("starBackground2", "./assets/Space/Stars/starBackground2.png");
        this.load.image("starBackground3", "./assets/Space/Stars/starBackground3.png");
    };
    StarSceneControllerScene.prototype.create = function () {
        var cam = this.cameras.main;
        this.starLayers = new Array();
        this.scrollValues = [0.65, 0.9, 1];
        var layerAmt = this.scrollValues.length;
        for (var i = 1; i <= layerAmt; i++) {
            var tileSprite = this.add.tileSprite(cam.centerX, cam.centerY, cam.width * 2, cam.height * 2, "starBackground" + i).setDepth(i - layerAmt);
            tileSprite.setOrigin(0.5);
            tileSprite.setTint(0x00FFFF);
            this.starLayers.push(tileSprite);
        }
        this.scene.sendToBack("starSceneController");
        this.scene.run("spaceMap");
        this.scene.bringToTop("spaceMap");
    };
    StarSceneControllerScene.prototype.update = function (time, delta) {
        var cam = this.scene.get("space").cameras.main;
        var scrollX = cam.scrollX, scrollY = cam.scrollY, zoom = cam.zoom;
        var rf = (1 - 1 / zoom);
        for (var i = 0; i < this.starLayers.length; i++) {
            var tileSprite = this.starLayers[i];
            tileSprite.setTileScale(zoom);
            tileSprite.setTilePosition(rf * cam.width + scrollX * this.scrollValues[i] | 0, rf * cam.height + scrollY * this.scrollValues[i] | 0);
        }
    };
    StarSceneControllerScene.prototype.updateToRenderTexture = function (rt, cam, starZoom, relativeWidth, relativeHeight, layerAmt, overrideScroll) {
        var starLayers = this.starLayers;
        var scrollValues = this.scrollValues;
        var zoom = cam.zoom * starZoom;
        if (layerAmt === undefined) {
            layerAmt = starLayers.length;
        }
        if (overrideScroll !== undefined) {
            scrollValues = overrideScroll;
        }
        for (var i = 0; i < layerAmt; i++) {
            var tileSprite = starLayers[i];
            tileSprite.setTileScale(zoom);
            tileSprite.setTilePosition((relativeWidth + cam.scrollX * scrollValues[i]) / starZoom | 0, (relativeHeight + cam.scrollY * scrollValues[i]) / starZoom | 0);
            rt.batchDraw(tileSprite, tileSprite.x, tileSprite.y);
        }
    };
    return StarSceneControllerScene;
}(Phaser.Scene));
exports.default = StarSceneControllerScene;
//# sourceMappingURL=StarSceneControllerScene.js.map