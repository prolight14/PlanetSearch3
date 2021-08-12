var PlanetSearch3;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./gameObjects/planet/Door.js":
/*!************************************!*\
  !*** ./gameObjects/planet/Door.js ***!
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
var Door = (function (_super) {
    __extends(Door, _super);
    function Door(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "door") || this;
        scene.add.existing(_this);
        scene.physics.add.existing(_this);
        _this.setVisible(false);
        _this.setMaxVelocity(0, 0);
        _this.setOrigin(0.5, 0.5);
        _this.setSize(16, 32);
        _this.goto = {
            level: "",
            door: "",
        };
        return _this;
    }
    Door.prototype.restartScene = function (scene) {
        scene.scene.restart({ level: this.goto.level, door: this.goto.door });
    };
    Door.prototype.onCollide = function (player) {
        var _this = this;
        if (player.activate() && Math.abs(player.body.y - this.body.y) < 0.5 && Math.abs(player.body.velocity.y) < 0.05) {
            var scene_1 = this.scene;
            var effectsScene = scene_1.scene.get("planetEffects");
            effectsScene.fadeOut(500, 0, 0, 0);
            scene_1.scene.pause();
            effectsScene.cameras.main.once("camerafadeoutcomplete", function () {
                scene_1.scene.run("planetLogic");
                _this.restartScene(scene_1);
            });
            this.destroy();
        }
    };
    return Door;
}(Phaser.Physics.Arcade.Image));
exports.default = Door;
//# sourceMappingURL=Door.js.map

/***/ }),

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
        var _this = _super.call(this, scene, x, y, "Helix2", 0) || this;
        _this.isLifeform = true;
        _this.inWater = false;
        _this.jumping = false;
        _this.jumpSpeed = 80;
        _this.jumpHeight = 310;
        scene.add.existing(_this);
        scene.physics.add.existing(_this);
        _this.setCollideWorldBounds(true);
        _this.resetPhysics().setDisplaySize(16, 32);
        scene.anims.create({
            key: "idle",
            frames: [{ key: "Helix2", frame: 0 }],
            frameRate: 20
        });
        scene.anims.create({
            key: "left",
            frames: [{ key: "Helix2", frame: 3 }, { key: "Helix2", frame: 4 }],
            frameRate: 5,
            repeat: -1
        });
        scene.anims.create({
            key: "right",
            frames: [{ key: "Helix2", frame: 1 }, { key: "Helix2", frame: 2 }],
            frameRate: 5,
            repeat: -1
        });
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
            },
            activate: function () {
                return _this.keys.s.isDown || _this.keys.down.isDown;
            }
        };
        _this.activate = function () {
            return this.controls.activate();
        };
        return _this;
    }
    Player.prototype.resetPhysics = function () {
        return this.setDrag(30, 0).setMaxVelocity(175, 600);
    };
    Player.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        var onGround = this.body.blocked.down;
        if (this.controls.left()) {
            this.setVelocityX(this.body.velocity.x - 8);
            this.anims.play("left", true);
        }
        if (this.controls.right()) {
            this.setVelocityX(this.body.velocity.x + 8);
            this.anims.play("right", true);
        }
        if (!this.controls.left() && !this.controls.right()) {
            var xDeacl = onGround ? 10 : 3;
            if (this.body.velocity.x > 0) {
                this.setVelocityX(this.body.velocity.x - xDeacl);
            }
            if (this.body.velocity.x < 0) {
                this.setVelocityX(this.body.velocity.x + xDeacl);
            }
            if (Math.abs(this.body.velocity.x) < xDeacl) {
                this.setVelocityX(0);
                this.anims.play("idle");
            }
        }
        if (!onGround) {
            if (this.controls.left()) {
                this.anims.pause(this.anims.currentAnim.frames[1]);
            }
            else if (this.controls.right()) {
                this.anims.pause(this.anims.currentAnim.frames[0]);
            }
        }
        if (this.inWater) {
            if (this.controls.up()) {
                this.setVelocityY(-140);
            }
            else if (this.controls.down()) {
                this.setVelocityY(140);
            }
        }
        else if (onGround && this.controls.up()) {
            this.jumping = true;
        }
        if (!this.controls.up() || this.body.velocity.y < -this.jumpHeight) {
            this.jumping = false;
        }
        if (this.jumping) {
            this.body.velocity.y -= this.jumpSpeed;
        }
        var onCeiling = this.body.blocked.up;
        if (onCeiling) {
            this.jumping = false;
            this.body.velocity.y = 0;
        }
        if (this.inWater) {
            this.setMaxVelocity(85);
            this.setGravity(0);
        }
        else {
            this.resetPhysics();
        }
        this.inWater = false;
        if (this.y > this.scene.cameras.main.getBounds().height + this.body.halfHeight) {
            this.kill();
        }
    };
    Player.prototype.isDead = function () {
        return this.dead;
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

/***/ "./gameObjects/planet/Water.js":
/*!*************************************!*\
  !*** ./gameObjects/planet/Water.js ***!
  \*************************************/
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
var Water = (function (_super) {
    __extends(Water, _super);
    function Water(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "water") || this;
        scene.add.existing(_this);
        scene.physics.add.existing(_this);
        _this.setMaxVelocity(0, 0);
        _this.setOrigin(0, 0);
        _this.setScale(16 / _this.displayWidth, 16 / _this.displayHeight);
        _this.setVisible(false);
        return _this;
    }
    Water.prototype.onCollide = function (object) {
        object.inWater = true;
    };
    return Water;
}(Phaser.Physics.Arcade.Image));
exports.default = Water;
//# sourceMappingURL=Water.js.map

/***/ }),

/***/ "./gameObjects/space/Asteroid.js":
/*!***************************************!*\
  !*** ./gameObjects/space/Asteroid.js ***!
  \***************************************/
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
var Asteroid = (function (_super) {
    __extends(Asteroid, _super);
    function Asteroid(scene, x, y) {
        return _super.call(this, scene, x, y, "asteroid1") || this;
    }
    return Asteroid;
}(SpaceGameObject_1.default));
exports.default = Asteroid;
//# sourceMappingURL=Asteroid.js.map

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
            goForward: function () { return true; },
            slowDown: function () { return false; },
            shoot: function () { return false; }
        };
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
    Planet.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        this.bodyConf.update();
    };
    Planet.prototype.onCollide = function (object) {
        if (object._arrayName === "playerShip") {
        }
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
        var _this = _super.call(this, scene, x, y, "helixShip") || this;
        _this.keys = {
            a: scene.input.keyboard.addKey('a'),
            d: scene.input.keyboard.addKey('d'),
            w: scene.input.keyboard.addKey('w'),
            s: scene.input.keyboard.addKey('s')
        };
        _this.particles = scene.add.particles("helixShipParticle");
        _this.pEmitter = _this.particles.createEmitter({
            lifespan: 500,
            scale: 1.5,
            speed: 70,
            angle: { min: 65, max: 115 },
            rotate: 0,
            x: 0,
            y: 0,
            quantity: 1,
            alpha: { min: 0x00, max: 0xFF }
        });
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
            slowDown: function () {
                return _this.keys.s.isDown;
            },
            shoot: function () { return false; }
        };
        _this.setScale(1, 1);
        _this.angleVel = 3;
        _this.speed = 6;
        return _this;
    }
    PlayerShip.prototype.preUpdate = function () {
        Ship_1.default.prototype.preUpdate.apply(this, arguments);
        var rot = this.rotation + Math.PI / 2;
        this.particles.x = this.x + Math.cos(rot) * this.height;
        this.particles.y = this.y + Math.sin(rot) * this.height;
        this.pEmitter.setAngle(this.angle + 90 + 90 * Math.random() - 45);
        this.pEmitter.setVisible(this.speed >= 0.005);
        this.pEmitter.setSpeed(this.speed * 100 / 10);
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
        var _this = _super.call(this, scene, x, y, texture) || this;
        _this.speed = 0;
        return _this;
    }
    Ship.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        if (this.controls.turnLeft()) {
            this.setAngle(this.angle - this.angleVel);
        }
        if (this.controls.turnRight()) {
            this.setAngle(this.angle + this.angleVel);
        }
        if (this.controls.goForward()) {
            this.speed += 0.5;
        }
        else {
            if (this.speed > 0) {
                this.speed -= 0.05;
            }
            else {
                this.speed = 0;
            }
        }
        if (this.controls.slowDown()) {
            if (this.speed > 0) {
                this.speed -= 0.35;
            }
            else {
                this.speed = 0;
            }
        }
        this.speed = Math.min(this.speed, 10);
        var angle = Phaser.Math.DEG_TO_RAD * (this.angle - 90);
        this.x += Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;
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
        this.currentSceneGroup = "planet";
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

/***/ "./scenes/planet/PlanetEffectsSceen.js":
/*!*********************************************!*\
  !*** ./scenes/planet/PlanetEffectsSceen.js ***!
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
var PlanetEffectsScene = (function (_super) {
    __extends(PlanetEffectsScene, _super);
    function PlanetEffectsScene() {
        return _super.call(this, "planetEffects") || this;
    }
    PlanetEffectsScene.prototype.create = function () {
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
//# sourceMappingURL=PlanetEffectsSceen.js.map

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
var Door_1 = __webpack_require__(/*! ../../gameObjects/planet/Door */ "./gameObjects/planet/Door.js");
var Player_1 = __webpack_require__(/*! ../../gameObjects/planet/Player */ "./gameObjects/planet/Player.js");
var Water_1 = __webpack_require__(/*! ../../gameObjects/planet/Water */ "./gameObjects/planet/Water.js");
var PlanetLogicScene = (function (_super) {
    __extends(PlanetLogicScene, _super);
    function PlanetLogicScene() {
        return _super.call(this, {
            key: "planetLogic",
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: 800 },
                }
            },
        }) || this;
    }
    PlanetLogicScene.prototype.init = function (data) {
        var _a = data.level, level = _a === void 0 ? "start" : _a, door = data.door;
        this.currentLevel = level;
        this.gotoDoor = door;
    };
    PlanetLogicScene.prototype.preload = function () {
        this.load.spritesheet("Helix2", "./assets/Planet/GameObjects/Player/Helix2.png", { frameWidth: 16, frameHeight: 32 });
        this.load.image("GrassTileset-extruded", "./assets/Planet/Levels/GrassPlanet/tilesets/GrassTileset-extruded.png");
        this.load.tilemapTiledJSON(this.currentLevel, "./assets/Planet/Levels/GrassPlanet/tilemaps/" + this.currentLevel + ".json");
    };
    PlanetLogicScene.prototype.receiveLevelInfo = function (passObj) {
    };
    PlanetLogicScene.prototype.create = function () {
        var _this = this;
        var backgraphics = this.add.graphics().setScrollFactor(0);
        backgraphics.fillStyle(0x00ABFF);
        backgraphics.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        var tilemap = this.make.tilemap({ key: this.currentLevel, tileWidth: 16, tileHeight: 16 });
        var tileset = tilemap.addTilesetImage("GrassTileset-extruded");
        var worldLayer = tilemap.createLayer("World", tileset, 0, 0);
        var fgLayer = tilemap.createLayer("FG", tileset, 0, 0);
        fgLayer.setDepth(4);
        var waterGroup = this.add.group();
        var doorGroup = this.add.group();
        var WORLD_INDEXES = {
            BACK_GRASS: 1,
            BACK_GRASS_2: 2,
            BACK_DIRT: 3,
            GRASS: 4,
            GRASS_2: 5,
            DIRT: 6,
            STONE_BRICKS: 7,
            TOP_WATER: 8,
            WATER: 9,
            WATER_2: 10,
            TOP_LAVA: 8,
            LAVA: 9,
            LAVA_2: 10,
            GREEN_DOOR_TOP: 20,
            GREEN_DOOR_BOTTOM: 21
        };
        worldLayer.setCollisionByProperty({ collides: true });
        worldLayer.forEachTile(function (tile) {
            if (tile.index === WORLD_INDEXES.BACK_DIRT) {
                tile.collideLeft = false;
                tile.collideRight = false;
                tile.collideDown = false;
                tile.collideUp = false;
            }
            else if (tile.index === WORLD_INDEXES.BACK_GRASS || tile.index === WORLD_INDEXES.BACK_GRASS_2) {
                tile.collideLeft = false;
                tile.collideRight = false;
                tile.collideDown = false;
                tile.collideUp = true;
                var tileAbove;
                if ((tileAbove = worldLayer.getTileAt(tile.x, tile.y - 1)) &&
                    tileAbove.index === WORLD_INDEXES.BACK_DIRT) {
                    tile.faceTop = true;
                }
            }
            else if (tile.index > WORLD_INDEXES.BACK_DIRT) {
                var toAvoid = [WORLD_INDEXES.BACK_GRASS, WORLD_INDEXES.BACK_GRASS_2, WORLD_INDEXES.BACK_DIRT];
                var tileLeft = void 0;
                if (tile.x > 0 &&
                    (tileLeft = worldLayer.getTileAt(tile.x - 1, tile.y)) &&
                    toAvoid.indexOf(tileLeft.index) !== -1) {
                    tile.faceLeft = true;
                }
                var tileRight = void 0;
                if (tile.x < tilemap.width &&
                    (tileRight = worldLayer.getTileAt(tile.x + 1, tile.y)) &&
                    toAvoid.indexOf(tileRight.index) !== -1) {
                    tile.faceRight = true;
                }
                var tileAbove_1;
                if (tile.y > 0 &&
                    (tileAbove_1 = worldLayer.getTileAt(tile.x, tile.y - 1)) &&
                    (toAvoid.indexOf(tileAbove_1.index) !== -1)) {
                    tile.faceTop = true;
                }
                var tileBelow = void 0;
                if (tile.y < tilemap.height &&
                    (tileBelow = worldLayer.getTileAt(tile.x, tile.y + 1)) &&
                    (toAvoid.indexOf(tileBelow.index) !== -1)) {
                    tile.faceBottom = true;
                }
            }
            switch (tile.index) {
                case WORLD_INDEXES.TOP_WATER:
                case WORLD_INDEXES.WATER:
                case WORLD_INDEXES.WATER_2:
                    tile.setCollision(false, false, false, false);
                    waterGroup.add(new Water_1.default(_this, tile.pixelX, tile.pixelY));
                    break;
                case WORLD_INDEXES.GREEN_DOOR_TOP:
                    tile.setCollision(false, false, false, false);
                    doorGroup.add(new Door_1.default(_this, tile.pixelX + tile.width / 2, tile.pixelY + tile.height));
                    break;
                case WORLD_INDEXES.GREEN_DOOR_BOTTOM:
                    tile.setCollision(false, false, false, false);
                    break;
            }
        });
        var spawnPoint = tilemap.findObject("Objects", function (obj) { return obj.name === "Player Spawn Point"; });
        var objects = tilemap.getObjectLayer("Objects").objects;
        var _loop_1 = function () {
            var obj = objects[i];
            if (obj.name === "Door") {
                for (var j in obj.properties) {
                    var prop = obj.properties[j];
                    if (prop.name === "door") {
                        if (prop.value === this_1.gotoDoor) {
                            doorGroup.getChildren().forEach(function (door) {
                                var doorBounds = door.getBounds();
                                if (doorBounds.contains(obj.x, obj.y)) {
                                    spawnPoint.x = door.x;
                                    spawnPoint.y = door.y;
                                }
                            });
                        }
                    }
                }
                doorGroup.getChildren().forEach(function (door) {
                    if (door.getBounds().contains(obj.x, obj.y)) {
                        for (var j in obj.properties) {
                            var prop = obj.properties[j];
                            if (prop.name === "gotoLevel") {
                                door.goto.level = prop.value;
                            }
                            else if (prop.name === "gotoDoor") {
                                door.goto.door = prop.value;
                            }
                        }
                    }
                });
            }
        };
        var this_1 = this;
        for (var i = 0; i < objects.length; i++) {
            _loop_1();
        }
        this.player = new Player_1.default(this, spawnPoint.x, spawnPoint.y);
        this.physics.add.collider(this.player, worldLayer);
        this.physics.add.overlap(this.player, waterGroup, function (objectA, objectB) {
            objectB.onCollide(objectA);
        }, undefined, this);
        this.physics.add.overlap(this.player, doorGroup, function (objectA, objectB) {
            objectB.onCollide(objectA);
        }, undefined, this);
        this.physics.world.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
        this.physics.world.setBoundsCollision(true, true, true, false);
        var cam = this.cameras.main;
        cam.startFollow(this.player);
        cam.setZoom(2);
        cam.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
        this.scene.get("planetEffects").fadeIn(500, 0, 0, 0);
        this.ended = false;
    };
    PlanetLogicScene.prototype.update = function (time, delta) {
        var _this = this;
        if (this.player.isDead() && !this.ended) {
            var effectsScene = this.scene.get("planetEffects");
            effectsScene.fadeOut(500, 0, 0, 0);
            effectsScene.cameras.main.once("camerafadeoutcomplete", function () {
                _this.scene.restart();
            });
            this.ended = true;
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
        this.scene.sleep("planetEffects");
    };
    PlanetScene.prototype.runScenes = function (calledByEntryScene) {
        this.scene.run("planetLogic");
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
            _this.updateZoom(Math.min(Math.max(cam.zoom - dy * 0.001, 0.3), 4));
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
var Asteroid_1 = __webpack_require__(/*! ../../gameObjects/space/Asteroid */ "./gameObjects/space/Asteroid.js");
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
            nebulae.add(this.spaceScene, placeWidth * rng.frac(), placeHeight * rng.frac(), "grayNebula");
        }
        var planets = world.add.gameObjectArray(Planet_1.default);
        planets.add(this.spaceScene, 69000, 60000, "IcyDwarfPlanet");
        planets.add(this.spaceScene, 56000, 70000, "RedDustPlanet");
        var enemyShips = world.add.gameObjectArray(EnemyShip_1.default);
        enemyShips.add(this.spaceScene, 67000, 60000);
        enemyShips.add(this.spaceScene, 70000, 60000);
        var asteroids = world.add.gameObjectArray(Asteroid_1.default);
        asteroids.add(this.spaceScene, 69300, 61000);
        this.playerShip = world.add.gameObjectArray(PlayerShip_1.default).add(this.spaceScene, 69000, 61000);
        this.spaceScene.setCameraTarget(this.playerShip);
        this.spaceScene.sys.displayList.list.forEach(function (object) {
            object.setScale(2);
        });
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
        return _this;
    }
    SpaceScene.prototype.preload = function () {
        this.load.image("asteroid1", "./assets/Space/Asteroids/Asteroid.png");
        this.load.image("helixShip", "./assets/Space/Ships/helixShip.png");
        this.load.image("helixShipParticle", "./assets/Space/Ships/helixShipParticle.png");
        this.load.image("enemyShip", "./assets/Space/Ships/enemyShip.png");
        this.load.image("IcyDwarfPlanet", "./assets/Space/Planets/IcyDwarfPlanet.png");
        this.load.image("RedDustPlanet", "./assets/Space/Planets/RedDustPlanet.png");
        this.load.image("grayNebula", "./assets/Space/nebula/grayNebula.png");
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
        this.scene.run("spaceBackground");
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
        this.csp.updateWorld(function (csp) {
            csp.systems.displayList.add(playerShip.particles);
        });
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
        this.stars = this.add.graphics();
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
        this.sys.displayList.add(this.stars);
        this.renderStars();
    };
    SpaceStarScene.prototype.renderStars = function () {
        var _this = this;
        var stars = this.stars;
        stars.clear();
        stars.fillStyle(0xFFFFFF);
        var world = this.csStars.world;
        var rng, i, x, y;
        var cellWidth = world.cameraGrid.cellWidth;
        var cellHeight = world.cameraGrid.cellHeight;
        world.loopThroughVisibleCells(function (cell, col, row) {
            rng = new Phaser.Math.RandomDataGenerator([col.toString() + row.toString()]);
            x = col * cellWidth;
            y = row * cellHeight;
            for (i = 0; i < _this.starsPerCell; i++) {
                stars.fillRect(x + rng.between(0, cellWidth), y + rng.between(0, cellHeight), _this.starSize, _this.starSize);
            }
        });
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
            starsPerCell: 20,
            starSize: 4,
            starScroll: 1
        });
        this.scene.sendToBack("spaceStar");
        this.scene.add("spaceStar2", SpaceStarScene_1.default, true, {
            starsPerCell: 29,
            starSize: 3,
            starScroll: 0.73
        });
        this.scene.sendToBack("spaceStar2");
        this.scene.add("spaceStar3", SpaceStarScene_1.default, true, {
            starsPerCell: 42,
            starSize: 2,
            starScroll: 0.56
        });
        this.scene.sendToBack("spaceStar3");
        this.scene.sendToBack("spaceBackground");
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
var PlanetEffectsSceen_1 = __webpack_require__(/*! ./scenes/planet/PlanetEffectsSceen */ "./scenes/planet/PlanetEffectsSceen.js");
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
        PlanetScene_1.default, PlanetLogicScene_1.default, PlanetEffectsSceen_1.default
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