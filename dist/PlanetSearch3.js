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

/***/ "./gameObjects/Utils/State.js":
/*!************************************!*\
  !*** ./gameObjects/Utils/State.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var State = (function () {
    function State() {
        this.on = false;
    }
    State.prototype.start = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    State.prototype.stop = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    return State;
}());
exports.default = State;
//# sourceMappingURL=State.js.map

/***/ }),

/***/ "./gameObjects/Utils/StateMachine.js":
/*!*******************************************!*\
  !*** ./gameObjects/Utils/StateMachine.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var StateMachine = (function () {
    function StateMachine(states) {
        this.states = states;
    }
    StateMachine.prototype.startMultiple = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        Array.prototype.slice.call(arguments).forEach(function (key) {
            _this.start(key);
        });
    };
    StateMachine.prototype.start = function (key, args) {
        var state = this.states[key];
        state.on = true;
        state.start.apply(state, args);
    };
    ;
    StateMachine.prototype.emit = function (name, args) {
        for (var i in this.states) {
            var state = this.states[i];
            if (state.on && state[name] !== undefined) {
                state[name].apply(state, args);
            }
        }
    };
    StateMachine.prototype.emitState = function (stateName, name, args) {
        var state = this.states[stateName];
        if (state.on && state[name] !== undefined) {
            state[name].apply(state, args);
        }
    };
    StateMachine.prototype.getState = function (key) {
        return this.states[key];
    };
    StateMachine.prototype.stopAll = function () {
        for (var i in this.states) {
            var state = this.states[i];
            state.on = false;
            state.stop();
        }
        ;
    };
    StateMachine.prototype.stopMultiple = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        Array.prototype.slice.call(arguments).forEach(function (key) {
            _this.stop(key);
        });
    };
    StateMachine.prototype.stop = function (key, args) {
        var state = this.states[key];
        state.on = false;
        state.stop.call(state, args);
    };
    ;
    return StateMachine;
}());
exports.default = StateMachine;
//# sourceMappingURL=StateMachine.js.map

/***/ }),

/***/ "./gameObjects/Utils/TurnManager.js":
/*!******************************************!*\
  !*** ./gameObjects/Utils/TurnManager.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var TurnManager = (function () {
    function TurnManager(followObject) {
        this.targetAngle = 0;
        this.turning = false;
        this.followObject = followObject;
    }
    TurnManager.prototype.startTurning = function (angle, callback) {
        this.targetAngle = Phaser.Math.Wrap(angle, -180, 180);
        this.callback = callback || function () { };
        this.turning = true;
    };
    TurnManager.prototype.isTurning = function () {
        return this.turning;
    };
    TurnManager.prototype.update = function () {
        if (!this.turning) {
            return;
        }
        var followObject = this.followObject;
        var angleDiff = Phaser.Math.Wrap(this.targetAngle - followObject.angle, 0, 360);
        if (Math.abs(angleDiff) <= followObject.angleVel || followObject.angle === this.targetAngle) {
            followObject.angle = this.targetAngle;
            followObject.turnDir = "";
            this.turning = false;
            this.callback();
            return;
        }
        followObject.turnDir = (angleDiff > 180) ? "left" : "right";
    };
    return TurnManager;
}());
exports.default = TurnManager;
//# sourceMappingURL=TurnManager.js.map

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
        _this.setVisible(false);
        return _this;
    }
    Water.prototype.onOverlap = function (object) {
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
        _this.getType = function () {
            return "Projectile";
        };
        _this.compareX = 0;
        _this.compareY = 0;
        _this.fading = false;
        _this.range = 500;
        _this.rangeSquared = 0;
        _this.startFadeSquared = 0;
        _this.shootAngle = shootAngle;
        _this.speed = 12;
        _this.rangeSquared = _this.range * _this.range;
        var diff = _this.range - 100;
        _this.startFadeSquared = diff * diff;
        _this.setDepth(0);
        _this.killTimer = timer_1.default(true, life, function () {
            _this.kill();
        });
        _this.setOnCollide(function (colData) {
            if (colData.bodyA.gameObject) {
                var hit = onCollide.call(onCollideContext, colData.bodyA.gameObject);
                if (hit) {
                    _this.kill();
                    colData.bodyA.gameObject.onCollide(_this);
                }
            }
        });
        return _this;
    }
    Bullet.prototype.setComparePosition = function (x, y) {
        this.compareX = x;
        this.compareY = y;
    };
    Bullet.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        this.killTimer.update();
        this.x += trig_1.default.cos(this.shootAngle) * this.speed;
        this.y += trig_1.default.sin(this.shootAngle) * this.speed;
        if (this.compareX !== 0 && this.compareY !== 0) {
            var dx = this.x - this.compareX;
            var dy = this.y - this.compareY;
            var diffSquared = dx * dx + dy * dy;
            if (diffSquared > this.startFadeSquared) {
                this.fading = true;
            }
            if (this.fading) {
                this.alpha *= 0.7;
            }
            if (this.alpha < 0.001 && diffSquared > this.rangeSquared) {
                this.destroy();
                this.kill();
            }
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
var timer_1 = __webpack_require__(/*! ../Utils/timer */ "./gameObjects/Utils/timer.js");
var SpaceGameObject_1 = __webpack_require__(/*! ./SpaceGameObject */ "./gameObjects/space/SpaceGameObject.js");
var Crest = (function (_super) {
    __extends(Crest, _super);
    function Crest(scene, x, y, texture) {
        var _this = _super.call(this, scene, x, y, texture) || this;
        _this.startBlinkingTime = 10000;
        _this.blinkInterval = 30;
        _this.despawnAfterBlinkingTime = 4500;
        _this.isBlinking = false;
        _this.amt = 1;
        _this.setAngle(Phaser.Math.RND.between(0, 180));
        _this.setCollisionGroup(2);
        _this.setCollidesWith(0);
        _this.despawnTimer = timer_1.default(true, _this.startBlinkingTime, function () {
            _this.startBlinking();
        });
        _this.setOnCollide(function (colData) {
            if (colData.bodyA.gameObject && colData.bodyA.gameObject._arrayName === "playerShip") {
                var playerShip = colData.bodyA.gameObject;
                _this.onCollide(playerShip);
            }
        });
        return _this;
    }
    Crest.prototype.startBlinking = function () {
        var _this = this;
        if (this.isBlinking) {
            return;
        }
        this.isBlinking = true;
        this.blinkTimer = timer_1.default(true, this.blinkInterval, function () {
            _this.setVisible(!_this.visible);
            _this.blinkTimer.reset(_this.blinkInterval);
        });
        this.despawnTimer = timer_1.default(true, this.despawnAfterBlinkingTime, function () {
            _this.destroy();
        });
    };
    Crest.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        this.despawnTimer.update();
        if (this.isBlinking) {
            this.blinkTimer.update();
        }
    };
    Crest.prototype.onCollide = function (playerShip) {
        playerShip.collectCrests(this);
        this.kill();
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
        _this.isMoving = true;
        _this.isShooting = false;
        _this.fovRadius = 400;
        _this.fovAngle = 60;
        _this.ignoreObjNames = [];
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
                return _this.isMoving;
            },
            slowDown: function () { return false; },
            shoot: function () {
                return _this.isShooting;
            }
        };
        _this.angleVel = 3;
        _this.fovLookDelay = 50;
        _this.lookTimer = timer_1.default(true, _this.fovLookDelay, function () {
            _this.fovLook();
            _this.lookTimer.reset(_this.fovLookDelay);
        });
        _this.fovSetup();
        return _this;
    }
    EnemyShip.prototype.isEnemyShip = function () { return true; };
    ;
    EnemyShip.prototype.setFovStats = function (fovRadius, fovAngle) {
        this.fovRadius = fovRadius;
        this.fovAngle = fovAngle;
        this.fovSetup();
    };
    EnemyShip.prototype.fovSetup = function () {
        this.halfFovAngle = this.fovAngle / 2;
        this.fovRadiusSquared = this.fovRadius * this.fovRadius;
    };
    EnemyShip.prototype.fovLook = function () {
        var objectsInCells = [];
        objectsInCells = this.scene.world.getObjectsInBox(this.x - this.fovRadius, this.y - this.fovRadius, this.x + this.fovRadius, this.y + this.fovRadius);
        this.visibleObjects.length = 0;
        this.canSeeSomething = false;
        for (var i = 0; i < objectsInCells.length; i++) {
            var object = objectsInCells[i];
            if (this.ignoreObjNames.indexOf(object._arrayName) !== -1) {
                continue;
            }
            var distanceSquared = Phaser.Math.Distance.BetweenPointsSquared(object, this);
            if (distanceSquared > this.fovRadiusSquared) {
                continue;
            }
            var angleBetween = Phaser.Math.Angle.Reverse(Phaser.Math.Angle.BetweenPoints(object, this)) * Phaser.Math.RAD_TO_DEG;
            var angleDiff = Phaser.Math.Angle.ShortestBetween(this.angle - 90, angleBetween);
            if (Math.abs(angleDiff) < this.halfFovAngle) {
                this.canSeeSomething = true;
                this.visibleObjects.push({
                    gameObject: object,
                    _arrayName: object._arrayName,
                    angleDiff: angleDiff,
                    angleBetween: angleBetween,
                    distanceSquared: distanceSquared
                });
            }
        }
    };
    EnemyShip.prototype.debugFov = function (graphics) {
        graphics.lineStyle(10, 0x0FAB23);
        graphics.fillStyle(0xBB0012, 0.4);
        graphics.beginPath();
        graphics.arc(this.x, this.y, this.fovRadius, (this.angle - 90 - this.halfFovAngle) * Phaser.Math.DEG_TO_RAD, (this.angle - 90 + this.halfFovAngle) * Phaser.Math.DEG_TO_RAD);
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
var Bullet_1 = __webpack_require__(/*! ./Bullet */ "./gameObjects/space/Bullet.js");
var TurnManager_1 = __webpack_require__(/*! ../Utils/TurnManager */ "./gameObjects/Utils/TurnManager.js");
var State_1 = __webpack_require__(/*! ../Utils/State */ "./gameObjects/Utils/State.js");
var HyperBeamerSType = (function (_super) {
    __extends(HyperBeamerSType, _super);
    function HyperBeamerSType(scene, x, y) {
        var _this_1 = _super.call(this, scene, x, y, "greenShip") || this;
        _this_1.setCollisionGroup(1);
        _this_1.setCollidesWith(0);
        _this_1.bullets = scene.world.get.gameObjectArray("hyperBeamerSTypeGreenBullet");
        if (!_this_1.bullets) {
            _this_1.bullets = scene.world.add.gameObjectArray(Bullet_1.default, "hyperBeamerSTypeGreenBullet");
        }
        _this_1.ignoreObjNames = ["hyperBeamerSTypeGreenBullet", "purpleNebula", "grayNebula"];
        _this_1.setDepth(1).setScale(2);
        scene.anims.create({
            key: "flying",
            frames: [{ key: "greenShip", frame: 0 }, { key: "greenShip", frame: 1 }],
            frameRate: 8,
            repeat: -1
        });
        _this_1.anims.play("flying");
        var _this = _this_1;
        _this_1.turnManager = new TurnManager_1.default(_this_1);
        _this_1.shootTimer = timer_1.default(true, 450, function () {
            if (_this_1.isShooting) {
                _this_1.shoot();
            }
            _this_1.shootTimer.reset();
        });
        var defaultMaxSpeed = _this_1.maxSpeed;
        var avoidLimits = {
            changeDir: 450,
            slowdown: 120,
            turnAround: 30,
            changeDirSquared: 0,
            slowdownSquared: 0,
            turnAroundSquared: 0,
            avoidAngleAmt: 50,
        };
        avoidLimits.changeDirSquared = avoidLimits.changeDir * avoidLimits.changeDir;
        avoidLimits.slowdownSquared = avoidLimits.slowdown * avoidLimits.slowdown;
        avoidLimits.turnAroundSquared = avoidLimits.turnAround * avoidLimits.turnAround;
        var WanderState = (function (_super) {
            __extends(WanderState, _super);
            function WanderState() {
                var _this_1 = _super !== null && _super.apply(this, arguments) || this;
                _this_1.turningTowardsTarget = false;
                return _this_1;
            }
            WanderState.prototype.randomInt = function (min, max) {
                return Phaser.Math.RND.between(min, max);
            };
            WanderState.prototype.getNextTurnTime = function () {
                return this.randomInt(1000, 3000);
            };
            WanderState.prototype.getNextTurnAngle = function () {
                return Phaser.Math.RND.angle();
            };
            WanderState.prototype.start = function () {
                var _this_1 = this;
                this.subState = "wander";
                _this.isShooting = false;
                this.wanderTurnTimer = timer_1.default(true, this.getNextTurnTime(), function () {
                    _this.turnManager.startTurning(_this_1.getNextTurnAngle(), function () { return _this_1.wanderTurnTimer.reset(_this_1.getNextTurnTime()); });
                });
                this.lookTimer = timer_1.default(true, 300, function () {
                    _this_1.look();
                    _this_1.lookTimer.reset(300);
                });
            };
            WanderState.prototype.update = function () {
                this.runSubStates();
            };
            WanderState.prototype.setSubState = function (state) {
                if (this.subState !== state) {
                    this.lastSubState = this.subState;
                    this.subState = state;
                }
            };
            WanderState.prototype.look = function () {
                var _this_1 = this;
                for (var i = 0; i < _this.visibleObjects.length; i++) {
                    var _a = _this.visibleObjects[i], _arrayName = _a._arrayName, distanceSquared = _a.distanceSquared, angleDiff = _a.angleDiff, angleBetween = _a.angleBetween;
                    switch (true) {
                        case _arrayName === _this._arrayName:
                        case _this.getType() === "projectile":
                            this.subState = "redirect";
                            if (distanceSquared > avoidLimits.changeDirSquared) {
                                break;
                            }
                            var redirectAngle = _this.angle + avoidLimits.avoidAngleAmt * (angleDiff < 0 ? 1 : -1);
                            if (distanceSquared < avoidLimits.slowdownSquared) {
                                _this.maxSpeed = 2.5;
                            }
                            _this.turnManager.startTurning(redirectAngle, function () {
                                _this_1.subState = "wander";
                                _this.maxSpeed = defaultMaxSpeed;
                                _this_1.wanderTurnTimer.reset(_this_1.getNextTurnTime());
                            });
                            return;
                    }
                }
            };
            WanderState.prototype.offense = function () {
                var _this_1 = this;
                var canSeeEnemy = false;
                for (var i = 0; i < _this.visibleObjects.length; i++) {
                    var _a = _this.visibleObjects[i], _arrayName = _a._arrayName, distanceSquared = _a.distanceSquared, angleDiff = _a.angleDiff, angleBetween = _a.angleBetween;
                    switch (true) {
                        case _arrayName === "playerShip":
                            if (this.subState === "wander") {
                                this.subState = "attack";
                                _this.isShooting = true;
                                canSeeEnemy = true;
                                if (!this.turningTowardsTarget) {
                                    var redirectAngle = _this.angle + angleDiff * 0.2;
                                    this.turningTowardsTarget = true;
                                    _this.turnManager.startTurning(redirectAngle, function () {
                                        _this_1.turningTowardsTarget = false;
                                        _this.isShooting = false;
                                    });
                                }
                            }
                            break;
                    }
                }
                if (!canSeeEnemy) {
                    this.subState = "wander";
                    _this.isShooting = false;
                    this.turningTowardsTarget = false;
                }
            };
            WanderState.prototype.runSubStates = function () {
                switch (this.subState) {
                    case "wander":
                        this.wanderTurnTimer.update();
                        this.lookTimer.update();
                        break;
                    case "redirect":
                        break;
                    case "attack":
                        this.lookTimer.update();
                        break;
                    case "loopAround":
                        this.lookTimer.update();
                        break;
                    case "evade":
                        break;
                }
                this.offense();
            };
            WanderState.prototype.stop = function () {
            };
            return WanderState;
        }(State_1.default));
        _this_1.sm = new StateMachine_1.default({
            "wander": new WanderState()
        });
        _this_1.sm.start("wander");
        _this_1.setAngle(Phaser.Math.RND.angle());
        _this_1.setFovStats(500, 70);
        _this_1.isMoving = true;
        _this_1.isShooting = false;
        return _this_1;
    }
    HyperBeamerSType.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        this.sm.emit("update", []);
        this.turnManager.update();
        this.shootTimer.update();
    };
    HyperBeamerSType.prototype.onCollide = function (object) {
        if (object._arrayName === "HyperBeamerSTypeBullet") {
            return;
        }
    };
    HyperBeamerSType.prototype.shootBullet = function (theta, length, life) {
        theta += this.angle - 90;
        var bullet = this.bullets.add(this.scene, this.x + trig_1.default.cos(theta) * length, this.y + trig_1.default.sin(theta) * length, "lightningBlue", this.angle - 90, life || 2000, this.bulletOnCollide, this);
        bullet.setAngle(this.angle);
        bullet.setCollisionGroup(2);
        bullet.setCollidesWith(0);
    };
    HyperBeamerSType.prototype.shoot = function () {
        this.shootBullet(0, this.displayWidth / 2);
    };
    HyperBeamerSType.prototype.bulletOnCollide = function (gameObject) {
        if (gameObject._arrayName === "playerShip") {
            return gameObject.takeDamage(this);
        }
        return false;
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
        _this.speedAcl = 0.2;
        _this.speedDeacl = 0.0745;
        _this.manualSpeedDeacl = 0.15;
        _this.angleDeacl = 0.06;
        _this.destroyOnKill = false;
        _this.canShoot = true;
        _this.gamepadControls = {
            forward: false,
            slowdown: false,
        };
        _this.targetAngle = 0;
        _this.ignoreDestroy = true;
        _this.setCollisionGroup(2);
        _this.setCollidesWith(0);
        _this.useAngleAcl = true;
        _this.angleVel = 0;
        _this.keys = {
            turnLeft: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            turnRight: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            goForward: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            slowdown: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
        };
        if (!(_this.bullets = scene.world.get.gameObjectArray("playerShipBullet"))) {
            _this.bullets = scene.world.add.gameObjectArray(Bullet_1.default, "playerShipBullet");
            _this.bullets.define("ignoreDestroy", true);
        }
        var shootInterval = 200;
        _this.shootLimiterTimer = timer_1.default(true, shootInterval, function () {
            _this.canShoot = true;
            _this.shootLimiterTimer.reset();
        });
        _this.particles = scene.add.particles("helixShipParticle");
        _this.pEmitter = _this.particles.createEmitter({
            lifespan: 500,
            scale: { start: 1.5, end: 0 },
            rotate: 45,
            x: 0,
            y: 0,
            quantity: 1,
        });
        _this.pEmitter.setAlpha(function (p, k, t) {
            return 1 - t;
        });
        var BTNS = {
            B: 0,
            A: 1,
            Y: 2,
            X: 3,
            L: 4,
            R: 5,
            ZL: 6,
            ZR: 7,
        };
        if (scene.input.gamepad !== undefined &&
            scene.input.gamepad.total > 0 &&
            scene.input.gamepad.gamepads.length > 0) {
            _this.usingGamepad = true;
            _this.gamepad = scene.input.gamepad.gamepads[0];
        }
        scene.input.gamepad.on('connected', function (gamepad) {
            this.usingGamepad = true;
            this.gamepad = gamepad;
        });
        scene.input.gamepad.on('disconnected', function (gamepad) {
            this.usingGamepad = false;
            delete this.gamepad;
        });
        scene.input.gamepad.on('down', function (gamepad, button, value) {
            if (value !== 1) {
                return;
            }
            if (!_this.usingGamepad) {
                _this.gamepad = gamepad;
                _this.usingGamepad = true;
            }
            if (button.index === BTNS.ZL) {
                _this.gamepadControls.forward = true;
            }
            if (button.index === BTNS.B) {
                _this.gamepadControls.slowdown = true;
            }
        });
        scene.input.gamepad.on('up', function (gamepad, button, value) {
            if (value !== 0) {
                return;
            }
            if (button.index === BTNS.ZL) {
                _this.gamepadControls.forward = false;
            }
            if (button.index === BTNS.B) {
                _this.gamepadControls.slowdown = false;
            }
            if ((button.index === BTNS.A || button.index === BTNS.ZR) && _this.canShoot) {
                _this.shoot();
                _this.canShoot = false;
            }
        });
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
        _this.controls = {
            turnLeft: function () {
                return _this.keys.turnLeft.isDown;
            },
            turnRight: function () {
                return _this.keys.turnRight.isDown;
            },
            goForward: function () {
                return _this.keys.goForward.isDown || _this.gamepadControls.forward;
            },
            slowDown: function () {
                return _this.keys.slowdown.isDown || _this.gamepadControls.slowdown;
            },
            shoot: function () {
                return false;
            }
        };
        _this.targetAngle = _this.angle;
        return _this;
    }
    PlayerShip.prototype.resetStats = function () {
        this.resetKeys();
        this.killed = false;
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
        var bullet = this.bullets.add(this.scene, this.x + trig_1.default.cos(theta) * length, this.y + trig_1.default.sin(theta) * length, "lightningBlueLong", this.angle - 90, life || 3200, this.bulletOnCollide, this);
        bullet.speed = 16;
        bullet.setComparePosition(this.x, this.y);
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
    PlayerShip.prototype.updateGamepad = function () {
        if (!this.usingGamepad || this.gamepad === undefined) {
            return;
        }
        var gamepad = this.gamepad;
        var axisX = gamepad.leftStick.x;
        var axisY = gamepad.leftStick.y;
        if (axisX !== 0 || axisY !== 0) {
            this.targetAngle = Phaser.Math.Angle.Normalize(Math.atan2(axisY, axisX) + 90 * Phaser.Math.DEG_TO_RAD);
        }
        this.rotation = Phaser.Math.Angle.RotateTo(this.rotation, this.targetAngle, 0.09);
    };
    PlayerShip.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        this.updateGamepad();
        var length = this.displayHeight * 0.4;
        var refAngle = this.angle + 90;
        this.particles.x = this.x + trig_1.default.cos(refAngle) * length;
        this.particles.y = this.y + trig_1.default.sin(refAngle) * length;
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
        _this.getType = function () {
            return "Spacecraft";
        };
        _this.maxHp = 10;
        _this.hp = 10;
        _this.damage = 1;
        _this.isShip = true;
        _this.usingGamepad = false;
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
        if (!this.usingGamepad) {
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
        _this.getType = function () { return "spaceGameObject"; };
        _this.killed = false;
        _this.destroyOnKill = true;
        _this.destroyQueued = false;
        scene.add.existing(_this);
        scene.world.initGameObject(_this);
        scene.matter.world.remove(_this);
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
var timer_1 = __webpack_require__(/*! ../Utils/timer */ "./gameObjects/Utils/timer.js");
var SpaceGameObject_1 = __webpack_require__(/*! ./SpaceGameObject */ "./gameObjects/space/SpaceGameObject.js");
var XPStar = (function (_super) {
    __extends(XPStar, _super);
    function XPStar(scene, x, y, texture) {
        var _this = _super.call(this, scene, x, y, texture) || this;
        _this.startBlinkingTime = 10000;
        _this.blinkInterval = 30;
        _this.despawnAfterBlinkingTime = 4500;
        _this.isBlinking = false;
        _this.amt = 1;
        _this.setAngle(Phaser.Math.RND.between(0, 180));
        _this.setCollisionGroup(2);
        _this.setCollidesWith(0);
        _this.despawnTimer = timer_1.default(true, _this.startBlinkingTime, function () {
            _this.startBlinking();
        });
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
    XPStar.prototype.startBlinking = function () {
        var _this = this;
        if (this.isBlinking) {
            return;
        }
        this.isBlinking = true;
        this.blinkTimer = timer_1.default(true, this.blinkInterval, function () {
            _this.setVisible(!_this.visible);
            _this.blinkTimer.reset(_this.blinkInterval);
        });
        this.despawnTimer = timer_1.default(true, this.despawnAfterBlinkingTime, function () {
            _this.destroy();
        });
    };
    XPStar.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        this.despawnTimer.update();
        if (this.isBlinking) {
            this.blinkTimer.update();
        }
    };
    XPStar.prototype.onCollide = function (playerShip) {
        playerShip.collectXPStars(this);
        this.kill();
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

/***/ "./mapSystem/space/MapSystem.js":
/*!**************************************!*\
  !*** ./mapSystem/space/MapSystem.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var MapSystem = (function () {
    function MapSystem() {
    }
    MapSystem.prototype.createMap = function (scene, x, y, width, height) {
        this.world = scene.scene.get("space").world;
        this.staticRT = scene.add.renderTexture(x, y, width, height);
        this.rt = scene.add.renderTexture(x, y, width, height);
        var roundAmt = 40;
        var shape = scene.add.graphics();
        shape.fillStyle(0xFFFFFF);
        shape.beginPath();
        shape.fillRoundedRect(x, y, width, height, { tl: roundAmt, tr: 0, bl: 0, br: 0 });
        shape.setVisible(false);
        var mask = shape.createGeometryMask();
        this.staticRT.setMask(mask);
        this.rt.setMask(mask);
        var tint = 0x9CFFC1;
        this.staticRT.setTint(tint);
        this.rt.setTint(tint);
        var backGraphics = this.backGraphics = scene.add.graphics();
        backGraphics.fillStyle(0x000000);
        backGraphics.fillRoundedRect(x, y, width, height, { tl: roundAmt, tr: 0, bl: 0, br: 0 });
        backGraphics.setVisible(false);
        backGraphics.setMask(mask);
        backGraphics.setDepth(-1);
    };
    MapSystem.prototype.updateMap = function (zoom, cam, drawBackObjs) {
        var rt = this.rt;
        var camHalfWidth = cam.width * 0.5;
        var camHalfHeight = cam.height * 0.5;
        var visibleObjects = this.world.getObjectsInBox(cam.scrollX - camHalfWidth / zoom, cam.scrollY - camHalfWidth / zoom, cam.scrollX + camHalfHeight / zoom, cam.scrollY + camHalfHeight / zoom);
        this.rt.clear();
        var rf = (1 - 1 / zoom);
        rt.camera.setZoom(zoom);
        rt.camera.scrollX = cam.scrollX + (cam.width - rt.camera.width * rf) / 2 - rt.camera.width * 0.5 / zoom;
        rt.camera.scrollY = cam.scrollY + (cam.height - rt.camera.height * rf) / 2 - rt.camera.height * 0.5 / zoom;
        rt.beginDraw();
        for (var i = 0; i < visibleObjects.length; i++) {
            var obj = visibleObjects[i];
            rt.batchDraw(obj, obj.x, obj.y);
        }
        rt.endDraw();
        this.staticRT.clear();
        if (zoom < 0.125) {
            this.backGraphics.setVisible(true);
            return;
        }
        this.backGraphics.setVisible(false);
        this.staticRT.beginDraw();
        var starZoom = 4;
        drawBackObjs(this.staticRT, this.rt.camera, starZoom, rf * cam.width, rf * cam.height);
        this.staticRT.endDraw();
    };
    return MapSystem;
}());
exports.default = MapSystem;
//# sourceMappingURL=MapSystem.js.map

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
        groundLayer.forEachTile(function (tile) {
            if (tile.index > 80 && tile.index < 115) {
                tile.alpha = 0.8;
                water.add(new Water_1.default(_this, tile.pixelX, tile.pixelY));
            }
        });
        this.physics.add.overlap(this.player, water, function (player, water) {
            player.onOverlap(water);
            water.onOverlap(player);
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
        var BTNS = {
            DPU: 12,
            DPD: 13
        };
        this.gamepadControls = {
            zoomingIn: false,
            zoomingOut: false
        };
        this.spaceScene.input.gamepad.on('down', function (gamepad, button, value) {
            if (value !== 1) {
                return;
            }
            if (button.index === BTNS.DPU) {
                _this.gamepadControls.zoomingIn = true;
                _this.gamepadControls.zoomingOut = false;
            }
            if (button.index === BTNS.DPD) {
                _this.gamepadControls.zoomingOut = true;
                _this.gamepadControls.zoomingIn = false;
            }
        });
        this.spaceScene.input.gamepad.on('up', function (gamepad, button, value) {
            if (value !== 0) {
                return;
            }
            if (button.index === BTNS.DPU) {
                _this.gamepadControls.zoomingIn = false;
            }
            if (button.index === BTNS.DPD) {
                _this.gamepadControls.zoomingOut = false;
            }
        });
        this.input.on('wheel', function (pointer, currentlyOver, dx, dy, dz) {
            var cam = _this.cameras.main;
            _this.updateZoom(Math.min(Math.max(cam.zoom - dy * 0.001, 0.005), 2.5));
        });
        this.keys = {
            rotateLeft: this.input.keyboard.addKey('a'),
            rotateRight: this.input.keyboard.addKey('d'),
            rotateReset: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO)
        };
        this.camAngle = 0;
        this.angleSpeed = 2;
        this.updateZoom(0.5);
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
    SpaceCameraControllerScene.prototype.updateGamepadZoom = function () {
        var cam = this.cameras.main;
        if (this.gamepadControls.zoomingIn) {
            this.updateZoom(Math.min(Math.max(cam.zoom + 0.01, 0.005), 2.5));
        }
        else if (this.gamepadControls.zoomingOut) {
            this.updateZoom(Math.min(Math.max(cam.zoom - 0.01, 0.005), 2.5));
        }
    };
    SpaceCameraControllerScene.prototype.update = function () {
        this.updateGamepadZoom();
        var cam = this.cameras.main;
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
        var world = this.spaceScene.world;
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
        var spaceScene = this.scene.get("space");
        this.cellGraphics.clear();
        this.cellGraphics.lineStyle(6, 0x549431, 1.0);
        spaceScene.world.UIDebugGrid(this.cellGraphics);
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

/***/ "./scenes/space/SpaceGrid.js":
/*!***********************************!*\
  !*** ./scenes/space/SpaceGrid.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var SpaceGrid = (function () {
    function SpaceGrid(systems, config) {
        this.scrollX = -1;
        this.scrollY = -1;
        this.lastScrollX = -1;
        this.lastScrollY = -1;
        this.sleeping = false;
        this.sleepingEnabled = true;
        this.systems = systems;
        this.config = config;
        this.seed = config.seed;
        this.world = new CartesianSystem.World(this.config);
    }
    SpaceGrid.prototype.buildSpace = function (newConfig) {
        if (newConfig !== undefined) {
            this.config = newConfig;
        }
        Phaser.Math.RND.init([this.seed.toString()]);
        var world = this.world;
        var bounds = this.world.bounds;
        this.systems.cameras.main.setBounds(bounds.minX, bounds.minY, bounds.maxX - bounds.minX, bounds.maxY - bounds.minY);
        this.add = {
            gameObjectArray: function (object, arrayName) {
                return world.add.array(object, arrayName);
            }
        };
        this.get = {
            gameObjectArray: function (arrayName) {
                return world.get.array(arrayName);
            },
            gameObject: function (arrayName, id) {
                return world.get.array(arrayName)[id];
            }
        };
        this.remove = {
            gameObjectArray: function (arrayName) {
                return world.remove.array(arrayName);
            }
        };
        this.camera = {
            setWindow: function (x, y, width, height) {
                world.camera.setWindow(x, y, width, height);
            }
        };
    };
    SpaceGrid.prototype.updateScroll = function (x, y) {
        this.scrollX = x;
        this.scrollY = y;
    };
    SpaceGrid.prototype.updateSpace = function () {
        var world = this.world;
        world.camera.updateScroll(this.scrollX, this.scrollY, world.bounds);
        world.resetProcessList();
        world.updateProcessList();
        this.integrate(this.systems);
    };
    SpaceGrid.prototype.integrate = function (sys) {
        sys.displayList.removeAll();
        sys.updateList.removeAll();
        sys.updateList.update();
        var matter = this.systems.scene.matter;
        matter.world.remove(matter.world.getAllBodies());
        this.world.loopProcessList(function (object) {
            sys.displayList.add(object);
            sys.updateList.add(object);
            matter.world.add(object.body);
        });
        var checkDestroy = function (gameObject) {
            if (gameObject.destroyQueued) {
                gameObject.destroy();
                gameObject.destroyQueued = false;
            }
        };
        sys.displayList.list.forEach(checkDestroy);
        sys.updateList.getActive().forEach(checkDestroy);
        sys.displayList.queueDepthSort();
    };
    SpaceGrid.prototype.initGameObject = function (gameObject) {
        var world = this.world;
        var worldGameObjects = world.gameObjectHandler.gameObjects;
        gameObject.bodyConf = {
            moves: true,
            boundingBox: {},
            update: function () { },
            destroy: function () { },
            updateBoundingBox: function () { },
        };
        gameObject.bodyConf.updateBoundingBox = function () {
            this.boundingBox.minX = gameObject.x - gameObject.displayWidth / 2;
            this.boundingBox.minY = gameObject.y - gameObject.displayHeight / 2;
            this.boundingBox.maxX = gameObject.x + gameObject.displayWidth / 2;
            this.boundingBox.maxY = gameObject.y + gameObject.displayHeight / 2;
        };
        gameObject.bodyConf.updateBoundingBox();
        gameObject.bodyConf.update = function () {
            gameObject.bodyConf.updateBoundingBox();
            world.cameraGrid.removeReference(gameObject);
            world.cameraGrid.addReference(gameObject);
        };
        gameObject.bodyConf.destroy = function () {
            gameObject.bodyConf.updateBoundingBox();
            world.cameraGrid.removeReference(gameObject);
        };
        if (!gameObject.body) {
            gameObject.body = {};
        }
        gameObject.on("destroy", function () {
            gameObject.bodyConf.destroy();
            worldGameObjects[worldGameObjects.references[this._arrayName]].remove(this._id);
        });
    };
    SpaceGrid.prototype.clearSpace = function () {
        var world = this.world;
        world.cameraGrid.reset();
        var gameObjects = world.gameObjectHandler.gameObjects;
        for (var i in gameObjects) {
            for (var j in gameObjects[i]) {
                if (gameObjects[i][j].ignoreDestroy) {
                    gameObjects[i][j].destroyQueued = false;
                    continue;
                }
                gameObjects[i][j].destroy();
            }
            if (!gameObjects[i].ignoreDestroy) {
                gameObjects.removeObject(gameObjects[i]._name);
            }
        }
        Phaser.Math.RND.init([this.seed.toString()]);
    };
    SpaceGrid.prototype.resetSpace = function () {
        this.clearSpace();
        this.buildSpace();
    };
    SpaceGrid.prototype.getObjectsInBox = function (minX, minY, maxX, maxY) {
        var world = this.world;
        var cameraGrid = world.cameraGrid;
        var gameObjects = world.gameObjectHandler.gameObjects;
        var minCoordinate = cameraGrid.getCoordinates(minX | 0, minY | 0);
        var maxCoordinate = cameraGrid.getCoordinates(maxX | 0, maxY | 0);
        var objectsInCells = [];
        cameraGrid.loopThroughCells(minCoordinate.col, minCoordinate.row, maxCoordinate.col, maxCoordinate.row, function (cell, col, row) {
            var i, object;
            for (i in cell) {
                object = gameObjects[gameObjects.references[cell[i].arrayName]][cell[i].id];
                if (object !== undefined) {
                    objectsInCells.push(object);
                }
            }
        });
        return objectsInCells;
    };
    SpaceGrid.prototype.logWorld = function () {
        console.log(this.world.gameObjectHandler);
    };
    SpaceGrid.prototype.UIDebugGrid = function (graphics) {
        var cellWidth = this.world.cameraGrid.cellWidth;
        var cellHeight = this.world.cameraGrid.cellHeight;
        this.world.loopThroughVisibleCells(function (cell, col, row) {
            graphics.strokeRect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
        });
    };
    SpaceGrid.prototype.getCellInfoText = function (x, y) {
        var world = this.world;
        var coordinates = world.cameraGrid.getCoordinates(x, y);
        var cell = world.cameraGrid.grid[coordinates.col][coordinates.row];
        var cellText = "";
        for (var i in cell) {
            cellText += i + "\n";
        }
        return {
            cellText: cellText,
            cellCoordinateText: "(" + coordinates.col + ", " + coordinates.row + ")"
        };
    };
    return SpaceGrid;
}());
exports.default = SpaceGrid;
//# sourceMappingURL=SpaceGrid.js.map

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
var SpaceLogicScene = (function (_super) {
    __extends(SpaceLogicScene, _super);
    function SpaceLogicScene() {
        return _super.call(this, "spaceLogic") || this;
    }
    SpaceLogicScene.prototype.addObjectsToSpace = function () {
        this.spaceScene = this.scene.get("space");
        var RND = Phaser.Math.RND;
        var world = this.spaceScene.world;
        var nebulae = world.add.gameObjectArray(Nebula_1.default, "nebula");
        var gridConfig = this.spaceScene.cspConfig.grid;
        var placeWidth = gridConfig.cols * gridConfig.cellWidth;
        var placeHeight = gridConfig.rows * gridConfig.cellHeight;
        var nebulaeAmt = Math.floor((placeWidth * placeHeight) / 10000000);
        for (var i = 0; i < 300; i++) {
            nebulae.add(this.spaceScene, 69000 + 13000 * RND.frac(), 60500 + 13000 * RND.frac(), "purpleNebula");
        }
        var planets = world.add.gameObjectArray(Planet_1.default, "planet");
        planets.add(this.spaceScene, 69000, 60000, "IcyDwarfPlanet");
        planets.add(this.spaceScene, 56000, 70000, "RedDustPlanet");
        world.add.gameObjectArray(XPStar_1.default, "xpStar");
        world.add.gameObjectArray(Crest_1.default, "crest");
        var shrapnels = world.add.gameObjectArray(Shrapnel_1.default, "shrapnel");
        var shrapnelClustAmt = Math.floor((placeWidth * placeHeight) / 100000000);
        for (var i = 0; i < shrapnelClustAmt; i++) {
            var shrapnelClusterX = RND.integerInRange(500, placeWidth - 500);
            var shrapnelClusterY = RND.integerInRange(500, placeHeight - 500);
            for (var j = 0; j < RND.integerInRange(4, 6); j++) {
                shrapnels.add(this.spaceScene, shrapnelClusterX + RND.integerInRange(-200, 200), shrapnelClusterY + RND.integerInRange(-200, 200), "shrapnel" + Math.floor(RND.integerInRange(1, 5)));
            }
        }
        shrapnels.add(this.spaceScene, 69000, 62000, "shrapnel1");
        shrapnels.add(this.spaceScene, 69000, 62200, "shrapnel2");
        shrapnels.add(this.spaceScene, 69130, 62200, "shrapnel3");
        shrapnels.add(this.spaceScene, 69170, 62100, "shrapnel4");
        shrapnels.add(this.spaceScene, 69190, 62000, "shrapnel3");
        if (!world.get.gameObjectArray("playerShip")) {
            var playerShips = world.add.gameObjectArray(PlayerShip_1.default, "playerShip");
            playerShips.define("ignoreDestroy", true);
            this.playerShip = playerShips.add(this.spaceScene, 69400, 60376);
        }
        else {
            this.playerShip.resetStats();
            this.playerShip.x = 69404;
            this.playerShip.y = 60376;
            this.playerShip.bodyConf.update();
            this.playerShip.setDepth(8);
            this.playerShip.particles.setDepth(20);
        }
        var hyperBeamerSTypes = world.add.gameObjectArray(HyperBeamerSType_1.default, "hyperBeamerSType");
        hyperBeamerSTypes.add(this.spaceScene, 69400, 60000 + 500);
        hyperBeamerSTypes.add(this.spaceScene, 69200, 60000 + 500).setAngle(180);
        hyperBeamerSTypes.add(this.spaceScene, 69200, 60000 + 500 + 80).setAngle(0);
        for (var i = 0; i < 100; i++) {
            hyperBeamerSTypes.add(this.spaceScene, 69200 + RND.integerInRange(-7000, 7000), 61000 + RND.integerInRange(-7000, 7000));
        }
        for (var i = 0; i < 3000; i++) {
            hyperBeamerSTypes.add(this.spaceScene, 69200 + RND.integerInRange(-12000, 12000), 60600 + RND.integerInRange(-12000, 12000));
        }
    };
    SpaceLogicScene.prototype.addXPStar = function (x, y) {
        var xpStars = this.spaceScene.world.get.gameObjectArray("xpStar");
        xpStars.add(this.spaceScene, x + Phaser.Math.RND.between(-50, 50), y + Phaser.Math.RND.between(-50, 50), "xpStar");
    };
    SpaceLogicScene.prototype.addSmallXPStar = function (x, y) {
        var smallXPStars = this.spaceScene.world.get.gameObjectArray("xpStar");
        smallXPStars.add(this.spaceScene, x + Phaser.Math.RND.between(-50, 50), y + Phaser.Math.RND.between(-50, 50), "smallXPStar");
    };
    SpaceLogicScene.prototype.addCrests = function (x, y) {
        var crests = this.spaceScene.world.get.gameObjectArray("crest");
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

/***/ "./scenes/space/SpaceMapScene.js":
/*!***************************************!*\
  !*** ./scenes/space/SpaceMapScene.js ***!
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
var MapSystem_1 = __webpack_require__(/*! ../../mapSystem/space/MapSystem */ "./mapSystem/space/MapSystem.js");
var SpaceMapScene = (function (_super) {
    __extends(SpaceMapScene, _super);
    function SpaceMapScene() {
        return _super.call(this, "spaceMap") || this;
    }
    SpaceMapScene.prototype.preload = function () {
    };
    SpaceMapScene.prototype.create = function () {
        this.starScene = this.scene.get("starSceneController");
        this.spaceSceneCam = this.scene.get("space").cameras.main;
        this.map = new MapSystem_1.default();
        var mapWidth = 250 * 1.2;
        var mapHeight = 150 * 1.0;
        this.map.createMap(this, this.spaceSceneCam.width - mapWidth, this.spaceSceneCam.height - mapHeight, mapWidth, mapHeight);
    };
    SpaceMapScene.prototype.update = function () {
        if (!this.scene.isActive("starSceneController")) {
            return;
        }
        var starScene = this.starScene;
        this.map.updateMap(0.1, this.spaceSceneCam, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            starScene.updateToRenderTexture.apply(starScene, args);
        });
    };
    return SpaceMapScene;
}(Phaser.Scene));
exports.default = SpaceMapScene;
//# sourceMappingURL=SpaceMapScene.js.map

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
var SpaceGrid_1 = __webpack_require__(/*! ./SpaceGrid */ "./scenes/space/SpaceGrid.js");
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
        return _this;
    }
    SpaceScene.prototype.preload = function () {
        this.load.image("helixShip", "./assets/Space/Ships/helixShip.png");
        this.load.image("helixShipParticle", "./assets/Space/Ships/helixShipParticle.png");
        this.load.image("helixShipLvl1Bullet", "./assets/Space/Bullets/helixShipLvl1Bullet.png");
        this.load.json("helixShipShape", "./assets/Space/Ships/helixShipShape.json");
        this.load.image("hyperBeamerSTypeGreen", "./assets/Space/Ships/hyperBeamerSTypeGreen.png");
        this.load.image("hyperBeamerSTypeGreenParticle", "./assets/Space/Ships/hyperBeamerSTypeGreenParticle.png");
        this.load.spritesheet("greenShip", "./assets/Space/Ships/GreenShip1.png", { frameWidth: 24, frameHeight: 24 });
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
            },
            seed: this.game.config.seed
        };
        this.world = new SpaceGrid_1.default(this.sys, this.cspConfig);
        this.world.buildSpace();
        this.scene.get("spaceLogic").addObjectsToSpace();
        this.runScenes(false);
        this.prepareStatsGraphics();
        this.generateBulletsTextures();
        this.cameras.main.startFollow(this.scene.get("spaceLogic").playerShip);
        this.loaded = true;
    };
    SpaceScene.prototype.generateBulletsTextures = function () {
        this.generateBullet("lightningBlue", 2, 16, 0x3CD3F8);
        this.generateBullet("lightningBlueLong", 2, 24, 0x3CD3F8);
    };
    SpaceScene.prototype.generateBullet = function (key, width, length, color) {
        var rt = this.add.renderTexture(0, 0, width, length);
        var graphics = this.add.graphics();
        graphics.fillStyle(color);
        graphics.fillRect(0, 0, width, length);
        rt.draw(graphics);
        graphics.setVisible(false);
        graphics.destroy();
        rt.saveTexture(key);
        rt.setVisible(false);
    };
    SpaceScene.prototype.handleGameOver = function () {
        this.reloadSpace();
    };
    SpaceScene.prototype.reloadSpace = function () {
        this.world.resetSpace();
        this.scene.get("spaceLogic").addObjectsToSpace();
        this.cameras.main.startFollow(this.scene.get("spaceLogic").playerShip);
    };
    SpaceScene.prototype.prepareStatsGraphics = function () {
        this.statsGraphics = this.add.graphics().setDepth(4);
    };
    SpaceScene.prototype.runScenes = function (calledByEntryScene) {
        this.runDebugScenes();
        this.scene.run("spaceLogic");
        this.scene.run("spaceCameraController");
        this.scene.run("starSceneController");
        this.scene.run("spaceUI");
        this.scene.run("spaceMap");
        this.scene.bringToTop("spaceMap");
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
    };
    SpaceScene.prototype.sleepDebugScenes = function () {
        this.scene.sleep("spaceDebug");
        this.scene.sleep("spaceUIDebug");
    };
    SpaceScene.prototype.sleepScenes = function (calledByEntryScene) {
        this.scene.moveBelow("spaceUI");
        this.scene.sleep("spaceUI");
        this.scene.sleep("starSceneController");
        this.scene.sleep("spaceCameraController");
        this.scene.sleep("spaceMap");
        this.scene.sleep("spaceLogic");
        this.sleepDebugScenes();
    };
    SpaceScene.prototype.stopScenes = function () {
        this.scene.stop("spaceUIDebug");
        this.scene.stop("spaceDebug");
        this.scene.stop("spaceUI");
        this.scene.stop("starSceneController");
        this.scene.stop("spaceCameraController");
        this.scene.stop("spaceMap");
        this.scene.stop("spaceLogic");
    };
    SpaceScene.prototype.switchToPlanetSceneGroup = function (levelInfo) {
        var entryScene = this.scene.get("entry");
        entryScene.switchSceneGroup("planet", function (fromScene, nextScene) {
            nextScene.receiveInfo(levelInfo);
        });
    };
    SpaceScene.prototype.update = function (time, delta) {
        var _this = this;
        var cam = this.cameras.main;
        this.world.updateScroll(cam.scrollX + cam.width * 0.5, cam.scrollY + cam.height * 0.5);
        this.world.updateSpace();
        this.sys.displayList.list.forEach(function (gameObject) {
            if (gameObject.particles !== undefined) {
                _this.sys.displayList.add(gameObject.particles);
            }
        });
        this.updateStatsGraphics();
        if (this.stepMatter++ >= 2) {
            this.matter.step(1000 / 30, 0);
            this.stepMatter = 0;
        }
    };
    SpaceScene.prototype.updateStatsGraphics = function () {
        var _this = this;
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
        this.sys.displayList.add(this.statsGraphics);
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
        var cam = this.spaceScene.cameras.main;
        this.shipPositionText.setText("(" + cam.worldView.centerX.toFixed(2) + ", " + cam.worldView.centerY.toFixed(2) + ")");
        this.peekCell();
    };
    SpaceUIDebugScene.prototype.peekCell = function () {
        this.input.activePointer.updateWorldPoint(this.spaceScene.cameras.main);
        var _a = this.spaceScene.world.getCellInfoText(this.input.activePointer.worldX, this.input.activePointer.worldY), cellCoordinateText = _a.cellCoordinateText, cellText = _a.cellText;
        this.cellCoorText.setText(cellCoordinateText);
        this.cellText.setText(cellText);
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
            var xpBarLength = 74.4;
            statsXpBar.y = statsY + xpBarLength - (xp * xpBarLength / maxXp);
        };
    };
    SpaceUIScene.prototype.update = function (time, delta) {
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
        this.starLayers = new Array();
        this.scrollValues = [0.65, 0.9, 1];
        var layerAmt = this.scrollValues.length;
        for (var i = 1; i <= layerAmt; i++) {
            var tileSprite = this.add.tileSprite(cam.width / 2, cam.height / 2, cam.width * 2, cam.height * 2, "starBackground" + i).setDepth(i - layerAmt);
            tileSprite.setOrigin(0.5);
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
    StarSceneControllerScene.prototype.updateToRenderTexture = function (rt, cam, starZoom, relativeWidth, relativeHeight) {
        var starLayers = this.starLayers;
        var scrollValues = this.scrollValues;
        var zoom = cam.zoom * starZoom;
        for (var i = 0; i < starLayers.length; i++) {
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
var SpaceMapScene_1 = __webpack_require__(/*! ./scenes/space/SpaceMapScene */ "./scenes/space/SpaceMapScene.js");
var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 450,
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        autoRound: true
    },
    input: {
        gamepad: true
    },
    pixelArt: true,
    disableContextMenu: true,
    antialiasGL: false,
    antialias: false,
    batchSize: 128,
    scene: [
        EntryScene_1.default,
        SpaceScene_1.default, SpaceCameraControllerScene_1.default, SpaceDebugScene_1.default,
        SpaceUIDebugScene_1.default, StarSceneControllerScene_1.default, SpaceLogicScene_1.default, SpaceUIScene_1.default, SpaceEffectsScene_1.default, SpaceMapScene_1.default,
        PlanetScene_1.default, PlanetBackScene_1.default, PlanetLogicScene_1.default, PlanetLoaderScene_1.default, PlanetUIScene_1.default, PlanetEffectsScene_1.default
    ],
    seed: "testing"
};
var game = new Phaser.Game(config);
window.game = game;
document.body.style.overflow = 'hidden';
//# sourceMappingURL=index.js.map
})();

PlanetSearch3 = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=PlanetSearch3.js.map