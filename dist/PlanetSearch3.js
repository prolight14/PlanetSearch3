var PlanetSearch3;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./gameObjects/planet/Player.js":
/*!**************************************!*\
  !*** ./gameObjects/planet/Player.js ***!
  \**************************************/
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
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "helix") || this;
        scene.add.existing(_this);
        scene.physics.add.existing(_this);
        _this.setDrag(300, 0).setMaxVelocity(145, 500).setScale(0.5, 1);
        _this.keys = {
            a: scene.input.keyboard.addKey('a'),
            d: scene.input.keyboard.addKey('d'),
            w: scene.input.keyboard.addKey('w'),
            s: scene.input.keyboard.addKey('s'),
            left: scene.input.keyboard.addKey("left"),
            right: scene.input.keyboard.addKey("right"),
            up: scene.input.keyboard.addKey("up"),
            down: scene.input.keyboard.addKey("down"),
        };
        _this.controls = {
            left: function () {
                return _this.keys.a.isDown || _this.keys.left.isDown;
            },
            right: function () {
                return _this.keys.d.isDown || _this.keys.right.isDown;
            },
            up: function () {
                return _this.keys.w.isDown || _this.keys.up.isDown;
            },
            down: function () {
                return _this.keys.s.isDown || _this.keys.down.isDown;
            }
        };
        return _this;
    }
    Player.prototype.preUpdate = function (time, delta) {
        var onGround = this.body.blocked.down;
        if (this.controls.left()) {
            this.setAccelerationX(-800);
        }
        if (this.controls.right()) {
            this.setAccelerationX(800);
        }
        if (!this.controls.left() && !this.controls.right()) {
            this.setAccelerationX(0);
        }
        if (onGround && this.controls.up()) {
            this.setVelocityY(-345);
        }
        if (this.y > this.scene.cameras.main.getBounds().height) {
            this.kill();
        }
    };
    Player.prototype.kill = function () {
        this.dead = true;
        this.destroy();
    };
    return Player;
}(Phaser.Physics.Arcade.Sprite));
exports.default = Player;
//# sourceMappingURL=Player.js.map

/***/ }),

/***/ "./gameObjects/space/EnemyShip.js":
/*!****************************************!*\
  !*** ./gameObjects/space/EnemyShip.js ***!
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
var Ship_1 = __webpack_require__(/*! ./Ship */ "./gameObjects/space/Ship.js");
var timer = function (start, interval, func, scope, args) {
    var startTime = performance.now();
    var called = !start;
    var update = function () {
        if (!called && performance.now() - startTime > interval) {
            called = true;
            return func.apply(scope, args);
        }
    };
    var reset = function () {
        startTime = performance.now();
        called = false;
    };
    return {
        update: update,
        reset: reset
    };
};
var EnemyShip = (function (_super) {
    __extends(EnemyShip, _super);
    function EnemyShip(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "enemyShip") || this;
        _this.turnDir = "";
        _this.controls = {
            turnLeft: function () {
                return _this.turnDir === "left";
            },
            turnRight: function () {
                return _this.turnDir === "right";
            },
            goForward: function () {
                return true;
            },
            shoot: function () { return false; }
        };
        _this.setScale(2, 2);
        _this.angleVel = 3;
        _this.speed = 4.5;
        _this.turnTimer = timer(true, 1000, function () {
            switch (true) {
                case Math.random() <= 0.33:
                    this.turnDir = "left";
                    break;
                case Math.random() < 0.67:
                    this.turnDir = "right";
                    break;
                case Math.random() <= 1.0:
                    this.turnDir = "";
                    break;
            }
            this.turnTimer.reset();
        }, _this);
        return _this;
    }
    EnemyShip.prototype.preUpdate = function () {
        Ship_1.default.prototype.preUpdate.apply(this, arguments);
        this.turnTimer.update();
    };
    return EnemyShip;
}(Ship_1.default));
exports.default = EnemyShip;
//# sourceMappingURL=EnemyShip.js.map

/***/ }),

/***/ "./gameObjects/space/Nebula.js":
/*!*************************************!*\
  !*** ./gameObjects/space/Nebula.js ***!
  \*************************************/
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
var SpaceGameObject_1 = __webpack_require__(/*! ./SpaceGameObject */ "./gameObjects/space/SpaceGameObject.js");
var Nebula = (function (_super) {
    __extends(Nebula, _super);
    function Nebula(scene, x, y, texture) {
        return _super.call(this, scene, x, y, texture) || this;
    }
    return Nebula;
}(SpaceGameObject_1.default));
exports.default = Nebula;
//# sourceMappingURL=Nebula.js.map

/***/ }),

/***/ "./gameObjects/space/Planet.js":
/*!*************************************!*\
  !*** ./gameObjects/space/Planet.js ***!
  \*************************************/
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
var SpaceGameObject_1 = __webpack_require__(/*! ./SpaceGameObject */ "./gameObjects/space/SpaceGameObject.js");
var Planet = (function (_super) {
    __extends(Planet, _super);
    function Planet(scene, x, y, texture) {
        return _super.call(this, scene, x, y, texture) || this;
    }
    Planet.prototype.preUpdate = function () {
        this.bodyConf.update();
    };
    Planet.prototype.onCollide = function (object) {
        if (object._arrayName === "playerShip") {
        }
        console.log("hit!");
    };
    return Planet;
}(SpaceGameObject_1.default));
exports.default = Planet;
//# sourceMappingURL=Planet.js.map

/***/ }),

/***/ "./gameObjects/space/PlayerShip.js":
/*!*****************************************!*\
  !*** ./gameObjects/space/PlayerShip.js ***!
  \*****************************************/
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
var Ship_1 = __webpack_require__(/*! ./Ship */ "./gameObjects/space/Ship.js");
var PlayerShip = (function (_super) {
    __extends(PlayerShip, _super);
    function PlayerShip(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "playerShip") || this;
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
            },
            shoot: function () { return false; }
        };
        _this.setScale(2, 2);
        _this.angleVel = 3;
        _this.speed = 6;
        return _this;
    }
    PlayerShip.prototype.preUpdate = function () {
        Ship_1.default.prototype.preUpdate.apply(this, arguments);
    };
    return PlayerShip;
}(Ship_1.default));
exports.default = PlayerShip;
//# sourceMappingURL=PlayerShip.js.map

/***/ }),

/***/ "./gameObjects/space/Ship.js":
/*!***********************************!*\
  !*** ./gameObjects/space/Ship.js ***!
  \***********************************/
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
var SpaceGameObject_1 = __webpack_require__(/*! ./SpaceGameObject */ "./gameObjects/space/SpaceGameObject.js");
var Ship = (function (_super) {
    __extends(Ship, _super);
    function Ship(scene, x, y, texture) {
        return _super.call(this, scene, x, y, texture) || this;
    }
    Ship.prototype.preUpdate = function () {
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
    return Ship;
}(SpaceGameObject_1.default));
exports.default = Ship;
//# sourceMappingURL=Ship.js.map

/***/ }),

/***/ "./gameObjects/space/SpaceGameObject.js":
/*!**********************************************!*\
  !*** ./gameObjects/space/SpaceGameObject.js ***!
  \**********************************************/
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
//# sourceMappingURL=SpaceGameObject.js.map

/***/ }),

/***/ "./scenes/EntryScene.js":
/*!******************************!*\
  !*** ./scenes/EntryScene.js ***!
  \******************************/
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
var EntryScene = (function (_super) {
    __extends(EntryScene, _super);
    function EntryScene() {
        return _super.call(this, "entry") || this;
    }
    EntryScene.prototype.preload = function () {
        this.currentSceneGroup = "space";
    };
    EntryScene.prototype.create = function () {
        this.scene.run(this.currentSceneGroup);
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

/***/ }),

/***/ "./scenes/planet/PlanetLogicScene.js":
/*!*******************************************!*\
  !*** ./scenes/planet/PlanetLogicScene.js ***!
  \*******************************************/
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
var Player_1 = __webpack_require__(/*! ../../gameObjects/planet/Player */ "./gameObjects/planet/Player.js");
var PlanetLogicScene = (function (_super) {
    __extends(PlanetLogicScene, _super);
    function PlanetLogicScene() {
        var _this = _super.call(this, {
            key: "planetLogic",
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: 800 }
                }
            }
        }) || this;
        _this.levelAssetsPrefix = "IcyDwarf";
        return _this;
    }
    PlanetLogicScene.prototype.preload = function () {
        this.load.image("IcyDwarfTileset", "./assets/Planet/Levels/IcyDwarf/Tilesets/IcyDwarfTileset.png");
        this.load.tilemapTiledJSON("IcyDwarfTilemap", "./assets/Planet/Levels/IcyDwarf/Tilemaps/IcyDwarfTilemap.json");
    };
    PlanetLogicScene.prototype.receiveLevelInfo = function (passObj) {
        switch (passObj.type) {
            case "planet":
                var planet = passObj.from;
                this.levelAssetsPrefix = this.planetName = planet.texture.key.replace("Planet", "");
                break;
        }
    };
    PlanetLogicScene.prototype.create = function () {
        var tilemap = this.make.tilemap({ key: this.levelAssetsPrefix + "Tilemap", tileWidth: 16, tileHeight: 16 });
        var tileset = tilemap.addTilesetImage(this.levelAssetsPrefix + "Tileset");
        var worldLayer = tilemap.createStaticLayer("World", tileset, 0, 0);
        worldLayer.setCollisionByProperty({ collides: true });
        var spawnPoint = tilemap.findObject("Objects", function (obj) { return obj.name === "Spawn Point"; });
        this.player = new Player_1.default(this, spawnPoint.x, spawnPoint.y);
        this.physics.add.collider(this.player, worldLayer);
        var cam = this.cameras.main;
        cam.startFollow(this.player);
        cam.setZoom(2);
        cam.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
    };
    PlanetLogicScene.prototype.update = function () {
        if (this.player.dead) {
            this.scene.restart();
        }
    };
    return PlanetLogicScene;
}(Phaser.Scene));
exports.default = PlanetLogicScene;
//# sourceMappingURL=PlanetLogicScene.js.map

/***/ }),

/***/ "./scenes/planet/PlanetScene.js":
/*!**************************************!*\
  !*** ./scenes/planet/PlanetScene.js ***!
  \**************************************/
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
    PlanetScene.prototype.preload = function () {
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
    };
    PlanetScene.prototype.runScenes = function (calledByEntryScene) {
        this.scene.run("planetLogic");
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

/***/ }),

/***/ "./scenes/space/SpaceBackgroundScene.js":
/*!**********************************************!*\
  !*** ./scenes/space/SpaceBackgroundScene.js ***!
  \**********************************************/
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
var SpaceBackgroundScene = (function (_super) {
    __extends(SpaceBackgroundScene, _super);
    function SpaceBackgroundScene() {
        return _super.call(this, "spaceBackground") || this;
    }
    SpaceBackgroundScene.prototype.preload = function () {
    };
    SpaceBackgroundScene.prototype.create = function () {
        this.background = this.add.graphics();
        var screenWidth = this.game.config.width;
        var screenHeight = this.game.config.height;
        this.background.fillStyle(0x000022);
        this.background.fillRect(0, 0, screenWidth, screenHeight);
    };
    return SpaceBackgroundScene;
}(Phaser.Scene));
exports.default = SpaceBackgroundScene;
//# sourceMappingURL=SpaceBackgroundScene.js.map

/***/ }),

/***/ "./scenes/space/SpaceCameraControllerScene.js":
/*!****************************************************!*\
  !*** ./scenes/space/SpaceCameraControllerScene.js ***!
  \****************************************************/
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
var SpaceCameraControllerScene = (function (_super) {
    __extends(SpaceCameraControllerScene, _super);
    function SpaceCameraControllerScene() {
        return _super.call(this, "spaceCameraController") || this;
    }
    SpaceCameraControllerScene.prototype.create = function () {
        var _this = this;
        this.spaceScene = this.scene.get("space");
        this.spaceDebugScene = this.scene.get("spaceDebug");
        this.input.on('wheel', function (pointer, currentlyOver, dx, dy, dz) {
            var cam = _this.cameras.main;
            _this.updateZoom(Math.min(Math.max(cam.zoom - dy * 0.001, 0.3), 1.5));
        });
        this.keys = {
            rotateLeft: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            rotateRight: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            rotateReset: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO)
        };
        this.camAngle = 0;
        this.angleSpeed = 2;
        this.updateZoom(1);
    };
    SpaceCameraControllerScene.prototype.getCamAngle = function () {
        return this.camAngle;
    };
    SpaceCameraControllerScene.prototype.getCameraAngle = function () {
        return this.camAngle;
    };
    SpaceCameraControllerScene.prototype.updateZoom = function (zoom) {
        var cam = this.cameras.main;
        cam.setZoom(zoom);
        this.spaceScene.cameras.main.setZoom(cam.zoom);
        this.spaceDebugScene.cameras.main.setZoom(cam.zoom);
        cam.roundPixels = true;
        this.spaceDebugScene.cameras.main.setRoundPixels(true);
        this.resizeCSPCameraWindow();
    };
    SpaceCameraControllerScene.prototype.adjustCameraAngle = function (angle) {
        this.cameras.main.setAngle(angle);
        this.spaceScene.cameras.main.setAngle(angle);
        this.spaceDebugScene.cameras.main.setAngle(angle);
        this.resizeCSPCameraWindow();
    };
    SpaceCameraControllerScene.prototype.update = function () {
        var cam = this.cameras.main;
        var cameraTarget = this.spaceScene.getCameraTarget();
        cam.setScroll(cameraTarget.x - cam.width / 2, cameraTarget.y - cam.height / 2);
        this.spaceDebugScene.cameras.main.setScroll(cam.scrollX, cam.scrollY);
        if (this.keys.rotateLeft.isDown) {
            this.camAngle -= this.angleSpeed;
            this.adjustCameraAngle(this.camAngle);
        }
        if (this.keys.rotateRight.isDown) {
            this.camAngle += this.angleSpeed;
            this.adjustCameraAngle(this.camAngle);
        }
        if (this.keys.rotateReset.isDown) {
            this.camAngle = 0;
            this.adjustCameraAngle(this.camAngle);
            this.updateZoom(1);
        }
    };
    SpaceCameraControllerScene.prototype.resizeCSPCameraWindow = function () {
        var world = this.spaceScene.csp.world;
        var cspConfig = this.spaceScene.cspConfig;
        var cam = this.cameras.main;
        var c_width = cspConfig.window.width;
        var c_height = cspConfig.window.height;
        var x = Math.abs(c_width - c_width / cam.zoom) / -2;
        var y = Math.abs(c_height - c_height / cam.zoom) / -2;
        var width = c_width / cam.zoom + x * -2;
        var height = c_height / cam.zoom + y * -2;
        var prev_width = Math.abs(x) + width;
        var prev_height = Math.abs(y) + height;
        var prev_halfWidth = prev_width / 2;
        var prev_halfHeight = prev_height / 2;
        var reuseHyp = Math.sqrt(Math.pow(prev_halfWidth, 2) + Math.pow(prev_halfHeight, 2));
        var startingAngle = Math.atan2(prev_halfHeight, prev_halfWidth) + this.camAngle * Phaser.Math.DEG_TO_RAD;
        var upperLeft = {};
        var lowerLeft = {};
        var upperRight = {};
        var lowerRight = {};
        upperLeft.angle = startingAngle + Math.PI * 1.5;
        upperLeft.x = Math.cos(upperLeft.angle) * reuseHyp;
        upperLeft.y = Math.sin(upperLeft.angle) * reuseHyp;
        lowerLeft.angle = startingAngle + Math.PI;
        lowerLeft.x = Math.cos(lowerLeft.angle) * reuseHyp;
        lowerLeft.y = Math.sin(lowerLeft.angle) * reuseHyp;
        upperRight.angle = startingAngle;
        upperRight.x = Math.cos(upperRight.angle) * reuseHyp;
        upperRight.y = Math.sin(upperRight.angle) * reuseHyp;
        lowerRight.angle = startingAngle + Math.PI / 2;
        lowerRight.x = Math.cos(lowerRight.angle) * reuseHyp;
        lowerRight.y = Math.sin(lowerRight.angle) * reuseHyp;
        var minX = Math.min(upperLeft.x, lowerLeft.x, upperRight.x, lowerRight.x);
        var maxX = Math.max(upperLeft.x, lowerLeft.x, upperRight.x, lowerRight.x);
        var minY = Math.min(upperLeft.y, lowerLeft.y, upperRight.y, lowerRight.y);
        var maxY = Math.max(upperLeft.y, lowerLeft.y, upperRight.y, lowerRight.y);
        minX -= Math.abs(x);
        maxX -= Math.abs(x);
        minY -= Math.abs(y);
        maxY -= Math.abs(y);
        x = minX / 2;
        y = minY / 2;
        width = maxX - minX;
        height = maxY - minY;
        world.camera.setWindow(x, y, width, height);
    };
    return SpaceCameraControllerScene;
}(Phaser.Scene));
exports.default = SpaceCameraControllerScene;
//# sourceMappingURL=SpaceCameraControllerScene.js.map

/***/ }),

/***/ "./scenes/space/SpaceDebugScene.js":
/*!*****************************************!*\
  !*** ./scenes/space/SpaceDebugScene.js ***!
  \*****************************************/
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
    };
    SpaceDebugScene.prototype.update = function (time, delta) {
        this.showGrid();
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
    return SpaceDebugScene;
}(Phaser.Scene));
exports.default = SpaceDebugScene;
//# sourceMappingURL=SpaceDebugScene.js.map

/***/ }),

/***/ "./scenes/space/SpaceLogicScene.js":
/*!*****************************************!*\
  !*** ./scenes/space/SpaceLogicScene.js ***!
  \*****************************************/
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
var PlayerShip_1 = __webpack_require__(/*! ../../gameObjects/space/PlayerShip */ "./gameObjects/space/PlayerShip.js");
var Planet_1 = __webpack_require__(/*! ../../gameObjects/space/Planet */ "./gameObjects/space/Planet.js");
var EnemyShip_1 = __webpack_require__(/*! ../../gameObjects/space/EnemyShip */ "./gameObjects/space/EnemyShip.js");
var Nebula_1 = __webpack_require__(/*! ../../gameObjects/space/Nebula */ "./gameObjects/space/Nebula.js");
var SpaceLogicScene = (function (_super) {
    __extends(SpaceLogicScene, _super);
    function SpaceLogicScene() {
        return _super.call(this, "spaceLogic") || this;
    }
    SpaceLogicScene.prototype.addObjectsToSpace = function () {
        this.spaceScene = this.scene.get("space");
        var world = this.spaceScene.csp.world;
        var nebulae = world.add.gameObjectArray(Nebula_1.default);
        var gridConfig = this.spaceScene.cspConfig.grid;
        var placeWidth = gridConfig.cols * gridConfig.cellWidth;
        var placeHeight = gridConfig.rows * gridConfig.cellHeight;
        var nebulaeAmt = Math.floor((placeWidth * placeHeight) / 12000000);
        var rng = new Phaser.Math.RandomDataGenerator("rand1");
        for (var i = 0; i < nebulaeAmt; i++) {
            nebulae.add(this.spaceScene, placeWidth * rng.frac(), placeHeight * rng.frac(), "grayNebula").setScale(13, 13);
        }
        var planets = world.add.gameObjectArray(Planet_1.default);
        planets.add(this.spaceScene, 69000, 60000, "IcyDwarfPlanet").setScale(13, 13);
        planets.add(this.spaceScene, 56000, 70000, "RedDustPlanet").setScale(13, 13);
        var enemyShips = world.add.gameObjectArray(EnemyShip_1.default);
        enemyShips.add(this.spaceScene, 67000, 60000);
        enemyShips.add(this.spaceScene, 70000, 60000);
        this.playerShip = world.add.gameObjectArray(PlayerShip_1.default).add(this.spaceScene, 69000, 60000 + 1000);
        this.spaceScene.setCameraTarget(this.playerShip);
    };
    SpaceLogicScene.prototype.update = function () {
        this.updatePlanets();
    };
    SpaceLogicScene.prototype.updatePlanets = function () {
        var _this = this;
        var playerShip = this.playerShip;
        this.spaceScene.sys.displayList.list.forEach(function (object) {
            if (object._arrayName === "planet") {
                var planet = object;
                var dx = planet.x - playerShip.x;
                var dy = planet.y - playerShip.y;
                if (dx * dx + dy * dy < Math.pow(planet.displayWidth / 2, 2)) {
                    _this.spaceScene.switchToPlanetSceneGroup({
                        type: "planet",
                        from: planet
                    });
                }
            }
        });
    };
    return SpaceLogicScene;
}(Phaser.Scene));
exports.default = SpaceLogicScene;
//# sourceMappingURL=SpaceLogicScene.js.map

/***/ }),

/***/ "./scenes/space/SpaceScene.js":
/*!************************************!*\
  !*** ./scenes/space/SpaceScene.js ***!
  \************************************/
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
var SpaceScene = (function (_super) {
    __extends(SpaceScene, _super);
    function SpaceScene() {
        var _this = _super.call(this, "space") || this;
        _this.loaded = false;
        _this.quickLoad = true;
        return _this;
    }
    SpaceScene.prototype.preload = function () {
        this.load.image("playerShip", "./assets/Space/Ships/playerShip.png");
        this.load.image("enemyShip", "./assets/Space/Ships/enemyShip.png");
        this.load.image("IcyDwarfPlanet", "./assets/Space/Planets/IcyDwarfPlanet.png");
        this.load.image("RedDustPlanet", "./assets/Space/Planets/RedDustPlanet.png");
        this.load.image("grayNebula", "./assets/Space/nebula/grayNebula.png");
        this.load.image("blueStar0", "./assets/Space/Stars/blueStar0.png");
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
                cols: 200,
                rows: 200,
                cellWidth: 800,
                cellHeight: 800
            }
        };
        this.csp.initWorld(this.cspConfig);
        this.scene.get("spaceLogic").addObjectsToSpace();
        this.csp.syncWithGrid();
        this.runScenes(false);
        this.loaded = true;
    };
    SpaceScene.prototype.runScenes = function (calledByEntryScene) {
        this.scene.run("spaceLogic");
        this.scene.run("spaceCameraController");
        this.scene.run("starSceneController");
        this.runDebugScenes();
        if (calledByEntryScene) {
            var playerShip = this.scene.get("spaceLogic").playerShip;
            playerShip.y += 500;
            for (var i in playerShip.keys) {
                playerShip.keys[i].reset();
            }
        }
    };
    SpaceScene.prototype.runDebugScenes = function () {
        var _this = this;
        this.scene.run("spaceDebug");
        this.scene.run("spaceUIDebug");
        this.scene.sleep("spaceDebug");
        this.input.keyboard.on("keydown-U", function () {
            if (_this.scene.isSleeping("spaceUIDebug")) {
                _this.scene.wake("spaceUIDebug");
            }
            else {
                _this.scene.sleep("spaceUIDebug");
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
    SpaceScene.prototype.sleepScenes = function (calledByEntryScene) {
        this.scene.sleep("spaceBackground");
        this.scene.sleep("spaceLogic");
        this.scene.sleep("spaceCameraController");
        this.scene.sleep("spaceDebug");
        this.scene.sleep("spaceUIDebug");
        this.scene.sleep("starSceneController");
    };
    SpaceScene.prototype.switchToPlanetSceneGroup = function (levelInfo) {
        var entryScene = this.scene.get("entry");
        entryScene.switchSceneGroup("planet", function (fromScene, nextScene) {
            nextScene.receiveInfo(levelInfo);
        });
    };
    SpaceScene.prototype.setCameraTarget = function (cameraTarget) {
        this.cameraTarget = cameraTarget;
        this.cameras.main.startFollow(this.cameraTarget);
    };
    SpaceScene.prototype.getCameraTarget = function () {
        return this.cameraTarget;
    };
    SpaceScene.prototype.update = function (time, delta) {
        var playerShip = this.scene.get("spaceLogic").playerShip;
        this.csp.setFollow(playerShip.x, playerShip.y);
        this.csp.updateWorld();
    };
    return SpaceScene;
}(Phaser.Scene));
exports.default = SpaceScene;
//# sourceMappingURL=SpaceScene.js.map

/***/ }),

/***/ "./scenes/space/SpaceStarScene.js":
/*!****************************************!*\
  !*** ./scenes/space/SpaceStarScene.js ***!
  \****************************************/
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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpaceStarScene.prototype.preload = function () {
        this.load.scenePlugin({
            key: "CartesianSystemPlugin",
            url: "./libraries/CartesianSystemPlugin.js",
            sceneKey: 'csStars'
        });
        this.load.spritesheet("starSheet1" + this.scene.key, "./assets/Space/Stars/Stars.png", {
            frameWidth: 12,
            frameHeight: 12
        });
    };
    SpaceStarScene.prototype.create = function (data) {
        this.starsPerCell = data.starsPerCell;
        this.starSize = data.starSize;
        this.starScroll = (!data.starScroll || data.starScroll <= 0) ? 1 : data.starScroll;
        this.spaceScene = this.scene.get("space");
        this.spaceCameraControllerScene = this.scene.get("spaceCameraController");
        this.csStars.initWorld(this.spaceScene.cspConfig);
        var bounds = this.csStars.world.bounds;
        var width = bounds.maxX - bounds.minX;
        var height = bounds.maxY - bounds.minY;
        this.subScrollX = (width - width / this.starScroll) * this.starScroll;
        this.subScrollY = (height - height / this.starScroll) * this.starScroll;
        this.star0 = this.add.image(0, 0, "starSheet1" + this.scene.key, 0);
        this.blueStar0 = this.add.image(0, 0, "blueStar0").setScrollFactor(0);
        var screenWidth = this.game.config.width;
        var screenHeight = this.game.config.height;
        this.rt = this.add.renderTexture(0, 0, screenWidth, screenHeight).setOrigin(0, 0).setScale(2);
        this.rt.setScrollFactor(0);
    };
    SpaceStarScene.prototype.update = function () {
        var mainCam = this.spaceCameraControllerScene.cameras.main;
        var w = mainCam.width / 2;
        var h = mainCam.height / 2;
        var scrollX = mainCam.scrollX * this.starScroll - this.subScrollX - (w - w * this.starScroll);
        var scrollY = mainCam.scrollY * this.starScroll - this.subScrollY - (h - h * this.starScroll);
        var cam = this.cameras.main;
        cam.setScroll(scrollX, scrollY);
        cam.setZoom(mainCam.zoom);
        cam.setRoundPixels(true);
        cam.setAngle(this.spaceCameraControllerScene.getCameraAngle());
        var world = this.spaceScene.csp.world;
        this.csStars.world.camera.setWindow(world.camera.x, world.camera.y, world.camera.width + Math.floor(world.camera.width / mainCam.zoom), world.camera.height + Math.floor(world.camera.height / mainCam.zoom));
        var follow = this.spaceScene.getCameraTarget();
        this.csStars.setFollow(follow.x * this.starScroll - this.subScrollX, follow.y * this.starScroll - this.subScrollY);
        this.csStars.updateWorld();
        this.sys.displayList.add(this.rt);
        this.renderStars();
    };
    SpaceStarScene.prototype.renderStars = function () {
        var _this = this;
        var world = this.csStars.world;
        var cellWidth = world.cameraGrid.cellWidth;
        var cellHeight = world.cameraGrid.cellHeight;
        var mainCam = this.cameras.main;
        var mainWorld = this.spaceScene.csp.world;
        var cspConfig = this.spaceScene.cspConfig;
        this.rt.clear();
        this.rt.beginDraw();
        world.loopThroughVisibleCells(function (cell, col, row) {
            var rng = new Phaser.Math.RandomDataGenerator([(col + row).toString()]);
            for (var i = 0; i < 22; i++) {
                _this.rt.batchDraw(_this.star0, col * cellWidth - mainCam.scrollX + cellWidth * rng.frac(), row * cellHeight - mainCam.scrollY + cellHeight * rng.frac());
            }
        });
        this.rt.endDraw();
    };
    return SpaceStarScene;
}(Phaser.Scene));
exports.default = SpaceStarScene;
//# sourceMappingURL=SpaceStarScene.js.map

/***/ }),

/***/ "./scenes/space/SpaceUIDebugScene.js":
/*!*******************************************!*\
  !*** ./scenes/space/SpaceUIDebugScene.js ***!
  \*******************************************/
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
var SpaceUIDebugScene = (function (_super) {
    __extends(SpaceUIDebugScene, _super);
    function SpaceUIDebugScene() {
        return _super.call(this, "spaceUIDebug") || this;
    }
    SpaceUIDebugScene.prototype.create = function () {
        this.cellCoorText = this.add.text(40, 260, "");
        this.cellText = this.add.text(40, 274, "");
        this.fpsText = this.add.text(40, 20, "");
        this.shipPositionText = this.add.text(550, 20, "");
        this.spaceScene = this.scene.get("space");
    };
    SpaceUIDebugScene.prototype.update = function (time, delta) {
        this.fpsText.setText("Fps: " + (1000 / delta).toFixed(0));
        var cameraTarget = this.spaceScene.getCameraTarget();
        this.shipPositionText.setText("(" + cameraTarget.x.toFixed(2) + ", " + cameraTarget.y.toFixed(2) + ")");
        this.peekCell();
    };
    SpaceUIDebugScene.prototype.peekCell = function () {
        var cspWorld = this.spaceScene.csp.world;
        var coordinates = cspWorld.cameraGrid.getCoordinates(cspWorld.camera.scrollX - cspWorld.camera.halfWidth + this.input.activePointer.x / this.spaceScene.cameras.main.zoom, cspWorld.camera.scrollY - cspWorld.camera.halfHeight + this.input.activePointer.y / this.spaceScene.cameras.main.zoom);
        var cell = cspWorld.cameraGrid.grid[coordinates.col][coordinates.row];
        this.cellCoorText.setText("(" + coordinates.col + ", " + coordinates.row + ")");
        var txt = "";
        for (var i in cell) {
            txt += i;
        }
        this.cellText.setText(txt);
    };
    return SpaceUIDebugScene;
}(Phaser.Scene));
exports.default = SpaceUIDebugScene;
//# sourceMappingURL=SpaceUIDebugScene.js.map

/***/ }),

/***/ "./scenes/space/StarSceneControllerScene.js":
/*!**************************************************!*\
  !*** ./scenes/space/StarSceneControllerScene.js ***!
  \**************************************************/
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
var SpaceStarScene_1 = __webpack_require__(/*! ./SpaceStarScene */ "./scenes/space/SpaceStarScene.js");
var StarSceneControllerScene = (function (_super) {
    __extends(StarSceneControllerScene, _super);
    function StarSceneControllerScene() {
        return _super.call(this, "starSceneController") || this;
    }
    StarSceneControllerScene.prototype.create = function () {
        this.startStarScenes();
        this.events.on("sleep", this.onSleep, this);
        this.events.on("wake", this.onWake, this);
    };
    StarSceneControllerScene.prototype.startStarScenes = function () {
        this.scene.add("spaceStar", SpaceStarScene_1.default, true, {
            starsPerCell: 100,
            starSize: 3,
            starScroll: 1
        });
        this.scene.sendToBack("spaceStar");
        this.scene.add("spaceStar2", SpaceStarScene_1.default, true, {
            starsPerCell: 124,
            starSize: 2,
            starScroll: 0.73
        });
        this.scene.sendToBack("spaceStar2");
        this.scene.add("spaceStar3", SpaceStarScene_1.default, true, {
            starsPerCell: 250,
            starSize: 1,
            starScroll: 0.56
        });
        this.scene.sendToBack("spaceStar3");
        this.starScenesSleeping = false;
    };
    StarSceneControllerScene.prototype.onSleep = function () {
        this.scene.sleep("spaceStar");
        this.scene.sleep("spaceStar2");
        this.scene.sleep("spaceStar3");
        this.starScenesSleeping = true;
    };
    StarSceneControllerScene.prototype.onWake = function () {
        this.scene.wake("spaceStar");
        this.scene.wake("spaceStar2");
        this.scene.wake("spaceStar3");
        this.starScenesSleeping = false;
    };
    StarSceneControllerScene.prototype.update = function () {
        this.updateStarFade();
    };
    StarSceneControllerScene.prototype.updateStarFade = function () {
        if (this.starScenesSleeping) {
            return;
        }
        var mainCam = this.scene.get("space").cameras.main;
        if (mainCam.zoom <= 0.5) {
            this.scene.sleep("spaceStar3");
        }
        else {
            this.scene.wake("spaceStar3");
        }
        if (mainCam.zoom <= 0.35) {
            this.scene.sleep("spaceStar2");
        }
        else {
            this.scene.wake("spaceStar2");
        }
    };
    return StarSceneControllerScene;
}(Phaser.Scene));
exports.default = StarSceneControllerScene;
//# sourceMappingURL=StarSceneControllerScene.js.map

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
/*!******************!*\
  !*** ./index.js ***!
  \******************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
var EntryScene_1 = __webpack_require__(/*! ./scenes/EntryScene */ "./scenes/EntryScene.js");
var SpaceScene_1 = __webpack_require__(/*! ./scenes/space/SpaceScene */ "./scenes/space/SpaceScene.js");
var SpaceCameraControllerScene_1 = __webpack_require__(/*! ./scenes/space/SpaceCameraControllerScene */ "./scenes/space/SpaceCameraControllerScene.js");
var SpaceDebugScene_1 = __webpack_require__(/*! ./scenes/space/SpaceDebugScene */ "./scenes/space/SpaceDebugScene.js");
var SpaceUIDebugScene_1 = __webpack_require__(/*! ./scenes/space/SpaceUIDebugScene */ "./scenes/space/SpaceUIDebugScene.js");
var StarSceneControllerScene_1 = __webpack_require__(/*! ./scenes/space/StarSceneControllerScene */ "./scenes/space/StarSceneControllerScene.js");
var PlanetScene_1 = __webpack_require__(/*! ./scenes/planet/PlanetScene */ "./scenes/planet/PlanetScene.js");
var SpaceLogicScene_1 = __webpack_require__(/*! ./scenes/space/SpaceLogicScene */ "./scenes/space/SpaceLogicScene.js");
var PlanetLogicScene_1 = __webpack_require__(/*! ./scenes/planet/PlanetLogicScene */ "./scenes/planet/PlanetLogicScene.js");
var SpaceBackgroundScene_1 = __webpack_require__(/*! ./scenes/space/SpaceBackgroundScene */ "./scenes/space/SpaceBackgroundScene.js");
var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 450,
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    disableContextMenu: true,
    scene: [
        EntryScene_1.default,
        SpaceBackgroundScene_1.default, SpaceScene_1.default, SpaceCameraControllerScene_1.default, SpaceDebugScene_1.default,
        SpaceUIDebugScene_1.default, StarSceneControllerScene_1.default, SpaceLogicScene_1.default,
        PlanetScene_1.default, PlanetLogicScene_1.default
    ],
};
var game = new Phaser.Game(config);
window.game = game;
//# sourceMappingURL=index.js.map
})();

PlanetSearch3 = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=PlanetSearch3.js.map