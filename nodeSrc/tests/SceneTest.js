"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SceneTest_1 = require("../testHelpers/SceneTest");
function testSpace(game2) {
    var sceneTest1 = new SceneTest_1.default(game2.scene.scenes[0].scene.get("space"));
    if (typeof (sceneTest1.runUpdate()) !== "undefined") {
        throw "Update should return void!";
    }
}
function testEntry(game2) {
    var sceneTest1 = new SceneTest_1.default(game2.scene.scenes[0].scene.get("entry"));
}
function Test(game2) {
    testSpace(game2);
    testEntry(game2);
}
exports.default = Test;
//# sourceMappingURL=SceneTest.js.map