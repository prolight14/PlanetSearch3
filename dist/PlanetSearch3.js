var PlanetSearch3;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./UI/planet/InfoBar.js":
/*!******************************!*\
  !*** ./UI/planet/InfoBar.js ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var InfoBar = (function () {
    function InfoBar(scene) {
        this.scene = scene;
        this.graphics = scene.add.graphics();
        this.graphics.fillStyle(0x000000, 0.4);
        this.graphics.fillRect(0, 0, 800, 25);
        this.hpBarGraphics = scene.add.graphics();
        this.initialized = false;
    }
    InfoBar.prototype.init = function () {
        this.initialized = true;
        this.playerHpText = this.scene.add.text(20, 5, "HP: ? / ?", {
            fontSize: "18px",
            align: "left"
        });
    };
    InfoBar.prototype.update = function () {
        if (!this.initialized) {
            return;
        }
        var playerStats = this.scene.scene.get("planetLogic").getPlayerStats();
        var hp = playerStats.hp;
        var maxHp = playerStats.maxHp;
        this.playerHpText.setText("HP: " + hp.toFixed(0) + " / " + maxHp);
        var hpBarWidth = 200;
        this.hpBarGraphics.clear();
        this.hpBarGraphics.fillStyle(0x000000, 0.5);
        this.hpBarGraphics.fillRect(0, 0, hpBarWidth, 25);
        this.hpBarGraphics.fillStyle(0x58DA12);
        this.hpBarGraphics.fillRect(0, 0, (hp * hpBarWidth / maxHp), 25);
    };
    return InfoBar;
}());
exports.default = InfoBar;
//# sourceMappingURL=InfoBar.js.map

/***/ }),

/***/ "./gameObjects/Utils/StateMachine.js":
/*!*******************************************!*\
  !*** ./gameObjects/Utils/StateMachine.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var StateMachine = (function () {
    function StateMachine(states) {
        var func = function (name) {
            if (!state[name]) {
                state[name] = function () { };
            }
        };
        for (var i in states) {
            var state = states[i];
            ["start", "update", "stop"].forEach(func);
        }
        this.states = states;
    }
    StateMachine.prototype.start = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = this;
        Array.prototype.slice.call(arguments).forEach(function (stateName) {
            var state = _this.states[stateName];
            state.on = true;
            state.start(this);
        });
    };
    StateMachine.prototype.emit = function (name, args) {
        for (var i in this.states) {
            var state = this.states[i];
            if (state.on) {
                state[name].apply(state, args);
            }
        }
    };
    StateMachine.prototype.emitState = function (stateName, name, args) {
        var state = this.states[stateName];
        if (state.on) {
            state[name].apply(state, args);
        }
    };
    StateMachine.prototype.stop = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = this;
        Array.prototype.slice.call(arguments).forEach(function (stateName) {
            var state = _this.states[stateName];
            state.on = false;
            state.stop(this);
        });
    };
    ;
    return StateMachine;
}());
exports.default = StateMachine;
//# sourceMappingURL=StateMachine.js.map

/***/ }),

/***/ "./gameObjects/Utils/timer.js":
/*!************************************!*\
  !*** ./gameObjects/Utils/timer.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var timer = function (start, interval, func, scope, args) {
    var startTime = performance.now();
    var called = !start;
    var update = function () {
        if (!called && performance.now() - startTime > interval) {
            called = true;
            return func.apply(scope, args);
        }
    };
    var reset = function (newInterval, _args) {
        if (newInterval !== undefined) {
            interval = newInterval;
        }
        if (_args !== undefined) {
            args = _args;
        }
        startTime = performance.now();
        called = false;
    };
    return {
        update: update,
        reset: reset
    };
};
exports.default = timer;
//# sourceMappingURL=timer.js.map

/***/ }),

/***/ "./gameObjects/Utils/trig.js":
/*!***********************************!*\
  !*** ./gameObjects/Utils/trig.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var trig = (function () {
    function trig() {
    }
    trig.cos = function (angle) {
        return Math.cos(angle * Phaser.Math.DEG_TO_RAD);
    };
    trig.sin = function (angle) {
        return Math.sin(angle * Phaser.Math.DEG_TO_RAD);
    };
    trig.tan = function (angle) {
        return Math.sin(angle * Phaser.Math.DEG_TO_RAD);
    };
    trig.atan2 = function (y, x) {
        return Math.atan2(x, y) * Phaser.Math.RAD_TO_DEG;
    };
    trig.random = function (min, max) {
        return Phaser.Math.RND.frac() * (max - min) + min;
    };
    return trig;
}());
exports.default = trig;
//# sourceMappingURL=trig.js.map

/***/ }),

/***/ "./gameObjects/planet/GameObject.js":
/*!******************************************!*\
  !*** ./gameObjects/planet/GameObject.js ***!
  \******************************************/
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
var GameObject = (function (_super) {
    __extends(GameObject, _super);
    function GameObject(scene, x, y, texture, frame, solid) {
        var _this = _super.call(this, scene, x, y, texture, frame) || this;
        scene.add.existing(_this);
        return _this;
    }
    GameObject.prototype.onCollide = function (object) {
    };
    GameObject.prototype.onOverlap = function (object) {
    };
    GameObject.prototype.processCollision = function (object) {
    };
    return GameObject;
}(Phaser.Physics.Arcade.Sprite));
exports.default = GameObject;
//# sourceMappingURL=GameObject.js.map

/***/ }),

/***/ "./gameObjects/planet/Lifeform.js":
/*!****************************************!*\
  !*** ./gameObjects/planet/Lifeform.js ***!
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
var GameObject_1 = __webpack_require__(/*! ./GameObject */ "./gameObjects/planet/GameObject.js");
var Lifeform = (function (_super) {
    __extends(Lifeform, _super);
    function Lifeform(scene, x, y, texture, frame) {
        var _this = _super.call(this, scene, x, y, texture, frame) || this;
        _this.hp = 2;
        _this.maxHp = 2;
        _this.damage = 1;
        _this.isLifeform = true;
        _this.inLiquid = false;
        _this.isOnSlope = false;
        _this.wasInLiquid = false;
        _this.wasOnSlope = false;
        _this.isJumping = false;
        _this.jumpSpeed = 80;
        _this.jumpHeight = 310;
        _this.xSpeed = 8;
        _this.maxVel = { x: 175, y: 600 };
        _this.drag = { x: 30, y: 0 };
        _this.xDeacl = 10;
        _this.xDeaclInAir = 3;
        _this.ySwimSpeed = 140;
        _this.maxVelInWater = 75;
        _this.dead = false;
        scene.physics.add.existing(_this);
        _this.resetPhysics();
        return _this;
    }
    Lifeform.prototype.getDamage = function (object) {
        return this.damage;
    };
    Lifeform.prototype.takeDamage = function (object) {
        this.hp -= object.getDamage(this);
    };
    Lifeform.prototype.resetPhysics = function () {
        return this.setDrag(this.drag.x, this.drag.y).setMaxVelocity(this.maxVel.x, this.maxVel.y);
    };
    Lifeform.prototype.preUpdate = function (time, delta) {
        if (this.dead) {
            return;
        }
        _super.prototype.preUpdate.call(this, time, delta);
        var onGround = this.body.blocked.down || this.isOnSlope;
        if (this.controls.left()) {
            this.setVelocityX(this.body.velocity.x - this.xSpeed);
        }
        if (this.controls.right()) {
            this.setVelocityX(this.body.velocity.x + this.xSpeed);
        }
        if (!this.controls.left() && !this.controls.right()) {
            var xDeacl = onGround ? this.xDeacl : this.xDeaclInAir;
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
        if (this.inLiquid) {
            if (this.controls.up()) {
                this.setVelocityY(-this.ySwimSpeed);
            }
            else if (this.controls.down()) {
                this.setVelocityY(this.ySwimSpeed);
            }
        }
        else if (onGround && this.controls.up()) {
            this.isJumping = true;
        }
        if (!this.controls.up() || this.body.velocity.y < -this.jumpHeight) {
            this.isJumping = false;
        }
        if (this.isJumping) {
            this.body.velocity.y -= this.jumpSpeed;
        }
        var onCeiling = this.body.blocked.up;
        if (onCeiling) {
            this.isJumping = false;
            this.body.velocity.y = 0;
        }
        if (this.inLiquid) {
            this.setMaxVelocity(this.maxVelInWater);
            this.setGravity(0);
        }
        else {
            this.resetPhysics();
        }
        this.body.setAllowGravity(!this.isOnSlope);
        this.wasInLiquid = this.inLiquid;
        this.wasOnSlope = this.isOnSlope;
        this.isOnSlope = false;
        this.inLiquid = false;
        if (this.y > this.scene.cameras.main.getBounds().height + this.body.halfHeight) {
            this.kill("fellOff");
        }
        else if (this.hp <= 0) {
            this.kill("noHp");
        }
    };
    Lifeform.prototype.isDead = function () {
        return this.dead;
    };
    Lifeform.prototype.kill = function (reason) {
        var _this = this;
        this.dead = true;
        this.scene.time.delayedCall(0, function () {
            _this.destroy();
        });
    };
    return Lifeform;
}(GameObject_1.default));
exports.default = Lifeform;
//# sourceMappingURL=Lifeform.js.map

/***/ }),

/***/ "./gameObjects/planet/Player.js":
/*!**************************************!*\
  !*** ./gameObjects/planet/Player.js ***!
  \**************************************/
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
var Lifeform_1 = __webpack_require__(/*! ./Lifeform */ "./gameObjects/planet/Lifeform.js");
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "Player", 0) || this;
        _this.isLifeform = true;
        _this.inWater = false;
        _this.blinking = false;
        _this.blinkTime = 1000;
        _this.blinkSpeed = 100;
        _this.enemyBounce = 160;
        _this.maxHp = _this.hp = 5;
        _this.damage = 1;
        _this.setCollideWorldBounds(true);
        scene.anims.create({
            key: "idle",
            frames: [{ key: "Player", frame: 0 }],
            frameRate: 20
        });
        scene.anims.create({
            key: "left",
            frames: [{ key: "Player", frame: 4 }, { key: "Player", frame: 5 }, { key: "Player", frame: 6 }, { key: "Player", frame: 7 }],
            frameRate: 8,
            repeat: -1
        });
        scene.anims.create({
            key: "right",
            frames: [{ key: "Player", frame: 0 }, { key: "Player", frame: 1 }, { key: "Player", frame: 2 }, { key: "Player", frame: 3 }],
            frameRate: 8,
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
            r: scene.input.keyboard.addKey('r'),
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
            },
            restart: function () {
                return _this.keys.r.isDown;
            }
        };
        _this.activate = function () {
            return this.controls.activate();
        };
        _this.blinkTimer = _this.scene.time.addEvent({
            delay: _this.blinkSpeed,
            callback: function () {
                _this.setVisible(!_this.visible);
            },
            repeat: -1
        });
        _this.blinkTimer.paused = true;
        return _this;
    }
    Player.prototype.getStats = function () {
        return {
            hp: this.hp,
            maxHp: this.maxHp,
        };
    };
    Player.prototype.setStats = function (stats) {
        this.hp = stats.hp;
        this.maxHp = stats.maxHp;
    };
    Player.prototype.setCurrentState = function (info) {
        this.hp = info.hp;
        this.maxHp = info.maxHp;
        this.checkpointGoto = info.checkpointGoto;
    };
    Player.prototype.getCurrentState = function () {
        return {
            hp: this.hp,
            maxHp: this.maxHp,
            checkpointGoto: this.checkpointGoto
        };
    };
    Player.prototype.takeDamage = function (object, blink) {
        if (blink === undefined) {
            blink = true;
        }
        if (!this.blinking) {
            this.hp -= object.getDamage(this);
            if (blink) {
                this.startBlinking();
            }
        }
    };
    Player.prototype.startBlinking = function () {
        var _this = this;
        this.blinking = true;
        this.blinkTimer.paused = false;
        this.scene.time.delayedCall(this.blinkTime, function () {
            _this.blinking = false;
            _this.setVisible(true);
            _this.blinkTimer.paused = true;
        });
    };
    Player.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        var onGround = this.body.blocked.down || this.isOnSlope;
        if (this.controls.left()) {
            this.looking = "left";
        }
        if (this.controls.right()) {
            this.looking = "right";
        }
        switch (this.looking) {
            case "left":
                this.anims.play("left", true);
                break;
            case "right":
                this.anims.play("right", true);
                break;
        }
        if (this.body.blocked.left && this.looking === "left") {
            this.anims.pause(this.anims.currentAnim.frames[0]);
        }
        if (this.body.blocked.right && this.looking === "right") {
            this.anims.pause(this.anims.currentAnim.frames[0]);
        }
        if (!onGround) {
            switch (this.looking) {
                case "left":
                    this.anims.pause(this.anims.currentAnim.frames[1]);
                    break;
                case "right":
                    this.anims.pause(this.anims.currentAnim.frames[1]);
                    break;
            }
        }
    };
    Player.prototype.kill = function () {
        this.dead = true;
        this.setImmovable(true);
        this.setVisible(false);
        this.setMaxVelocity(0);
        this.blinking = false;
    };
    return Player;
}(Lifeform_1.default));
exports.default = Player;
//# sourceMappingURL=Player.js.map

/***/ }),

/***/ "./gameObjects/planet/StaticGameObject.js":
/*!************************************************!*\
  !*** ./gameObjects/planet/StaticGameObject.js ***!
  \************************************************/
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
var StaticGameObject = (function (_super) {
    __extends(StaticGameObject, _super);
    function StaticGameObject(scene, x, y, texture, frame, solid) {
        var _this = _super.call(this, scene, x, y, texture, frame) || this;
        scene.add.existing(_this);
        return _this;
    }
    StaticGameObject.prototype.onCollide = function (object) {
    };
    StaticGameObject.prototype.onOverlap = function (object) {
    };
    StaticGameObject.prototype.processCollision = function (object) {
    };
    return StaticGameObject;
}(Phaser.Physics.Arcade.Image));
exports.default = StaticGameObject;
//# sourceMappingURL=StaticGameObject.js.map

/***/ }),

/***/ "./gameObjects/planet/Water.js":
/*!*************************************!*\
  !*** ./gameObjects/planet/Water.js ***!
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
var StaticGameObject_1 = __webpack_require__(/*! ./StaticGameObject */ "./gameObjects/planet/StaticGameObject.js");
var Water = (function (_super) {
    __extends(Water, _super);
    function Water(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "water") || this;
        scene.physics.add.existing(_this);
        _this.setMaxVelocity(0, 0);
        _this.setOrigin(0, 0);
        _this.setSize(_this.displayWidth, _this.displayHeight);
        _this.setVisible(false);
        return _this;
    }
    Water.prototype.onCollide = function (object) {
        object.inLiquid = true;
    };
    return Water;
}(StaticGameObject_1.default));
exports.default = Water;
//# sourceMappingURL=Water.js.map

/***/ }),

/***/ "./gameObjects/space/Bullet.js":
/*!*************************************!*\
  !*** ./gameObjects/space/Bullet.js ***!
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
var timer_1 = __webpack_require__(/*! ../Utils/timer */ "./gameObjects/Utils/timer.js");
var trig_1 = __webpack_require__(/*! ../Utils/trig */ "./gameObjects/Utils/trig.js");
var SpaceGameObject_1 = __webpack_require__(/*! ./SpaceGameObject */ "./gameObjects/space/SpaceGameObject.js");
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet(scene, x, y, texture, shootAngle, life, onCollide, onCollideContext) {
        var _this = _super.call(this, scene, x, y, texture) || this;
        _this.amtTraveled = 0;
        _this.range = 500;
        _this.shootAngle = shootAngle;
        _this.speed = 12;
        _this.killTimer = timer_1.default(true, life, function () {
            _this.kill();
        });
        _this.setOnCollide(function (colData) {
            if (colData.bodyA.gameObject) {
                var hit = onCollide.call(onCollideContext, colData.bodyA.gameObject);
                if (hit) {
                    _this.kill();
                }
            }
        });
        return _this;
    }
    Bullet.prototype.onKill = function () {
        this.scene.csp.world.cameraGrid.removeReference(this);
    };
    Bullet.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        this.killTimer.update();
        this.x += trig_1.default.cos(this.shootAngle) * this.speed;
        this.y += trig_1.default.sin(this.shootAngle) * this.speed;
        this.amtTraveled += this.speed;
        if (this.amtTraveled > this.range) {
            this.kill();
        }
    };
    return Bullet;
}(SpaceGameObject_1.default));
exports.default = Bullet;
//# sourceMappingURL=Bullet.js.map

/***/ }),

/***/ "./gameObjects/space/Crest.js":
/*!************************************!*\
  !*** ./gameObjects/space/Crest.js ***!
  \************************************/
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
var Crest = (function (_super) {
    __extends(Crest, _super);
    function Crest(scene, x, y, texture) {
        var _this = _super.call(this, scene, x, y, texture) || this;
        _this.amt = 1;
        _this.setAngle(Phaser.Math.RND.between(0, 180));
        _this.setCollisionGroup(2);
        _this.setCollidesWith(0);
        _this.setOnCollide(function (colData) {
            if (colData.bodyA.gameObject && colData.bodyA.gameObject._arrayName === "playerShip") {
                var playerShip = colData.bodyA.gameObject;
                _this.onCollide(playerShip);
            }
        });
        return _this;
    }
    Crest.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
    };
    Crest.prototype.onCollide = function (playerShip) {
        playerShip.collectCrests(this);
        this.bodyConf.destroy();
        this.destroy();
    };
    return Crest;
}(SpaceGameObject_1.default));
exports.default = Crest;
//# sourceMappingURL=Crest.js.map

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
var timer_1 = __webpack_require__(/*! ../Utils/timer */ "./gameObjects/Utils/timer.js");
var Ship_1 = __webpack_require__(/*! ./Ship */ "./gameObjects/space/Ship.js");
var EnemyShip = (function (_super) {
    __extends(EnemyShip, _super);
    function EnemyShip(scene, x, y, texture) {
        var _this = _super.call(this, scene, x, y, texture) || this;
        _this.showHpBar = true;
        _this.move = true;
        _this.isShooting = false;
        _this.fovRadius = 400;
        _this.fovAngle = 60;
        _this.visibleObjects = [];
        _this.canSeeSomething = false;
        _this.xpDropAmt = 3;
        _this.crestDropAmt = Phaser.Math.RND.between(3, 6);
        _this.turnDir = "";
        _this.controls = {
            turnLeft: function () {
                return _this.turnDir === "left";
            },
            turnRight: function () {
                return _this.turnDir === "right";
            },
            goForward: function () {
                return _this.move;
            },
            slowDown: function () { return false; },
            shoot: function () {
                return _this.isShooting;
            }
        };
        _this.angleVel = 3;
        _this.lookTimer = timer_1.default(true, 70, function () {
            _this.fovLook();
            _this.lookTimer.reset();
        });
        _this.fovSetup();
        return _this;
    }
    EnemyShip.prototype.isEnemyShip = function () { return true; };
    ;
    EnemyShip.prototype.fovSetup = function () {
        this.halfFovAngle = this.fovAngle / 2;
        this.fovRadiusSquared = this.fovRadius * this.fovRadius;
    };
    EnemyShip.prototype.fovLook = function () {
        var objectsInCells = [];
        var world = this.scene.csp.world;
        var minCoor = this.scene.csp.world.cameraGrid.getCoordinates(Math.floor(this.x - this.fovRadius), Math.floor(this.y - this.fovRadius));
        var maxCoor = this.scene.csp.world.cameraGrid.getCoordinates(Math.floor(this.x + this.fovRadius), Math.floor(this.y + this.fovRadius));
        world.cameraGrid.loopThroughCells(minCoor.col, minCoor.row, maxCoor.col, maxCoor.row, function (cell, col, row) {
            for (var i in cell) {
                var object = world.get.gameObject(cell[i].arrayName, cell[i].id);
                if (object !== undefined) {
                    objectsInCells.push(object);
                }
            }
        });
        this.visibleObjects.length = 0;
        this.canSeeSomething = false;
        var minAngle = this.angle - this.halfFovAngle;
        var maxAngle = this.angle + this.halfFovAngle;
        if (minAngle < 0) {
            minAngle = minAngle + 360;
        }
        if (maxAngle < 0) {
            maxAngle = maxAngle + 360;
        }
        for (var i = 0; i < objectsInCells.length; i++) {
            var object = objectsInCells[i];
            if (Phaser.Math.Distance.BetweenPointsSquared(object, this) > this.fovRadiusSquared) {
                continue;
            }
            var angleBetween = Phaser.Math.Angle.BetweenPoints(object, this) * Phaser.Math.RAD_TO_DEG;
            angleBetween = angleBetween - 90;
            if (angleBetween < 0) {
                angleBetween = angleBetween + 360;
            }
            if (angleBetween > minAngle && angleBetween < maxAngle) {
                this.canSeeSomething = true;
                this.visibleObjects.push({
                    gameObject: object,
                    angleBetween: angleBetween
                });
            }
        }
    };
    EnemyShip.prototype.debugFov = function (graphics) {
        graphics.lineStyle(10, 0x0FAB23);
        graphics.fillStyle(0xBB0012, 0.4);
        graphics.beginPath();
        graphics.arc(this.x, this.y, this.fovRadius, (this.angle - 90 - this.fovAngle / 2) * Phaser.Math.DEG_TO_RAD, (this.angle - 90 + this.fovAngle / 2) * Phaser.Math.DEG_TO_RAD);
        graphics.strokePath();
        if (this.canSeeSomething) {
            graphics.fillPath();
        }
    };
    EnemyShip.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        this.lookTimer.update();
    };
    EnemyShip.prototype.onKill = function () {
        this.dropXP();
        this.dropCrests();
    };
    EnemyShip.prototype.dropXP = function () {
        var spaceLogicScene = this.scene.scene.get("spaceLogic");
        for (var i = 0; i < this.xpDropAmt; i++) {
            if (Phaser.Math.RND.frac() < 0.5) {
                spaceLogicScene.addXPStar(this.x, this.y);
            }
            else {
                spaceLogicScene.addSmallXPStar(this.x, this.y);
            }
        }
    };
    EnemyShip.prototype.dropCrests = function () {
        var spaceLogicScene = this.scene.scene.get("spaceLogic");
        for (var i = 0; i < this.crestDropAmt; i++) {
            spaceLogicScene.addCrests(this.x, this.y);
        }
    };
    return EnemyShip;
}(Ship_1.default));
exports.default = EnemyShip;
//# sourceMappingURL=EnemyShip.js.map

/***/ }),

/***/ "./gameObjects/space/HyperBeamerSType.js":
/*!***********************************************!*\
  !*** ./gameObjects/space/HyperBeamerSType.js ***!
  \***********************************************/
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
var HyperBeamerShip_1 = __webpack_require__(/*! ./HyperBeamerShip */ "./gameObjects/space/HyperBeamerShip.js");
var timer_1 = __webpack_require__(/*! ../Utils/timer */ "./gameObjects/Utils/timer.js");
var StateMachine_1 = __webpack_require__(/*! ../Utils/StateMachine */ "./gameObjects/Utils/StateMachine.js");
var trig_1 = __webpack_require__(/*! ../Utils/trig */ "./gameObjects/Utils/trig.js");
var HyperBeamerSType = (function (_super) {
    __extends(HyperBeamerSType, _super);
    function HyperBeamerSType(scene, x, y) {
        var _this_1 = _super.call(this, scene, x, y, "hyperBeamerSTypeGreen") || this;
        _this_1.setCollisionGroup(1);
        _this_1.setCollidesWith(0);
        _this_1.isShooting = true;
        _this_1.particles = scene.add.particles("hyperBeamerSTypeGreenParticle");
        _this_1.pEmitter = _this_1.particles.createEmitter({
            lifespan: 500,
            scale: 1.5,
            rotate: 0,
            x: 0,
            y: 0,
            quantity: 1
        });
        _this_1.pEmitter.setAlpha(function (p, k, t) {
            return 1 - t;
        });
        var _this = _this_1;
        var world = scene.csp.world;
        _this_1.sm = new StateMachine_1.default({
            "wander": {
                start: function () {
                    var _this_1 = this;
                    _this.isShooting = false;
                    this.cancelTurnTimers = false;
                    this.changeDirTimer = timer_1.default(true, 1000, function () {
                        _this_1.turn(Phaser.Math.RND.frac() < 0.5 ? "left" : "right", "", Phaser.Math.RND.between(150, 350), undefined, function () {
                            _this_1.changeDirTimer.reset(Phaser.Math.RND.between(3000, 7000) * 2);
                        });
                    });
                },
                turn: function (turnDir, oldTurn, time, maxTurnAmt, callback) {
                    if (callback === undefined) {
                        callback = function () { };
                    }
                    _this.turnDir = turnDir;
                    this.redirectTimer = timer_1.default(true, time, function () {
                        _this.turnDir = oldTurn || "";
                        callback();
                    });
                },
                update: function () {
                    var _this_1 = this;
                    this.changeDirTimer.update();
                    if (this.redirectTimer !== undefined) {
                        this.redirectTimer.update();
                    }
                    _this.visibleObjects.forEach(function (object) {
                        var gameObject = object.gameObject;
                        switch (gameObject._arrayName) {
                            case "playerShip":
                                _this.sm.stop("wander");
                                _this.sm.start("follow");
                                break;
                            case _this._arrayName:
                                _this_1.turn(object.angleBetween - _this.angle > 0 ? "left" : "right", "", 200, undefined, function () { });
                                break;
                        }
                    });
                }
            },
            "follow": {
                start: function () {
                    _this.isShooting = true;
                    _this.turnDir = "";
                },
                update: function () {
                    _this.shootTimer.update();
                }
            },
        });
        _this_1.setAngle(Phaser.Math.RND.frac() * 360);
        _this_1.sm.start("wander");
        _this_1.shootTimer = timer_1.default(true, 500, function () {
            if (_this_1.isShooting) {
                _this_1.shoot();
            }
            _this_1.shootTimer.reset();
        });
        return _this_1;
    }
    HyperBeamerSType.prototype.shootBullet = function (theta, length, life) {
        var bullet = this.bullets.add(this.scene, this.x + trig_1.default.cos(theta) * length, this.y + trig_1.default.sin(theta) * length, "helixShipLvl1Bullet", this.angle - 90, life || 2000, this.bulletOnCollide, this);
        bullet.setAngle(this.angle);
        bullet.setCollisionGroup(2);
        bullet.setCollidesWith(0);
    };
    HyperBeamerSType.prototype.bulletOnCollide = function (gameObject) {
        if (gameObject._arrayName === "playerShip") {
            return gameObject.takeDamage(this);
        }
        return false;
    };
    HyperBeamerSType.prototype.shoot = function () {
    };
    HyperBeamerSType.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        var length = this.displayHeight * 0.4;
        this.particles.x = this.x + trig_1.default.cos(this.angle + 90) * length;
        this.particles.y = this.y + trig_1.default.sin(this.angle + 90) * length;
        this.pEmitter.setAngle(this.angle + 67.5 + 45 * Phaser.Math.RND.frac());
        this.pEmitter.setVisible(this.speed > 0.005);
        this.pEmitter.setSpeed(this.speed * 30);
        this.sm.emit("update", []);
    };
    HyperBeamerSType.prototype.onKill = function () {
        _super.prototype.onKill.call(this);
        this.particles.destroy();
    };
    HyperBeamerSType.indexId = 0;
    return HyperBeamerSType;
}(HyperBeamerShip_1.default));
exports.default = HyperBeamerSType;
//# sourceMappingURL=HyperBeamerSType.js.map

/***/ }),

/***/ "./gameObjects/space/HyperBeamerShip.js":
/*!**********************************************!*\
  !*** ./gameObjects/space/HyperBeamerShip.js ***!
  \**********************************************/
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
var EnemyShip_1 = __webpack_require__(/*! ./EnemyShip */ "./gameObjects/space/EnemyShip.js");
var HyperBeamerShip = (function (_super) {
    __extends(HyperBeamerShip, _super);
    function HyperBeamerShip(scene, x, y, texture) {
        var _this = _super.call(this, scene, x, y, texture) || this;
        _this.maxSpeed = 3.75;
        return _this;
    }
    return HyperBeamerShip;
}(EnemyShip_1.default));
exports.default = HyperBeamerShip;
//# sourceMappingURL=HyperBeamerShip.js.map

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
        var _this = _super.call(this, scene, x, y, texture) || this;
        _this.setStatic(true);
        _this.body.collisionFilter = {
            'group': -1,
            'category': 2,
            'mask': 0,
        };
        return _this;
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
        var _this = _super.call(this, scene, x, y, texture) || this;
        _this.setScale(3);
        _this.setStatic(true);
        _this.body.collisionFilter = {
            'group': -1,
            'category': 2,
            'mask': 0,
        };
        return _this;
    }
    Planet.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        this.bodyConf.update();
    };
    Planet.prototype.onCollide = function (object) {
        if (object._arrayName === "playerShip") {
            this.scene.scene.get("spaceScene").switchToPlanetSceneGroup({
                type: "planet",
                from: this
            });
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
var timer_1 = __webpack_require__(/*! ../Utils/timer */ "./gameObjects/Utils/timer.js");
var trig_1 = __webpack_require__(/*! ../Utils/trig */ "./gameObjects/Utils/trig.js");
var Bullet_1 = __webpack_require__(/*! ./Bullet */ "./gameObjects/space/Bullet.js");
var Ship_1 = __webpack_require__(/*! ./Ship */ "./gameObjects/space/Ship.js");
var PlayerShip = (function (_super) {
    __extends(PlayerShip, _super);
    function PlayerShip(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "helixShip", undefined) || this;
        _this.hp = 10;
        _this.maxHp = 10;
        _this.xp = 0;
        _this.nextLevelXp = 100;
        _this.crests = 0;
        _this.maxSpeed = 7.5;
        _this.speedAcl = 0.25;
        _this.speedDeacl = 0.075;
        _this.manualSpeedDeacl = 0.15;
        _this.angleDeacl = 0.2;
        _this.destroyOnKill = false;
        _this.canShoot = true;
        _this.setCollisionGroup(2);
        _this.setCollidesWith(0);
        _this.useAngleAcl = true;
        _this.angleVel = 0;
        _this.keys = {
            turnLeft: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            turnRight: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            goForward: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            slowDown: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
        };
        _this.bullets = scene.csp.world.add.gameObjectArray(Bullet_1.default, "playerShipBullet");
        _this.scene.input.keyboard.on("keyup-Z", function () {
            if (_this.canShoot) {
                _this.shoot();
                _this.canShoot = false;
            }
        });
        _this.scene.input.keyboard.on("keyup-SPACE", function () {
            if (_this.canShoot) {
                _this.shoot();
                _this.canShoot = false;
            }
        });
        var shootInterval = 200;
        _this.shootLimiterTimer = timer_1.default(true, shootInterval, function () {
            _this.canShoot = true;
            _this.shootLimiterTimer.reset();
        });
        _this.particles = scene.add.particles("helixShipParticle");
        _this.pEmitter = _this.particles.createEmitter({
            lifespan: 500,
            scale: 1.5,
            rotate: 0,
            x: 0,
            y: 0,
            quantity: 1
        });
        _this.pEmitter.setAlpha(function (p, k, t) {
            return 1 - t;
        });
        _this.controls = {
            turnLeft: function () {
                return _this.keys.turnLeft.isDown;
            },
            turnRight: function () {
                return _this.keys.turnRight.isDown;
            },
            goForward: function () {
                return _this.keys.goForward.isDown;
            },
            slowDown: function () {
                return _this.keys.slowDown.isDown;
            },
            shoot: function () {
                return false;
            }
        };
        return _this;
    }
    PlayerShip.prototype.resetStats = function () {
        this.resetKeys();
        this.hp = this.maxHp;
    };
    PlayerShip.prototype.resetKeys = function () {
        for (var i in this.keys) {
            this.keys[i].reset();
        }
    };
    PlayerShip.prototype.getXp = function () {
        return this.xp;
    };
    PlayerShip.prototype.getNextLevelXp = function () {
        return this.nextLevelXp;
    };
    PlayerShip.prototype.collectCrests = function (crest) {
        this.crests += crest.amt;
    };
    PlayerShip.prototype.collectXPStars = function (xpStar) {
        this.xp += xpStar.amt;
    };
    PlayerShip.prototype.shoot = function () {
        this.initBullet(this.angle + 30, 25);
        this.initBullet(this.angle + 150, 25);
        this.initBullet(this.angle - 20, 17);
        this.initBullet(this.angle + 200, 17);
    };
    PlayerShip.prototype.initBullet = function (theta, length, life) {
        var bullet = this.bullets.add(this.scene, this.x + trig_1.default.cos(theta) * length, this.y + trig_1.default.sin(theta) * length, "helixShipLvl1Bullet", this.angle - 90, life || 2000, this.bulletOnCollide, this);
        bullet.setAngle(this.angle);
        bullet.setCollisionGroup(1);
        bullet.setCollidesWith(0);
    };
    PlayerShip.prototype.bulletOnCollide = function (gameObject) {
        if (gameObject._arrayName === "hyperBeamerSType") {
            return gameObject.takeDamage(this);
        }
        return false;
    };
    PlayerShip.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        var length = this.height * this.scaleX * 0.4;
        this.particles.x = this.x + trig_1.default.cos(this.angle + 90) * length;
        this.particles.y = this.y + trig_1.default.sin(this.angle + 90) * length;
        this.pEmitter.setAngle(this.angle + 67.5 + 45 * Phaser.Math.RND.frac());
        this.pEmitter.setVisible(this.speed > 0.0);
        this.pEmitter.setSpeed(this.speed * 30);
        this.shootLimiterTimer.update();
    };
    PlayerShip.prototype.onKill = function () {
        _super.prototype.onKill.call(this);
        this.scene.handleGameOver();
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
var trig_1 = __webpack_require__(/*! ../Utils/trig */ "./gameObjects/Utils/trig.js");
var SpaceGameObject_1 = __webpack_require__(/*! ./SpaceGameObject */ "./gameObjects/space/SpaceGameObject.js");
var Ship = (function (_super) {
    __extends(Ship, _super);
    function Ship(scene, x, y, texture, frame) {
        var _this = _super.call(this, scene, x, y, texture, frame) || this;
        _this.maxHp = 10;
        _this.hp = 10;
        _this.damage = 1;
        _this.isShip = true;
        _this.maxSpeed = 5;
        _this.speedAcl = 0.5;
        _this.speedDeacl = 0.05;
        _this.manualSpeedDeacl = 0.35;
        _this.angleAcl = 0.4;
        _this.angleDeacl = 0.1;
        _this.maxAngleVel = 3;
        _this.useAngleAcl = false;
        _this.speed = 0;
        return _this;
    }
    Ship.prototype.takeDamage = function (object) {
        this.hp -= object.getDamage();
        return true;
    };
    Ship.prototype.getMaxHp = function () {
        return this.maxHp;
    };
    Ship.prototype.getHp = function () {
        return this.hp;
    };
    Ship.prototype.getDamage = function () {
        return this.damage;
    };
    Ship.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        if (this.useAngleAcl) {
            if (this.controls.turnLeft()) {
                this.angleVel -= this.angleAcl;
            }
            if (this.controls.turnRight()) {
                this.angleVel += this.angleAcl;
            }
            this.angleVel = Math.min(Math.max(this.angleVel, -this.maxAngleVel), this.maxAngleVel);
            if (!this.controls.turnLeft() && !this.controls.turnRight()) {
                if (this.angleVel > 0) {
                    this.angleVel -= this.angleDeacl;
                }
                if (this.angleVel < 0) {
                    this.angleVel += this.angleDeacl;
                }
                if (this.angleVel > -this.angleDeacl && this.angleVel < this.angleDeacl) {
                    this.angleVel = 0;
                }
            }
            this.setAngle(this.angle + this.angleVel);
        }
        else {
            if (this.controls.turnLeft()) {
                this.setAngle(this.angle - this.angleVel);
            }
            if (this.controls.turnRight()) {
                this.setAngle(this.angle + this.angleVel);
            }
        }
        if (this.controls.goForward()) {
            this.speed += this.speedAcl;
        }
        else {
            if (this.speed > 0) {
                this.speed -= this.speedDeacl;
            }
            else {
                this.speed = 0;
            }
        }
        if (this.controls.slowDown()) {
            if (this.speed > 0) {
                this.speed -= this.manualSpeedDeacl;
            }
            else {
                this.speed = 0;
            }
        }
        this.speed = Math.min(this.speed, this.maxSpeed);
        var angle = this.angle - 90;
        this.x += trig_1.default.cos(angle) * this.speed;
        this.y += trig_1.default.sin(angle) * this.speed;
        if (this.hp <= 0) {
            this.kill();
        }
    };
    return Ship;
}(SpaceGameObject_1.default));
exports.default = Ship;
//# sourceMappingURL=Ship.js.map

/***/ }),

/***/ "./gameObjects/space/Shrapnel.js":
/*!***************************************!*\
  !*** ./gameObjects/space/Shrapnel.js ***!
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
var Shrapnel = (function (_super) {
    __extends(Shrapnel, _super);
    function Shrapnel(scene, x, y, texture) {
        var _this = _super.call(this, scene, x, y, texture) || this;
        _this.setCollisionGroup(2);
        _this.setCollidesWith(0);
        _this.setFrictionAir(0.0001);
        return _this;
    }
    return Shrapnel;
}(SpaceGameObject_1.default));
exports.default = Shrapnel;
//# sourceMappingURL=Shrapnel.js.map

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
        var _this = _super.call(this, scene.matter.world, x, y, texture, frame) || this;
        _this.killed = false;
        _this.destroyOnKill = true;
        _this.destroyQueued = false;
        scene.add.existing(_this);
        scene.csp.initGameObject(_this);
        return _this;
    }
    SpaceGameObject.prototype.preUpdate = function (time, delta) {
        this.bodyConf.update();
        _super.prototype.preUpdate.call(this, time, delta);
    };
    SpaceGameObject.prototype.onCollide = function (object) {
    };
    SpaceGameObject.prototype.onKill = function () {
    };
    SpaceGameObject.prototype.kill = function () {
        if (this.killed) {
            return;
        }
        this.killed = true;
        this.onKill();
        this.destroyQueued = this.destroyOnKill;
    };
    return SpaceGameObject;
}(Phaser.Physics.Matter.Sprite));
exports.default = SpaceGameObject;
//# sourceMappingURL=SpaceGameObject.js.map

/***/ }),

/***/ "./gameObjects/space/XPStar.js":
/*!*************************************!*\
  !*** ./gameObjects/space/XPStar.js ***!
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
var XPStar = (function (_super) {
    __extends(XPStar, _super);
    function XPStar(scene, x, y, texture) {
        var _this = _super.call(this, scene, x, y, texture) || this;
        _this.amt = 1;
        _this.setAngle(Phaser.Math.RND.between(0, 180));
        _this.setCollisionGroup(2);
        _this.setCollidesWith(0);
        if (texture === "xpStar") {
            _this.amt = 2;
        }
        _this.setOnCollide(function (colData) {
            if (colData.bodyA.gameObject && colData.bodyA.gameObject._arrayName === "playerShip") {
                var playerShip = colData.bodyA.gameObject;
                _this.onCollide(playerShip);
            }
        });
        return _this;
    }
    XPStar.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
    };
    XPStar.prototype.onCollide = function (playerShip) {
        playerShip.collectXPStars(this);
        this.destroy();
    };
    return XPStar;
}(SpaceGameObject_1.default));
exports.default = XPStar;
//# sourceMappingURL=XPStar.js.map

/***/ }),

/***/ "./logger.js":
/*!*******************!*\
  !*** ./logger.js ***!
  \*******************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var logger = {
    warn: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.warn.apply(console, arguments);
    }
};
exports.default = logger;
//# sourceMappingURL=logger.js.map

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

/***/ "./scenes/planet/BlockIndexes.js":
/*!***************************************!*\
  !*** ./scenes/planet/BlockIndexes.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.default = {
    GRASS_PLANET_2: {
        GRASS: 1,
        DIRT: 2,
        WATER_TOP: 3,
        WATER: 4,
        WATER_BLANK: 5,
        LAVA_TOP: 6,
        LAVA: 7,
        LAVA_BLANK: 8,
        BRICK: 9,
        DOOR_TOP: 10,
        DOOR_BOTTOM: 11,
        BACK_GRASS: 12,
        BACK_DIRT: 13,
        SLOPE_LEFT_UP: 14,
        SLOPE_RIGHT_UP: 15,
        GREEN_BEAKER: 21,
        CHECKPOINT: 22
    },
    GRASS_PLANET: {
        WATER: 59,
        WATER_2: 60
    }
};
//# sourceMappingURL=BlockIndexes.js.map

/***/ }),

/***/ "./scenes/planet/PlanetBackScene.js":
/*!******************************************!*\
  !*** ./scenes/planet/PlanetBackScene.js ***!
  \******************************************/
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
var PlanetBackScene = (function (_super) {
    __extends(PlanetBackScene, _super);
    function PlanetBackScene() {
        var _this = _super.call(this, "planetBack") || this;
        _this.ignoreLayersAmt = 2;
        return _this;
    }
    PlanetBackScene.prototype.preload = function () {
        this.load.spritesheet("scrollBackground", "./assets/Planet/Backgrounds/GrassPlanet/GrassPlanet.png", {
            frameWidth: 400,
            frameHeight: 225
        });
    };
    PlanetBackScene.prototype.create = function () {
        var backgraphics = this.add.graphics().setScrollFactor(0);
        backgraphics.fillStyle(0x00ABFF);
        backgraphics.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        backgraphics.setDepth(-2);
        this.layerSpeeds = [
            -1,
            -1,
            0.75,
            0.6,
            0.4
        ];
        this.layers = [];
        this.nextLayers = [];
        for (var i = 0; i < this.layerSpeeds.length; i++) {
            var layer = this.add.image(0, 0, "scrollBackground", i);
            layer.setScrollFactor(0, 0).setDisplayOrigin(0, 0).setScale(2, 2);
            this.layers.push(layer);
            var nextLayer = this.add.image(0, 0, "scrollBackground", i);
            nextLayer.setScrollFactor(0, 0).setDisplayOrigin(0, 0).setScale(2, 2);
            this.nextLayers.push(nextLayer);
        }
    };
    PlanetBackScene.prototype.update = function () {
        var planetLogicScene = this.scene.get("planetLogic");
        var cam = planetLogicScene.cameras.main;
        var width = cam.width;
        var diff = width - cam.scrollX;
        for (var i = this.ignoreLayersAmt; i < this.layers.length; i++) {
            var layer = this.layers[i];
            var speed = diff / this.layerSpeeds[i];
            var index = -Math.floor((speed + width) / layer.displayWidth);
            layer.x = layer.displayWidth * index + speed;
            this.nextLayers[i].x = layer.displayWidth * (index + 1) + speed;
            layer.y = 100;
            this.nextLayers[i].y = 100;
        }
    };
    return PlanetBackScene;
}(Phaser.Scene));
exports.default = PlanetBackScene;
//# sourceMappingURL=PlanetBackScene.js.map

/***/ }),

/***/ "./scenes/planet/PlanetEffectsScene.js":
/*!*********************************************!*\
  !*** ./scenes/planet/PlanetEffectsScene.js ***!
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
var BlockIndexes_1 = __webpack_require__(/*! ./BlockIndexes */ "./scenes/planet/BlockIndexes.js");
var PlanetEffectsScene = (function (_super) {
    __extends(PlanetEffectsScene, _super);
    function PlanetEffectsScene() {
        return _super.call(this, "planetEffects") || this;
    }
    PlanetEffectsScene.prototype.preload = function () {
        this.load.audio("brickBreak", "./assets/Planet/Sounds/quickBoom.wav");
        this.load.spritesheet("brick", "./assets/Planet/GameObjects/blocks/brick.png", {
            frameWidth: 8,
            frameHeight: 8,
        });
    };
    PlanetEffectsScene.prototype.create = function () {
        this.brickParticles = this.add.particles("brick");
        this.brickEmitter = this.brickParticles.createEmitter({
            gravityY: 1600,
            lifespan: 5000
        });
        this.brickEmitter.stop();
        this.logicCam = this.scene.get("planetLogic").cameras.main;
        this.sounds = {
            brickBreak: this.sound.add("brickBreak")
        };
    };
    PlanetEffectsScene.prototype.playSound = function (key) {
        this.sounds[key].play();
    };
    ;
    PlanetEffectsScene.prototype.emitBricks = function (bounds) {
        this.logicCam = this.scene.get("planetLogic").cameras.main;
        var emitter = this.brickEmitter;
        var xSpeed = 20;
        var ySpeed = 300;
        emitter.setFrame(0).setSpeedX(-xSpeed).setSpeedY(-ySpeed).emitParticleAt(bounds.x + 0.25 * bounds.width, bounds.y + 0.25 * bounds.height);
        emitter.setFrame(1).setSpeedX(xSpeed).setSpeedY(-ySpeed).emitParticleAt(bounds.x + 0.75 * bounds.width, bounds.y + 0.25 * bounds.height);
        emitter.setFrame(2).setSpeedX(-xSpeed * 2).setSpeedY(-ySpeed).emitParticleAt(bounds.x + 0.25 * bounds.width, bounds.y + 0.75 * bounds.height);
        emitter.setFrame(3).setSpeedX(xSpeed * 2).setSpeedY(-ySpeed).emitParticleAt(bounds.x + 0.75 * bounds.width, bounds.y + 0.75 * bounds.height);
        this.playSound("brickBreak");
    };
    PlanetEffectsScene.prototype.processBrickCollision = function (player, tilemap) {
        if (!player.body.blocked.up) {
            return;
        }
        var logicCam = this.scene.get("planetLogic").cameras.main;
        var tileLeft = tilemap.getTileAtWorldXY(player.body.x, player.body.y - 1, undefined, logicCam, "World");
        var tileRight = tilemap.getTileAtWorldXY(player.body.right, player.body.y - 1, undefined, logicCam, "World");
        if (tileLeft && tileLeft.index === BlockIndexes_1.default.GRASS_PLANET_2.BRICK) {
            var bounds = tileLeft.getBounds();
            tilemap.removeTileAt(tileLeft.x, tileLeft.y, true, true, "World");
            this.emitBricks(bounds);
        }
        else if (tileRight && tileRight.index === BlockIndexes_1.default.GRASS_PLANET_2.BRICK) {
            var bounds = tileRight.getBounds();
            tilemap.removeTileAt(tileRight.x, tileRight.y, true, true, "World");
            this.emitBricks(bounds);
        }
    };
    PlanetEffectsScene.prototype.update = function (time, delta) {
        var mainCam = this.cameras.main;
        var logicCam = this.logicCam;
        mainCam.setScroll(logicCam.scrollX, logicCam.scrollY);
        mainCam.setZoom(logicCam.zoom);
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
//# sourceMappingURL=PlanetEffectsScene.js.map

/***/ }),

/***/ "./scenes/planet/PlanetLoaderScene.js":
/*!********************************************!*\
  !*** ./scenes/planet/PlanetLoaderScene.js ***!
  \********************************************/
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
var logger_1 = __webpack_require__(/*! ../../logger */ "./logger.js");
var PlanetLoaderScene = (function (_super) {
    __extends(PlanetLoaderScene, _super);
    function PlanetLoaderScene() {
        return _super.call(this, "planetLoader") || this;
    }
    PlanetLoaderScene.prototype.setTravelerSaveInfo = function (info) {
        if (info !== undefined) {
            this.traveler.saveInfo = info;
        }
    };
    PlanetLoaderScene.prototype.loadPlayer = function (inputData, tilemap, doorGroup, checkpointGroup, currentLevel, defaultLevel) {
        var spawnPointObj = tilemap.findObject("Objects", function (obj) { return obj.name === "Player Spawn Point"; });
        var spawnPoint;
        if (!spawnPointObj) {
            spawnPoint = {
                x: 0,
                y: 0
            };
        }
        else {
            spawnPoint = {
                x: spawnPointObj.x,
                y: spawnPointObj.y
            };
        }
        this.handleDoors(tilemap, doorGroup);
        this.handleCheckpoints(checkpointGroup, currentLevel);
        if (inputData.loadType === "door") {
            spawnPoint = this.getDoorEntryPoint(tilemap, doorGroup, inputData.doorGoto);
        }
        else if (inputData.loadType === "checkpoint") {
            spawnPoint = this.getCheckpointPlace(checkpointGroup, inputData.checkpointGoto);
        }
        var player = new Player_1.default(this.scene.get("planetLogic"), spawnPoint.x, spawnPoint.y);
        player.startLevel = defaultLevel;
        if (inputData.loadType === "checkpoint" &&
            this.traveler.saveInfo !== undefined &&
            this.traveler.saveInfo.playerStats !== undefined) {
            player.setStats(this.traveler.saveInfo.playerStats);
        }
        if (this.traveler.containsInfo) {
            var info = this.traveler.getInfo();
            player.setCurrentState(info.player);
        }
        this.player = player;
        return player;
    };
    PlanetLoaderScene.prototype.getDoorEntryPoint = function (tilemap, doorGroup, doorGoto) {
        var objects = tilemap.getObjectLayer("Objects").objects;
        for (var i = 0; i < objects.length; i++) {
            var obj = objects[i];
            if (obj.name !== "Door") {
                continue;
            }
            for (var j in obj.properties) {
                var prop = obj.properties[j];
                if (prop.name === "door" && prop.value === doorGoto.door) {
                    var doors = doorGroup.children.getArray();
                    for (var i = 0; i < doors.length; i++) {
                        var door = doors[i];
                        var doorBounds = door.getBounds();
                        if (doorBounds.contains(obj.x, obj.y)) {
                            return {
                                x: door.x + door.body.halfWidth / 2,
                                y: door.y + door.body.halfHeight
                            };
                        }
                    }
                }
            }
        }
        logger_1.default.warn("Couldn't find door at door symbol '" + doorGoto.door + "'");
        return {
            x: 0,
            y: 0
        };
    };
    PlanetLoaderScene.prototype.handleDoors = function (tilemap, doorGroup, spawnPoint, doorGoto) {
        var objects = tilemap.getObjectLayer("Objects").objects;
        var _loop_1 = function () {
            var obj = objects[i];
            if (obj.name === "Door") {
                if (spawnPoint !== undefined && doorGoto !== undefined) {
                    for (var j in obj.properties) {
                        var prop = obj.properties[j];
                        if (prop.name === "door" && prop.value === doorGoto.door) {
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
                        var gotoLevel, gotoDoor;
                        for (var j in obj.properties) {
                            var prop = obj.properties[j];
                            if (prop.name === "gotoLevel") {
                                gotoLevel = prop.value;
                            }
                            else if (prop.name === "gotoDoor") {
                                gotoDoor = prop.value;
                            }
                        }
                        if (gotoLevel && gotoDoor) {
                            door.setGoto({
                                level: gotoLevel,
                                door: gotoDoor
                            });
                        }
                    }
                });
            }
        };
        for (var i = 0; i < objects.length; i++) {
            _loop_1();
        }
    };
    PlanetLoaderScene.prototype.getCheckpointPlace = function (checkpointGroup, goto) {
        var checkpoints = checkpointGroup.getChildren();
        for (var i = 0; i < checkpoints.length; i++) {
            if (checkpoints[i].goto.index === goto.index) {
                return {
                    x: checkpoints[i].x + checkpoints[i].body.halfWidth,
                    y: checkpoints[i].y
                };
            }
        }
        logger_1.default.warn("Couldn't load from checkpoint index '" + goto.index + "'");
        return {
            x: 0,
            y: 0
        };
    };
    PlanetLoaderScene.prototype.handleCheckpoints = function (checkpointGroup, currentLevel) {
        checkpointGroup.getChildren().forEach(function (checkpoint, index) {
            checkpoint.goto = {
                level: currentLevel,
                index: index
            };
        });
    };
    PlanetLoaderScene.prototype.update = function () {
    };
    PlanetLoaderScene.prototype.restart = function (inputData) {
        if (this.loading) {
            return;
        }
        this.loading = true;
        this.scene.pause("planetLogic");
        if (["restart", "death"].indexOf(inputData.reason) === -1) {
            this.traveler.setInfo({
                player: this.player.getCurrentState()
            });
        }
        this.scene.run("planetLogic");
        var planetLogicScene = this.scene.get("planetLogic");
        var loadData = planetLogicScene.loadData;
        if (inputData.loadType === "door") {
            loadData.currentLevel = inputData.doorGoto.level;
        }
        else if (inputData.loadType === "checkpoint") {
            loadData.currentLevel = inputData.checkpointGoto.level;
        }
        else if (inputData.loadType === "start") {
            loadData.currentLevel = inputData.startGoto.level;
        }
        planetLogicScene.scene.restart(inputData);
        this.loading = false;
    };
    return PlanetLoaderScene;
}(Phaser.Scene));
exports.default = PlanetLoaderScene;
//# sourceMappingURL=PlanetLoaderScene.js.map

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
var Water_1 = __webpack_require__(/*! ../../gameObjects/planet/Water */ "./gameObjects/planet/Water.js");
var PlanetLogicScene = (function (_super) {
    __extends(PlanetLogicScene, _super);
    function PlanetLogicScene() {
        var _this = _super.call(this, {
            key: "planetLogic",
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: 950 },
                }
            },
        }) || this;
        _this.init();
        return _this;
    }
    PlanetLogicScene.prototype.init = function () {
        if (this.loadData !== undefined) {
            return;
        }
        this.loadData = {
            currentWorld: "GrassPlanet",
            currentTileset: "GrassPlanet",
            currentLevel: "Level1"
        };
        this.presetData = {
            currentLevel: this.loadData.currentLevel
        };
    };
    PlanetLogicScene.prototype.receiveLevelInfo = function (levelInfo) {
    };
    PlanetLogicScene.prototype.preload = function () {
        this.load.spritesheet("Player", "./assets/Planet/GameObjects/Player/NewHelix.png", { frameWidth: 17, frameHeight: 29 });
        var currentWorld = this.loadData.currentWorld;
        var currentTileset = this.loadData.currentTileset;
        var currentLevel = this.loadData.currentLevel;
        this.load.image(currentTileset, "./assets/Planet/levels/" + currentWorld + "/tilesets/" + currentTileset + ".png");
        this.load.tilemapTiledJSON(currentLevel, "./assets/Planet/levels/" + currentWorld + "/tilemaps/" + currentLevel + ".json");
    };
    PlanetLogicScene.prototype.create = function (inputData) {
        var _this = this;
        var tilemap = this.make.tilemap({ key: this.loadData.currentLevel, tileWidth: 16, tileHeight: 16 });
        var tileset = tilemap.addTilesetImage(this.loadData.currentTileset);
        var backgroundLayer = tilemap.createLayer("Background", tileset, 0, 0);
        var groundLayer = tilemap.createLayer("Ground", tileset, 0, 0).setCollisionByProperty({ collides: true });
        var foregroundLayer = tilemap.createLayer("Foreground", tileset, 0, 0);
        this.player = new Player_1.default(this, 200, 100);
        this.physics.add.collider(this.player, groundLayer);
        backgroundLayer.setDepth(0);
        groundLayer.setDepth(1);
        foregroundLayer.setDepth(10);
        this.physics.world.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
        this.physics.world.setBoundsCollision(true, true, true, false);
        var cam = this.cameras.main;
        cam.startFollow(this.player);
        cam.setZoom(2);
        cam.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
        var water = this.add.group();
        this.physics.add.collider(this.player, water, function (objectA, objectB) {
            objectB.onCollide(objectA);
        });
        groundLayer.forEachTile(function (tile) {
            if (tile.index > 82 && tile.index < 99) {
                tile.alpha = 0.8;
                water.add(new Water_1.default(_this, tile.pixelX, tile.pixelY));
            }
        });
    };
    PlanetLogicScene.prototype.getPlayerStats = function () {
        return this.player.getStats();
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
        this.scene.sleep("planetBack");
    };
    PlanetScene.prototype.runScenes = function (calledByEntryScene) {
        this.scene.run("planetBack");
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

/***/ "./scenes/planet/PlanetUIScene.js":
/*!****************************************!*\
  !*** ./scenes/planet/PlanetUIScene.js ***!
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
var InfoBar_1 = __webpack_require__(/*! ../../UI/planet/InfoBar */ "./UI/planet/InfoBar.js");
var PlanetUIScene = (function (_super) {
    __extends(PlanetUIScene, _super);
    function PlanetUIScene() {
        return _super.call(this, "planetUI") || this;
    }
    PlanetUIScene.prototype.create = function () {
        var _this = this;
        this.infoBar = new InfoBar_1.default(this);
        this.time.delayedCall(100, function () {
            _this.infoBar.init();
        });
    };
    PlanetUIScene.prototype.update = function () {
        if (this.scene.isActive("planetLogic")) {
            this.infoBar.update();
        }
    };
    return PlanetUIScene;
}(Phaser.Scene));
exports.default = PlanetUIScene;
//# sourceMappingURL=PlanetUIScene.js.map

/***/ }),

/***/ "./scenes/space/CameraTargetTracker.js":
/*!*********************************************!*\
  !*** ./scenes/space/CameraTargetTracker.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var CameraTargetTracker = (function () {
    function CameraTargetTracker(object) {
        if (object) {
            this.trackedObject = object;
            this.x = object.x;
            this.y = object.y;
        }
    }
    CameraTargetTracker.prototype.setTrackedObject = function (object) {
        this.trackedObject = object;
        this.x = object.x;
        this.y = object.y;
    };
    CameraTargetTracker.prototype.update = function () {
        if (this.trackedObject && this.trackedObject.body && this.trackedObject.body.position) {
            this.x = this.trackedObject.x;
            this.y = this.trackedObject.y;
        }
    };
    return CameraTargetTracker;
}());
exports.default = CameraTargetTracker;
//# sourceMappingURL=CameraTargetTracker.js.map

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
            _this.updateZoom(Math.min(Math.max(cam.zoom - dy * 0.001, 0.05), 2.5));
        });
        this.keys = {
            rotateLeft: this.input.keyboard.addKey('a'),
            rotateRight: this.input.keyboard.addKey('d'),
            rotateReset: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO)
        };
        this.camAngle = 0;
        this.angleSpeed = 2;
        this.updateZoom(0.9);
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
        var spaceCam = this.spaceScene.cameras.main;
        cam.setScroll(spaceCam.scrollX, spaceCam.scrollY);
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

/***/ "./scenes/space/SpaceEffectsScene.js":
/*!*******************************************!*\
  !*** ./scenes/space/SpaceEffectsScene.js ***!
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
var SpaceEffectsScene = (function (_super) {
    __extends(SpaceEffectsScene, _super);
    function SpaceEffectsScene() {
        return _super.call(this, "spaceEffects") || this;
    }
    SpaceEffectsScene.prototype.preload = function () {
    };
    SpaceEffectsScene.prototype.create = function () {
    };
    SpaceEffectsScene.prototype.update = function (time, delta) {
    };
    return SpaceEffectsScene;
}(Phaser.Scene));
exports.default = SpaceEffectsScene;
//# sourceMappingURL=SpaceEffectsScene.js.map

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
var Nebula_1 = __webpack_require__(/*! ../../gameObjects/space/Nebula */ "./gameObjects/space/Nebula.js");
var HyperBeamerSType_1 = __webpack_require__(/*! ../../gameObjects/space/HyperBeamerSType */ "./gameObjects/space/HyperBeamerSType.js");
var Shrapnel_1 = __webpack_require__(/*! ../../gameObjects/space/Shrapnel */ "./gameObjects/space/Shrapnel.js");
var XPStar_1 = __webpack_require__(/*! ../../gameObjects/space/XPStar */ "./gameObjects/space/XPStar.js");
var Crest_1 = __webpack_require__(/*! ../../gameObjects/space/Crest */ "./gameObjects/space/Crest.js");
var trig_1 = __webpack_require__(/*! ../../gameObjects/Utils/trig */ "./gameObjects/Utils/trig.js");
var SpaceLogicScene = (function (_super) {
    __extends(SpaceLogicScene, _super);
    function SpaceLogicScene() {
        return _super.call(this, "spaceLogic") || this;
    }
    SpaceLogicScene.prototype.create = function () {
    };
    SpaceLogicScene.prototype.addObjectsToSpace = function () {
        this.spaceScene = this.scene.get("space");
        var world = this.spaceScene.csp.world;
        var random = trig_1.default.random;
        var nebulae = world.add.gameObjectArray(Nebula_1.default, "nebula");
        var gridConfig = this.spaceScene.cspConfig.grid;
        var placeWidth = gridConfig.cols * gridConfig.cellWidth;
        var placeHeight = gridConfig.rows * gridConfig.cellHeight;
        var nebulaeAmt = Math.floor((placeWidth * placeHeight) / 10000000);
        for (var i = 0; i < 300; i++) {
            nebulae.add(this.spaceScene, 69000 + 13000 * Phaser.Math.RND.frac(), 60500 + 13000 * Phaser.Math.RND.frac(), "purpleNebula");
        }
        var planets = world.add.gameObjectArray(Planet_1.default, "planet");
        planets.add(this.spaceScene, 69000, 60000, "IcyDwarfPlanet");
        planets.add(this.spaceScene, 56000, 70000, "RedDustPlanet");
        world.add.gameObjectArray(XPStar_1.default, "xpStar");
        world.add.gameObjectArray(Crest_1.default, "crest");
        var shrapnels = world.add.gameObjectArray(Shrapnel_1.default, "shrapnel");
        var shrapnelClustAmt = Math.floor((placeWidth * placeHeight) / 100000000);
        for (var i = 0; i < shrapnelClustAmt; i++) {
            var shrapnelClusterX = random(500, placeWidth - 500);
            var shrapnelClusterY = random(500, placeHeight - 500);
            for (var j = 0; j < random(4, 6); j++) {
                shrapnels.add(this.spaceScene, shrapnelClusterX + random(-200, 200), shrapnelClusterY + random(-200, 200), "shrapnel" + Math.floor(random(1, 5)));
            }
        }
        shrapnels.add(this.spaceScene, 69000, 62000, "shrapnel1");
        shrapnels.add(this.spaceScene, 69000, 62200, "shrapnel2");
        shrapnels.add(this.spaceScene, 69130, 62200, "shrapnel3");
        shrapnels.add(this.spaceScene, 69170, 62100, "shrapnel4");
        shrapnels.add(this.spaceScene, 69190, 62000, "shrapnel3");
        this.playerShip = world.add.gameObjectArray(PlayerShip_1.default, "playerShip").add(this.spaceScene, 69000, 60500);
        this.spaceScene.setCameraTarget(this.playerShip);
        var hyperBeamerSTypes = world.add.gameObjectArray(HyperBeamerSType_1.default, "hyperBeamerSType");
        hyperBeamerSTypes.add(this.spaceScene, 69000, 60000 + 500);
        for (var i = 0; i < 100; i++) {
            hyperBeamerSTypes.add(this.spaceScene, 69200 + random(-7000, 7000), 61000 + random(-7000, 7000));
        }
        for (var i = 0; i < 23; i++) {
            hyperBeamerSTypes.add(this.spaceScene, 69200 + random(-700, 700), 60600 + random(-700, 700));
        }
    };
    SpaceLogicScene.prototype.addXPStar = function (x, y) {
        var xpStars = this.spaceScene.csp.world.get.gameObjectArray("xpStar");
        xpStars.add(this.spaceScene, x + Phaser.Math.RND.between(-50, 50), y + Phaser.Math.RND.between(-50, 50), "xpStar");
    };
    SpaceLogicScene.prototype.addSmallXPStar = function (x, y) {
        var smallXPStars = this.spaceScene.csp.world.get.gameObjectArray("xpStar");
        smallXPStars.add(this.spaceScene, x + Phaser.Math.RND.between(-50, 50), y + Phaser.Math.RND.between(-50, 50), "smallXPStar");
    };
    SpaceLogicScene.prototype.addCrests = function (x, y) {
        var crests = this.spaceScene.csp.world.get.gameObjectArray("crest");
        crests.add(this.spaceScene, x + Phaser.Math.RND.between(-50, 50), y + Phaser.Math.RND.between(-50, 50), "crest");
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
var CameraTargetTracker_1 = __webpack_require__(/*! ./CameraTargetTracker */ "./scenes/space/CameraTargetTracker.js");
var SpaceScene = (function (_super) {
    __extends(SpaceScene, _super);
    function SpaceScene() {
        var _this = _super.call(this, {
            key: "space",
            physics: {
                default: "matter",
                matter: {
                    gravity: false,
                    autoUpdate: false,
                }
            }
        }) || this;
        _this.loaded = false;
        _this.stepMatter = 0;
        _this.cameraTargetTracker = new CameraTargetTracker_1.default();
        return _this;
    }
    SpaceScene.prototype.preload = function () {
        this.load.image("helixShip", "./assets/Space/Ships/helixShip.png");
        this.load.image("helixShipParticle", "./assets/Space/Ships/helixShipParticle.png");
        this.load.image("helixShipLvl1Bullet", "./assets/Space/Bullets/helixShipLvl1Bullet.png");
        this.load.json("helixShipShape", "./assets/Space/Ships/helixShipShape.json");
        this.load.image("hyperBeamerSTypeGreen", "./assets/Space/Ships/hyperBeamerSTypeGreen.png");
        this.load.image("hyperBeamerSTypeGreenParticle", "./assets/Space/Ships/hyperBeamerSTypeGreenParticle.png");
        this.load.spritesheet("shipHealthBar", "./assets/Space/UI/ShipHealthBar.png", { frameWidth: 40, frameHeight: 57 });
        this.load.image("asteroid1", "./assets/Space/Asteroids/Asteroid.png");
        this.load.image("IcyDwarfPlanet", "./assets/Space/Planets/IcyDwarfPlanet.png");
        this.load.image("RedDustPlanet", "./assets/Space/Planets/RedDustPlanet.png");
        this.load.image("GreenPlanet", "./assets/Space/Planets/GreenPlanet.png");
        this.load.image("grayNebula", "./assets/Space/nebula/grayNebula.png");
        this.load.image("purpleNebula", "./assets/Space/nebula/purpleNebula.png");
        this.load.image("xpStar", "./assets/Space/DroppedItems/XPStar.png");
        this.load.image("smallXPStar", "./assets/Space/DroppedItems/SmallXPStar.png");
        this.load.image("crest", "./assets/Space/DroppedItems/Crest.png");
        this.load.image("shrapnel1", "./assets/Space/Shrapnel/shrapnel1.png");
        this.load.image("shrapnel2", "./assets/Space/Shrapnel/shrapnel2.png");
        this.load.image("shrapnel3", "./assets/Space/Shrapnel/shrapnel3.png");
        this.load.image("shrapnel4", "./assets/Space/Shrapnel/shrapnel4.png");
        this.load.scenePlugin({
            key: "CartesianSystemPlugin",
            url: "./libraries/CartesianSystemPlugin.js",
            sceneKey: 'csp'
        });
    };
    SpaceScene.prototype.create = function () {
        var worldWidth = 204800;
        var worldHeight = 204800;
        var cellWidth = 512;
        var cellHeight = 512;
        this.cspConfig = {
            window: {
                width: this.game.config.width,
                height: this.game.config.height
            },
            grid: {
                cols: worldWidth / cellWidth,
                rows: worldHeight / cellHeight,
                cellWidth: cellWidth,
                cellHeight: cellHeight
            }
        };
        this.csp.initWorld(this.cspConfig);
        this.scene.get("spaceLogic").addObjectsToSpace();
        this.runScenes(false);
        this.loaded = true;
        this.prepareStatsGraphics();
        this.cameras.main.startFollow(this.cameraTargetTracker);
    };
    SpaceScene.prototype.handleGameOver = function () {
        this.reloadSpace();
    };
    SpaceScene.prototype.reloadSpace = function () {
        this.stopScenes();
        var playerShip = this.scene.get("spaceLogic").playerShip;
        playerShip.ignoreDestroy = true;
        this.matter.world.destroy();
        this.matter.world = new Phaser.Physics.Matter.World(this, {
            gravity: false,
            autoUpdate: false,
        });
        Phaser.Math.RND = new Phaser.Math.RandomDataGenerator(this.game.config.seed);
        this.csp.initWorld(this.cspConfig);
        this.scene.get("spaceLogic").addObjectsToSpace();
        playerShip.resetStats();
        this.runScenes(false);
        this.prepareStatsGraphics();
    };
    SpaceScene.prototype.prepareStatsGraphics = function () {
        this.statsGraphics = this.add.graphics().setDepth(4);
    };
    SpaceScene.prototype.setCameraTarget = function (object) {
        this.cameraTargetTracker.setTrackedObject(object);
    };
    SpaceScene.prototype.getCameraTarget = function () {
        return this.cameraTargetTracker;
    };
    SpaceScene.prototype.runScenes = function (calledByEntryScene) {
        this.runDebugScenes();
        this.scene.run("spaceLogic");
        this.scene.run("spaceCameraController");
        this.scene.run("starSceneController");
        this.scene.run("spaceUI");
        this.scene.bringToTop("spaceEffects");
        var playerShip = this.scene.get("spaceLogic").playerShip;
        if (calledByEntryScene) {
            playerShip.y += 500;
            playerShip.resetKeys();
        }
    };
    SpaceScene.prototype.runDebugScenes = function () {
        var _this = this;
        this.scene.run("spaceDebug");
        this.scene.sleep("spaceDebug");
        this.scene.run("spaceUIDebug");
        this.scene.sleep("spaceUIDebug");
        this.scene.bringToTop("spaceUIDebug");
        this.input.keyboard.on("keydown-U", function () {
            if (_this.scene.isSleeping("spaceUIDebug")) {
                _this.scene.wake("spaceUIDebug");
                _this.scene.bringToTop("spaceUIDebug");
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
        this.scene.bringToTop("spaceEffects");
    };
    SpaceScene.prototype.sleepDebugScenes = function () {
        this.scene.sleep("spaceDebug");
        this.scene.sleep("spaceUIDebug");
    };
    SpaceScene.prototype.sleepScenes = function (calledByEntryScene) {
        this.scene.moveBelow("spaceUI", "spaceEffects");
        this.scene.sleep("spaceUI");
        this.scene.sleep("starSceneController");
        this.scene.sleep("spaceCameraController");
        this.scene.sleep("spaceLogic");
    };
    SpaceScene.prototype.stopScenes = function () {
        this.scene.stop("spaceUIDebug");
        this.scene.stop("spaceDebug");
        this.scene.stop("spaceEffects");
        this.scene.stop("spaceUI");
        this.scene.stop("starSceneController");
        this.scene.stop("spaceCameraController");
        this.scene.stop("spaceLogic");
    };
    SpaceScene.prototype.switchToPlanetSceneGroup = function (levelInfo) {
        var entryScene = this.scene.get("entry");
        entryScene.switchSceneGroup("planet", function (fromScene, nextScene) {
            nextScene.receiveInfo(levelInfo);
        });
    };
    SpaceScene.prototype.getEffectsScene = function () {
        return this.scene.get("spaceEffects");
    };
    SpaceScene.prototype.update = function (time, delta) {
        var _this = this;
        var playerShip = this.scene.get("spaceLogic").playerShip;
        this.cameraTargetTracker.update();
        this.updateStatsGraphics();
        this.csp.setFollow(playerShip.x, playerShip.y);
        this.csp.updateWorld(function (csp) {
            _this.csp.systems.displayList.add(playerShip.particles);
            _this.sys.displayList.list.forEach(function (gameObject) {
                if (gameObject.particles !== undefined) {
                    csp.systems.displayList.add(gameObject.particles);
                }
                if (gameObject.destroyQueued) {
                    gameObject.bodyConf.updateBoundingBox();
                    gameObject.destroy();
                    gameObject.destroyQueued = false;
                }
            });
            _this.csp.systems.displayList.add(_this.statsGraphics);
            _this.sys.updateList.getActive().forEach(function (gameObject) {
                if (gameObject.destroyQueued) {
                    gameObject.bodyConf.updateBoundingBox();
                    gameObject.destroy();
                    gameObject.destroyQueued = false;
                }
            });
        });
        if (this.stepMatter++ >= 2) {
            this.matter.step(1000 / 30, 0);
            this.stepMatter = 0;
        }
    };
    SpaceScene.prototype.updateStatsGraphics = function () {
        var _this = this;
        var cam = this.cameras.main;
        this.statsGraphics.clear();
        this.statsGraphics.setAngle(0);
        this.sys.displayList.list.forEach(function (object) {
            if (object.showHpBar) {
                var enemyShip = object;
                if (enemyShip.getHp() < enemyShip.getMaxHp()) {
                    var barX = enemyShip.x - enemyShip.width * 0.5;
                    var barY = enemyShip.y - enemyShip.width * 0.7;
                    _this.statsGraphics.fillStyle(0x0A297E);
                    _this.statsGraphics.fillRect(barX, barY, enemyShip.width, 4);
                    _this.statsGraphics.fillStyle(0x54B70E);
                    _this.statsGraphics.fillRect(barX, barY, enemyShip.getHp() * enemyShip.width / enemyShip.getMaxHp(), 4);
                }
            }
        });
    };
    return SpaceScene;
}(Phaser.Scene));
exports.default = SpaceScene;
//# sourceMappingURL=SpaceScene.js.map

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
        this.cellCoorText = this.add.text(40, 136, "");
        this.cellText = this.add.text(40, 150, "").setFontSize(12);
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
        this.input.activePointer.updateWorldPoint(this.scene.get("spaceCameraController").cameras.main);
        var coordinates = cspWorld.cameraGrid.getCoordinates(this.input.activePointer.worldX, this.input.activePointer.worldY);
        var cell = cspWorld.cameraGrid.grid[coordinates.col][coordinates.row];
        this.cellCoorText.setText("(" + coordinates.col + ", " + coordinates.row + ")");
        var txt = "";
        for (var i in cell) {
            txt += i + "\n";
        }
        this.cellText.setText(txt);
    };
    return SpaceUIDebugScene;
}(Phaser.Scene));
exports.default = SpaceUIDebugScene;
//# sourceMappingURL=SpaceUIDebugScene.js.map

/***/ }),

/***/ "./scenes/space/SpaceUIScene.js":
/*!**************************************!*\
  !*** ./scenes/space/SpaceUIScene.js ***!
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
var SpaceUIScene = (function (_super) {
    __extends(SpaceUIScene, _super);
    function SpaceUIScene() {
        return _super.call(this, "spaceUI") || this;
    }
    SpaceUIScene.prototype.create = function () {
        var spaceLogicScene = this.scene.get("spaceLogic");
        this.playerShip = spaceLogicScene.playerShip;
        this.cameras.main.setRoundPixels(true);
        var statsY = Math.floor(this.cameras.main.height - 114);
        var statsContainer = this.add.image(0, statsY, "shipHealthBar", 0).setScrollFactor(0).setScale(2).setOrigin(0).setFlipX(true);
        var statsHpBar = this.add.image(0, statsY, "shipHealthBar", 2).setScrollFactor(0).setScale(2).setOrigin(0).setFlipX(true);
        var statsHpMask = this.add.image(0, statsY, "shipHealthBar", 2).setScrollFactor(0).setScale(2).setOrigin(0).setFlipX(true);
        statsHpMask.setVisible(false);
        statsHpBar.mask = new Phaser.Display.Masks.BitmapMask(this, statsHpMask);
        this.setHpBar = function (hp, maxHp) {
            statsHpBar.y = statsY + statsHpBar.displayHeight - (hp * statsHpBar.displayHeight / maxHp);
        };
        var statsXpBar = this.add.image(0, statsY, "shipHealthBar", 3).setScrollFactor(0).setScale(2).setOrigin(0).setFlipX(true);
        var statsXpMask = this.add.image(0, statsY, "shipHealthBar", 3).setScrollFactor(0).setScale(2).setOrigin(0).setFlipX(true);
        statsXpMask.setVisible(false);
        statsXpBar.mask = new Phaser.Display.Masks.BitmapMask(this, statsXpMask);
        this.setXpBar = function (xp, maxXp) {
            var xpBarLength = 93;
            statsXpBar.y = statsY + xpBarLength - (xp * xpBarLength / maxXp);
        };
    };
    SpaceUIScene.prototype.update = function (time, delta) {
        var cam = this.cameras.main;
        cam.setRoundPixels(true);
        this.setHpBar(this.playerShip.getHp(), this.playerShip.getMaxHp());
        this.setXpBar(this.playerShip.getXp(), this.playerShip.getNextLevelXp());
    };
    return SpaceUIScene;
}(Phaser.Scene));
exports.default = SpaceUIScene;
//# sourceMappingURL=SpaceUIScene.js.map

/***/ }),

/***/ "./scenes/space/StarSceneControllerScene.js":
/*!**************************************************!*\
  !*** ./scenes/space/StarSceneControllerScene.js ***!
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
        this.tileSprites = [];
        this.scrollValues = [0.65, 0.9, 1];
        var layerAmt = this.scrollValues.length;
        for (var i = 1; i <= layerAmt; i++) {
            var tileSprite = this.add.tileSprite(cam.width / 2, cam.height / 2, cam.width * 2, cam.height * 2, "starBackground" + i).setDepth(i - layerAmt);
            this.tileSprites.push(tileSprite);
        }
        this.scene.sendToBack("starSceneController");
    };
    StarSceneControllerScene.prototype.update = function (time, delta) {
        var cam = this.scene.get("space").cameras.main;
        var scrollX = cam.scrollX, scrollY = cam.scrollY, zoom = cam.zoom;
        var rf = (1 - 1 / zoom);
        for (var i = 0; i < this.tileSprites.length; i++) {
            var tileSprite = this.tileSprites[i];
            tileSprite.setTileScale(zoom);
            tileSprite.setOrigin(0.5);
            tileSprite.setTilePosition(Math.floor(rf * cam.width + scrollX * this.scrollValues[i]), Math.floor(rf * cam.height + scrollY * this.scrollValues[i]));
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
var SpaceLogicScene_1 = __webpack_require__(/*! ./scenes/space/SpaceLogicScene */ "./scenes/space/SpaceLogicScene.js");
var PlanetScene_1 = __webpack_require__(/*! ./scenes/planet/PlanetScene */ "./scenes/planet/PlanetScene.js");
var PlanetLogicScene_1 = __webpack_require__(/*! ./scenes/planet/PlanetLogicScene */ "./scenes/planet/PlanetLogicScene.js");
var PlanetEffectsScene_1 = __webpack_require__(/*! ./scenes/planet/PlanetEffectsScene */ "./scenes/planet/PlanetEffectsScene.js");
var PlanetUIScene_1 = __webpack_require__(/*! ./scenes/planet/PlanetUIScene */ "./scenes/planet/PlanetUIScene.js");
var PlanetBackScene_1 = __webpack_require__(/*! ./scenes/planet/PlanetBackScene */ "./scenes/planet/PlanetBackScene.js");
var PlanetLoaderScene_1 = __webpack_require__(/*! ./scenes/planet/PlanetLoaderScene */ "./scenes/planet/PlanetLoaderScene.js");
var SpaceUIScene_1 = __webpack_require__(/*! ./scenes/space/SpaceUIScene */ "./scenes/space/SpaceUIScene.js");
var SpaceEffectsScene_1 = __webpack_require__(/*! ./scenes/space/SpaceEffectsScene */ "./scenes/space/SpaceEffectsScene.js");
var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 450,
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        autoRound: true
    },
    pixelArt: true,
    disableContextMenu: true,
    antialiasGL: false,
    antialias: false,
    batchSize: 128,
    scene: [
        EntryScene_1.default,
        SpaceScene_1.default, SpaceCameraControllerScene_1.default, SpaceDebugScene_1.default,
        SpaceUIDebugScene_1.default, StarSceneControllerScene_1.default, SpaceLogicScene_1.default, SpaceUIScene_1.default, SpaceEffectsScene_1.default,
        PlanetScene_1.default, PlanetBackScene_1.default, PlanetLogicScene_1.default, PlanetLoaderScene_1.default, PlanetUIScene_1.default, PlanetEffectsScene_1.default
    ],
    seed: "explorationHelix1"
};
var game = new Phaser.Game(config);
window.game = game;
//# sourceMappingURL=index.js.map
})();

PlanetSearch3 = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=PlanetSearch3.js.map