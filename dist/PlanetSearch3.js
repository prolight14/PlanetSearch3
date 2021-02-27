/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameObjects/space/PlayerShip.ts":
/*!*********************************************!*\
  !*** ./src/gameObjects/space/PlayerShip.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
var SpaceGameObject_1 = __webpack_require__(/*! ./SpaceGameObject */ "./src/gameObjects/space/SpaceGameObject.ts");
var PlayerShip = (function (_super) {
    __extends(PlayerShip, _super);
    function PlayerShip(scene, x, y, texture) {
        var _this = _super.call(this, scene, x, y, texture) || this;
        _this.keys = {
            a: scene.input.keyboard.addKey('a'),
            d: scene.input.keyboard.addKey('d'),
            w: scene.input.keyboard.addKey('w'),
            s: scene.input.keyboard.addKey('s')
        };
        _this.controls = {
            turnLeft: function () {
                return _this.keys.a.isDown;
            },
            turnRight: function () {
                return _this.keys.d.isDown;
            },
            goForward: function () {
                return _this.keys.w.isDown;
            }
        };
        _this.setScale(2, 2);
        _this.angleVel = 3;
        _this.speed = 6;
        return _this;
    }
    PlayerShip.prototype.preUpdate = function () {
        if (this.controls.turnLeft()) {
            this.setAngle(this.angle - this.angleVel);
        }
        if (this.controls.turnRight()) {
            this.setAngle(this.angle + this.angleVel);
        }
        if (this.controls.goForward()) {
            var angle = Phaser.Math.DEG_TO_RAD * (this.angle - 90);
            this.x += Math.cos(angle) * this.speed;
            this.y += Math.sin(angle) * this.speed;
        }
        this.bodyConf.update();
    };
    return PlayerShip;
}(SpaceGameObject_1.default));
exports.default = PlayerShip;


/***/ }),

/***/ "./src/gameObjects/space/SpaceGameObject.ts":
/*!**************************************************!*\
  !*** ./src/gameObjects/space/SpaceGameObject.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
var SpaceGameObject = (function (_super) {
    __extends(SpaceGameObject, _super);
    function SpaceGameObject(scene, x, y, texture, frame) {
        var _this_1 = _super.call(this, scene, x, y, texture, frame) || this;
        scene.add.existing(_this_1);
        var _this = _this_1;
        _this_1.bodyConf = {
            moves: true,
            boundingBox: {},
            update: function () { },
            destroy: function () { }
        };
        _this_1.bodyConf.updateBoundingBox = function () {
            this.boundingBox.minX = _this.x - _this.displayWidth / 2;
            this.boundingBox.minY = _this.y - _this.displayHeight / 2;
            this.boundingBox.maxX = _this.x + _this.displayWidth / 2;
            this.boundingBox.maxY = _this.y + _this.displayHeight / 2;
        };
        _this_1.bodyConf.updateBoundingBox();
        return _this_1;
    }
    return SpaceGameObject;
}(Phaser.GameObjects.Sprite));
exports.default = SpaceGameObject;


/***/ }),

/***/ "./src/scenes/space/SpaceDebugScene.ts":
/*!*********************************************!*\
  !*** ./src/scenes/space/SpaceDebugScene.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
var SpaceDebugScene = (function (_super) {
    __extends(SpaceDebugScene, _super);
    function SpaceDebugScene() {
        return _super.call(this, "spaceDebug") || this;
    }
    SpaceDebugScene.prototype.create = function () {
        this.cellGraphics = this.add.graphics();
        this.cellCoorText = this.add.text(40, 260, "").setScrollFactor(0);
        this.cellText = this.add.text(40, 274, "").setScrollFactor(0);
        this.fpsText = this.add.text(40, 20, "").setScrollFactor(0);
        this.shipPositionText = this.add.text(550, 20, "").setScrollFactor(0);
        this.spaceScene = this.scene.get("space");
        this.spaceCamera = this.scene.get("space").cameras.main;
    };
    SpaceDebugScene.prototype.update = function (time, delta) {
        this.fpsText.setText("Fps: " + (1000 / delta).toFixed(0));
        var playerShip = this.spaceScene.playerShip;
        this.shipPositionText.setText("(" + playerShip.x.toFixed(2) + ", " + playerShip.y.toFixed(2) + ")");
        this.cameras.main.setScroll(this.spaceCamera.scrollX, this.spaceCamera.scrollY);
        this.showGrid();
        this.peekCell();
    };
    SpaceDebugScene.prototype.showGrid = function () {
        var _this = this;
        var spaceScene = this.scene.get("space");
        this.cellGraphics.clear();
        this.cellGraphics.lineStyle(2, 0x549431, 1.0);
        var cellWidth = spaceScene.csp.world.cameraGrid.cellWidth;
        var cellHeight = spaceScene.csp.world.cameraGrid.cellHeight;
        spaceScene.csp.world.loopThroughVisibleCells(function (cell, col, row) {
            _this.cellGraphics.strokeRect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
        });
    };
    SpaceDebugScene.prototype.peekCell = function () {
        var cspWorld = this.spaceScene.csp.world;
        var coordinates = cspWorld.cameraGrid.getCoordinates(cspWorld.camera.scrollX - cspWorld.camera.halfWidth + this.input.activePointer.x, cspWorld.camera.scrollY - cspWorld.camera.halfHeight + this.input.activePointer.y);
        var cell = cspWorld.cameraGrid.grid[coordinates.col][coordinates.row];
        this.cellCoorText.setText("(" + coordinates.col + ", " + coordinates.row + ")");
        var txt = "";
        for (var i in cell) {
            txt += i;
        }
        this.cellText.setText(txt);
    };
    return SpaceDebugScene;
}(Phaser.Scene));
exports.default = SpaceDebugScene;


/***/ }),

/***/ "./src/scenes/space/SpaceScene.ts":
/*!****************************************!*\
  !*** ./src/scenes/space/SpaceScene.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
var PlayerShip_1 = __webpack_require__(/*! ../../gameObjects/space/PlayerShip */ "./src/gameObjects/space/PlayerShip.ts");
var SpaceScene = (function (_super) {
    __extends(SpaceScene, _super);
    function SpaceScene() {
        return _super.call(this, "space") || this;
    }
    SpaceScene.prototype.preload = function () {
        this.load.image("playerShip", "./assets/playership.png");
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
                cols: 345,
                rows: 345,
                cellWidth: 400,
                cellHeight: 400
            }
        };
        this.csp.initWorld(this.cspConfig);
        this.playerShip = this.csp.world.add.gameObjectArray(PlayerShip_1.default).add(this, 69000, 69000, "playerShip");
        this.csp.syncWithGrid();
        this.cameras.main.startFollow(this.playerShip);
        this.runScenes();
    };
    SpaceScene.prototype.runScenes = function () {
        this.scene.run("spaceDebug");
    };
    SpaceScene.prototype.update = function (time, delta) {
        this.csp.setFollow(this.playerShip.x, this.playerShip.y);
        this.csp.updateWorld();
    };
    return SpaceScene;
}(Phaser.Scene));
exports.default = SpaceScene;


/***/ }),

/***/ "./src/scenes/space/SpaceStarScene.ts":
/*!********************************************!*\
  !*** ./src/scenes/space/SpaceStarScene.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
var SpaceStarScene = (function (_super) {
    __extends(SpaceStarScene, _super);
    function SpaceStarScene() {
        return _super.call(this, "spaceStar") || this;
    }
    SpaceStarScene.prototype.create = function () {
        console.log("Created Star Scene");
    };
    return SpaceStarScene;
}(Phaser.Scene));
exports.default = SpaceStarScene;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var SpaceScene_1 = __webpack_require__(/*! ./scenes/space/SpaceScene */ "./src/scenes/space/SpaceScene.ts");
var SpaceStarScene_1 = __webpack_require__(/*! ./scenes/space/SpaceStarScene */ "./src/scenes/space/SpaceStarScene.ts");
var SpaceDebugScene_1 = __webpack_require__(/*! ./scenes/space/SpaceDebugScene */ "./src/scenes/space/SpaceDebugScene.ts");
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 450,
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [SpaceScene_1.default, SpaceStarScene_1.default, SpaceDebugScene_1.default],
};
var game = new Phaser.Game(config);
window.game = game;

})();

/******/ })()
;
//# sourceMappingURL=PlanetSearch3.js.map