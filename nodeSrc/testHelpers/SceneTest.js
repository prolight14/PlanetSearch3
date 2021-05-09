"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SceneTest = (function () {
    function SceneTest(scene) {
        this.scene = scene;
    }
    SceneTest.prototype.runUpdate = function () {
        return this.scene.update();
    };
    return SceneTest;
}());
exports.default = SceneTest;
//# sourceMappingURL=SceneTest.js.map