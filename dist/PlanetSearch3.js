var PlanetSearch3;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Saver/Traveler.js":
/*!***************************!*\
  !*** ./Saver/Traveler.js ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Traveler = (function () {
    function Traveler() {
        this.containsInfo = false;
    }
    Traveler.prototype.setInfo = function (data) {
        this.info = data;
        this.containsInfo = true;
    };
    Traveler.prototype.getInfo = function () {
        return this.info;
    };
    return Traveler;
}());
exports.default = Traveler;
//# sourceMappingURL=Traveler.js.map

/***/ }),

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

/***/ "./gameObjects/planet/Beaker.js":
/*!**************************************!*\
  !*** ./gameObjects/planet/Beaker.js ***!
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
var Beaker = (function (_super) {
    __extends(Beaker, _super);
    function Beaker(scene, x, y, texture, frame) {
        var _this = _super.call(this, scene, x, y, texture, frame) || this;
        _this.isOnSlope = false;
        _this.slopeWay = "";
        _this.maxHp = _this.hp = 2;
        _this.damage = 1;
        scene.add.existing(_this);
        scene.physics.add.existing(_this);
        _this.setCollideWorldBounds(true);
        _this.resetPhysics();
        _this.xDir = Phaser.Math.Between(0, 100) < 50 ? "left" : "right";
        _this.controls = {
            left: function () {
                return _this.xDir === "left";
            },
            right: function () {
                return _this.xDir === "right";
            },
            up: function () {
                return _this.yDir === "up";
            },
            down: function () {
                return false;
            },
            activate: function () {
                return false;
            }
        };
        return _this;
    }
    Beaker.prototype.takeDamage = function (object) {
        this.hp -= object.getDamage(this);
    };
    Beaker.prototype.resetPhysics = function () {
        return this.setDrag(30, 0).setMaxVelocity(50, 200);
    };
    Beaker.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        if (!this.wasOnSlope && !this.wasInLiquid && !this.slopeWay) {
            if (this.body.blocked.left || this.body.touching.left) {
                this.xDir = "right";
            }
            if (this.body.blocked.right || this.body.touching.right) {
                this.xDir = "left";
            }
        }
        this.slopeWay = "";
        if (this.wasInLiquid) {
            this.yDir = "up";
        }
        else {
            this.yDir = "";
        }
    };
    Beaker.prototype.onCollide = function (object) {
        if (object.name === "slope") {
            var slope = object;
            this.slopeWay = slope.way;
        }
        else if (object.texture.key === "Player") {
            var player = object;
            if (player.body.blocked.down && this.body.touching.up) {
                player.body.velocity.y -= player.enemyBounce;
                this.takeDamage(player);
            }
            else if ((player.body.touching.left || player.body.touching.right) && (this.body.touching.left || this.body.touching.right)) {
                player.takeDamage(this);
            }
        }
    };
    return Beaker;
}(Lifeform_1.default));
exports.default = Beaker;
//# sourceMappingURL=Beaker.js.map

/***/ }),

/***/ "./gameObjects/planet/Checkpoint.js":
/*!******************************************!*\
  !*** ./gameObjects/planet/Checkpoint.js ***!
  \******************************************/
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
var Checkpoint = (function (_super) {
    __extends(Checkpoint, _super);
    function Checkpoint(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "checkpoint", 0) || this;
        _this.setOrigin(0, 0);
        scene.physics.add.existing(_this);
        _this.setImmovable(true);
        _this.setGravity(0, 0);
        _this.setMaxVelocity(0, 0);
        return _this;
    }
    Checkpoint.prototype.onCollide = function (object) {
        if (object.texture.key === "Player") {
            var player = object;
            this.setFrame(1);
            player.onCheckpoint(this);
            this.scene.scene.get("planetLoader").setTravelerSaveInfo({
                playerStats: player.getStats()
            });
        }
    };
    return Checkpoint;
}(GameObject_1.default));
exports.default = Checkpoint;
//# sourceMappingURL=Checkpoint.js.map

/***/ }),

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
        return _this;
    }
    Door.prototype.setGoto = function (goto) {
        this.goto = goto;
    };
    Door.prototype.onCollide = function (player) {
        if (player.activate() && Math.abs(player.body.y - this.body.y) < 0.5 && Math.abs(player.body.velocity.y) < 0.05) {
            this.scene.scene.get("planetLoader").restart({
                loadType: "door",
                reason: "door",
                doorGoto: this.goto,
            });
        }
    };
    return Door;
}(Phaser.Physics.Arcade.Image));
exports.default = Door;
//# sourceMappingURL=Door.js.map

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
    function GameObject(scene, x, y, texture, frame) {
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

/***/ "./gameObjects/planet/GreenBeaker.js":
/*!*******************************************!*\
  !*** ./gameObjects/planet/GreenBeaker.js ***!
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
var Beaker_1 = __webpack_require__(/*! ./Beaker */ "./gameObjects/planet/Beaker.js");
var GreenBeaker = (function (_super) {
    __extends(GreenBeaker, _super);
    function GreenBeaker(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "GreenBeaker", 0) || this;
        _this.anims.create({
            key: "left",
            frames: [{ key: "GreenBeaker", frame: 0 }],
            frameRate: 20
        });
        _this.anims.create({
            key: "right",
            frames: [{ key: "GreenBeaker", frame: 1 }],
            frameRate: 20
        });
        _this.anims.create({
            key: "idle",
            frames: [{ key: "GreenBeaker", frame: 2 }],
            frameRate: 20
        });
        _this.anims.create({
            key: "leftSmall",
            frames: [{ key: "GreenBeaker", frame: 3 }],
            frameRate: 20
        });
        _this.anims.create({
            key: "rightSmall",
            frames: [{ key: "GreenBeaker", frame: 4 }],
            frameRate: 20
        });
        _this.anims.create({
            key: "idleSmall",
            frames: [{ key: "GreenBeaker", frame: 5 }],
            frameRate: 20
        });
        return _this;
    }
    GreenBeaker.prototype.preUpdate = function (time, delta) {
        _super.prototype.preUpdate.call(this, time, delta);
        if (this.hp < 2) {
            this.setScale(1, 0.5);
            this.displayHeight *= 2;
            if (this.controls.left()) {
                this.anims.play("leftSmall");
            }
            if (this.controls.right()) {
                this.anims.play("rightSmall");
            }
            if (!this.controls.left() && !this.controls.right()) {
                this.anims.play("idleSmall");
            }
        }
        else {
            if (this.controls.left()) {
                this.anims.play("left");
            }
            if (this.controls.right()) {
                this.anims.play("right");
            }
            if (!this.controls.left() && !this.controls.right()) {
                this.anims.play("idle");
            }
        }
    };
    return GreenBeaker;
}(Beaker_1.default));
exports.default = GreenBeaker;
//# sourceMappingURL=GreenBeaker.js.map

/***/ }),

/***/ "./gameObjects/planet/InvisiblePlatform.js":
/*!*************************************************!*\
  !*** ./gameObjects/planet/InvisiblePlatform.js ***!
  \*************************************************/
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
var InvisiblePlatform = (function (_super) {
    __extends(InvisiblePlatform, _super);
    function InvisiblePlatform(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "invisiblePlatform") || this;
        scene.physics.add.existing(_this);
        _this.setMaxVelocity(0, 0);
        _this.setOrigin(0, 0);
        _this.setScale(0.5, 0.5);
        _this.setVisible(false);
        return _this;
    }
    InvisiblePlatform.prototype.processCollision = function (object) {
        if (object.body.velocity.y > 0 && object.body.y + object.body.height <= this.body.y + object.body.deltaAbsY()) {
            object.body.y = this.body.y - object.body.height;
            object.body.velocity.y = 0;
            object.body.blocked.down = true;
        }
    };
    return InvisiblePlatform;
}(StaticGameObject_1.default));
exports.default = InvisiblePlatform;
//# sourceMappingURL=InvisiblePlatform.js.map

/***/ }),

/***/ "./gameObjects/planet/Lava.js":
/*!************************************!*\
  !*** ./gameObjects/planet/Lava.js ***!
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
var StaticGameObject_1 = __webpack_require__(/*! ./StaticGameObject */ "./gameObjects/planet/StaticGameObject.js");
var Lava = (function (_super) {
    __extends(Lava, _super);
    function Lava(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "lava") || this;
        _this.damage = 1;
        scene.physics.add.existing(_this);
        _this.setMaxVelocity(0, 0);
        _this.setOrigin(0, 0);
        _this.setScale(16 / _this.displayWidth, 16 / _this.displayHeight);
        _this.setVisible(false);
        return _this;
    }
    Lava.prototype.getDamage = function (object) {
        return this.damage;
    };
    Lava.prototype.onCollide = function (object) {
        object.takeDamage(this);
        object.inLiquid = true;
    };
    return Lava;
}(StaticGameObject_1.default));
exports.default = Lava;
//# sourceMappingURL=Lava.js.map

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
    Lifeform.prototype.onCollide = function (gameObject) {
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
            frames: [{ key: "Player", frame: 3 }, { key: "Player", frame: 4 }],
            frameRate: 5,
            repeat: -1
        });
        scene.anims.create({
            key: "right",
            frames: [{ key: "Player", frame: 1 }, { key: "Player", frame: 2 }],
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
            this.anims.play("left", true);
        }
        if (this.controls.right()) {
            this.anims.play("right", true);
        }
        if (!this.controls.left() && !this.controls.right()) {
            if (Math.abs(this.body.velocity.x) < 2) {
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
        if (this.controls.restart() || this.dead) {
            if (this.checkpointGoto !== undefined) {
                this.scene.scene.get("planetLoader").restart({
                    loadType: "checkpoint",
                    checkpointGoto: this.checkpointGoto,
                    reason: this.controls.restart() ? "restart" : "death",
                });
            }
            else {
                this.scene.scene.get("planetLoader").restart({
                    loadType: "start",
                    startGoto: {
                        level: this.startLevel
                    },
                    reason: this.controls.restart() ? "restart" : "death",
                });
            }
        }
    };
    Player.prototype.onCheckpoint = function (checkpoint) {
        this.checkpointGoto = checkpoint.goto;
    };
    Player.prototype.kill = function (reason) {
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

/***/ "./gameObjects/planet/Slope.js":
/*!*************************************!*\
  !*** ./gameObjects/planet/Slope.js ***!
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
var Slope = (function (_super) {
    __extends(Slope, _super);
    function Slope(scene, way, x, y) {
        var _this = _super.call(this, scene, x, y, "slope") || this;
        _this.way = way;
        _this.name = "slope";
        scene.physics.add.existing(_this);
        _this.setMaxVelocity(0, 0);
        _this.setImmovable(true);
        _this.setOrigin(0, 0);
        _this.setScale(16 / _this.displayWidth, 16 / _this.displayHeight);
        _this.setVisible(false);
        switch (_this.way) {
            case "leftUp":
                var offset = 0;
                var yOffset_1 = 0;
                _this.triangle = new Phaser.Geom.Triangle(_this.x - offset, _this.y - offset - yOffset_1, _this.x, _this.y + _this.displayHeight, _this.x + _this.displayWidth + offset, _this.y + _this.displayHeight + offset - yOffset_1);
                _this.processCollision = function (object) {
                    object.isOnSlope = false;
                    if (object.body.x <= this.body.x) {
                        object.isOnSlope = true;
                        object.body.y = this.body.y - object.body.height - yOffset_1;
                    }
                    if (this.intersects(object.getBounds())) {
                        var dx = object.body.x - this.body.x;
                        object.y = this.body.bottom + dx - object.body.halfHeight - this.body.height - yOffset_1;
                        object.body.blocked.down = true;
                        object.body.touching.down = true;
                        object.isOnSlope = true;
                        object.body.velocity.y = 0;
                    }
                };
                break;
            case "rightUp":
                _this.triangle = new Phaser.Geom.Triangle(_this.x, _this.y + _this.displayHeight, _this.x + _this.displayWidth, _this.y, _this.x + _this.displayWidth, _this.y + _this.displayHeight);
                _this.processCollision = function (object) {
                    object.isOnSlope = false;
                    if (object.body.right >= this.body.right) {
                        object.body.y = this.body.y - object.body.height;
                        object.isOnSlope = true;
                    }
                    if (this.intersects(object.getBounds())) {
                        var dx = this.body.x - object.body.x;
                        object.y = this.body.bottom + dx - object.body.halfHeight - this.body.height;
                        object.body.blocked.down = true;
                        object.body.touching.down = true;
                        object.isOnSlope = true;
                        object.body.velocity.y = 0;
                    }
                };
                break;
        }
        return _this;
    }
    Slope.prototype.processCollision = function (object) { };
    Slope.prototype.intersects = function (rect) {
        return Phaser.Geom.Intersects.RectangleToTriangle(rect, this.triangle);
    };
    return Slope;
}(StaticGameObject_1.default));
exports.default = Slope;
//# sourceMappingURL=Slope.js.map

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
var GameObject = (function (_super) {
    __extends(GameObject, _super);
    function GameObject(scene, x, y, texture, frame) {
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
}(Phaser.Physics.Arcade.Image));
exports.default = GameObject;
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
        _this.setScale(16 / _this.displayWidth, 16 / _this.displayHeight);
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
        return _super.call(this, "planetBack") || this;
    }
    PlanetBackScene.prototype.preload = function () {
        this.load.spritesheet("grassLand", "./assets/Planet/Backgrounds/GrassPlanet2/GrassLand.png", {
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
            2.3,
            1.6,
            0.8
        ];
        var layerAmt = 4;
        this.layers = [];
        this.nextLayers = [];
        for (var i = 0; i < layerAmt; i++) {
            var layer = this.add.image(0, 0, "grassLand", i);
            layer.setScrollFactor(0, 0).setDisplayOrigin(0, 0).setScale(2, 2);
            this.layers.push(layer);
            var nextLayer = this.add.image(0, 0, "grassLand", i);
            nextLayer.setScrollFactor(0, 0).setDisplayOrigin(0, 0).setScale(2, 2);
            this.nextLayers.push(nextLayer);
        }
    };
    PlanetBackScene.prototype.update = function () {
        var planetLogicScene = this.scene.get("planetLogic");
        var cam = planetLogicScene.cameras.main;
        var width = this.game.config.width;
        var diff = width - cam.scrollX;
        for (var i = 0; i < this.layers.length; i++) {
            if (this.layerSpeeds[i] === -1) {
                continue;
            }
            var layer = this.layers[i];
            var speed = diff / this.layerSpeeds[i];
            var index = -Math.floor((speed + width) / layer.displayWidth);
            layer.x = layer.displayWidth * index + speed;
            this.nextLayers[i].x = layer.displayWidth * (index + 1) + speed;
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
var Traveler_1 = __webpack_require__(/*! ../../Saver/Traveler */ "./Saver/Traveler.js");
var PlanetLoaderScene = (function (_super) {
    __extends(PlanetLoaderScene, _super);
    function PlanetLoaderScene() {
        var _this = _super.call(this, "planetLoader") || this;
        _this.traveler = new Traveler_1.default();
        return _this;
    }
    PlanetLoaderScene.prototype.setTravelerSaveInfo = function (info) {
        if (info !== undefined) {
            this.traveler.saveInfo = info;
        }
    };
    PlanetLoaderScene.prototype.loadPlayer = function (inputData, tilemap, doorGroup, checkpointGroup, currentLevel, defaultLevel) {
        var spawnPoint = tilemap.findObject("Objects", function (obj) {
            return obj.name === "Player Spawn Point";
        });
        if (!spawnPoint) {
            spawnPoint = {
                x: 0,
                y: 0
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
                                x: door.x,
                                y: door.y
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
        var _this = this;
        this.scene.pause("planetLogic");
        if (["restart", "death"].indexOf(inputData.reason) === -1) {
            this.traveler.setInfo({
                player: this.player.getCurrentState()
            });
        }
        var effectsScene = this.scene.get("planetEffects");
        effectsScene.fadeOut(500, 0, 0, 0);
        effectsScene.cameras.main.once("camerafadeoutcomplete", function () {
            _this.scene.run("planetLogic");
            var planetLogicScene = _this.scene.get("planetLogic");
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
        });
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
var Door_1 = __webpack_require__(/*! ../../gameObjects/planet/Door */ "./gameObjects/planet/Door.js");
var Lava_1 = __webpack_require__(/*! ../../gameObjects/planet/Lava */ "./gameObjects/planet/Lava.js");
var Slope_1 = __webpack_require__(/*! ../../gameObjects/planet/Slope */ "./gameObjects/planet/Slope.js");
var Water_1 = __webpack_require__(/*! ../../gameObjects/planet/Water */ "./gameObjects/planet/Water.js");
var BlockIndexes_1 = __webpack_require__(/*! ./BlockIndexes */ "./scenes/planet/BlockIndexes.js");
var InvisiblePlatform_1 = __webpack_require__(/*! ../../gameObjects/planet/InvisiblePlatform */ "./gameObjects/planet/InvisiblePlatform.js");
var GreenBeaker_1 = __webpack_require__(/*! ../../gameObjects/planet/GreenBeaker */ "./gameObjects/planet/GreenBeaker.js");
var Checkpoint_1 = __webpack_require__(/*! ../../gameObjects/planet/Checkpoint */ "./gameObjects/planet/Checkpoint.js");
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
            currentWorld: "GrassPlanet2",
            currentTileset: "GrassTileset2-extruded",
            currentLevel: "start"
        };
        this.presetData = {
            currentLevel: this.loadData.currentLevel
        };
    };
    PlanetLogicScene.prototype.preload = function () {
        this.load.spritesheet("checkpoint", "./assets/Planet/GameObjects/Interactibles/Checkpoint.png", { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("Player", "./assets/Planet/GameObjects/Player/Helix2.png", { frameWidth: 16, frameHeight: 32 });
        this.load.spritesheet("GreenBeaker", "./assets/Planet/GameObjects/Enemy/Beakers/GreenBeaker.png", { frameWidth: 16, frameHeight: 16 });
        var currentWorld = this.loadData.currentWorld;
        var currentTileset = this.loadData.currentTileset;
        var currentLevel = this.loadData.currentLevel;
        this.load.image(currentTileset, "./assets/Planet/levels/" + currentWorld + "/tilesets/" + currentTileset + ".png");
        this.load.tilemapTiledJSON(currentLevel, "./assets/Planet/levels/" + currentWorld + "/tilemaps/" + currentLevel + ".json");
    };
    PlanetLogicScene.prototype.receiveLevelInfo = function (levelInfo) {
    };
    PlanetLogicScene.prototype.create = function (inputData) {
        var _this = this;
        var tilemap = this.make.tilemap({ key: this.loadData.currentLevel, tileWidth: 16, tileHeight: 16 });
        var tileset = tilemap.addTilesetImage(this.loadData.currentTileset);
        tilemap.createLayer("BackWorld", tileset, 0, 0).setDepth(-1);
        var worldLayer = tilemap.createLayer("World", tileset, 0, 0);
        worldLayer.setDepth(0);
        worldLayer.setCollisionByProperty({ collides: true });
        tilemap.createLayer("Foreground", tileset, 0, 0).setDepth(10);
        var waterGroup = this.add.group();
        var lavaGroup = this.add.group();
        var doorGroup = this.add.group();
        var slopeGroup = this.add.group();
        var invisiblePlatformGroup = this.add.group();
        var greenBeakerGroup = this.add.group();
        var checkpointGroup = this.add.group();
        switch (this.loadData.currentWorld) {
            case "GrassPlanet2":
                var INDEXES_1 = BlockIndexes_1.default.GRASS_PLANET_2;
                var WATERS_1 = [INDEXES_1.WATER_TOP, INDEXES_1.WATER, INDEXES_1.WATER_BLANK];
                var LAVA_1 = [INDEXES_1.LAVA_TOP, INDEXES_1.LAVA, INDEXES_1.LAVA_BLANK];
                worldLayer.forEachTile(function (tile) {
                    if (WATERS_1.indexOf(tile.index) !== -1) {
                        tile.setCollision(false, false, false, false);
                        waterGroup.add(new Water_1.default(_this, tile.pixelX, tile.pixelY));
                        return;
                    }
                    else if (LAVA_1.indexOf(tile.index) !== -1) {
                        tile.setCollision(false, false, false, false);
                        lavaGroup.add(new Lava_1.default(_this, tile.pixelX, tile.pixelY));
                        return;
                    }
                    switch (tile.index) {
                        case INDEXES_1.DOOR_TOP:
                            tile.setCollision(false, false, false, false);
                            doorGroup.add(new Door_1.default(_this, tile.pixelX + tile.width / 2, tile.pixelY + tile.height));
                            break;
                        case INDEXES_1.DOOR_BOTTOM:
                            tile.setCollision(false, false, false, false);
                            break;
                        case INDEXES_1.SLOPE_LEFT_UP:
                            tile.setCollision(false, false, false, false);
                            slopeGroup.add(new Slope_1.default(_this, "leftUp", tile.pixelX, tile.pixelY));
                            break;
                        case INDEXES_1.SLOPE_RIGHT_UP:
                            tile.setCollision(false, false, false, false);
                            slopeGroup.add(new Slope_1.default(_this, "rightUp", tile.pixelX, tile.pixelY));
                            break;
                        case INDEXES_1.BACK_GRASS:
                            tile.setCollision(false, false, false, false);
                            invisiblePlatformGroup.add(new InvisiblePlatform_1.default(_this, tile.pixelX, tile.pixelY));
                            break;
                        case INDEXES_1.CHECKPOINT:
                            worldLayer.removeTileAt(tile.x, tile.y);
                            checkpointGroup.add(new Checkpoint_1.default(_this, tile.pixelX, tile.pixelY));
                            break;
                    }
                });
                break;
        }
        var itemsLayer = tilemap.createLayer("Items", tileset, 0, 0);
        switch (this.loadData.currentWorld) {
            case "GrassPlanet2":
                var INDEXES_2 = BlockIndexes_1.default.GRASS_PLANET_2;
                itemsLayer.forEachTile(function (tile) {
                    switch (tile.index) {
                        case INDEXES_2.GREEN_BEAKER:
                            greenBeakerGroup.add(new GreenBeaker_1.default(_this, tile.pixelX, tile.pixelY));
                            itemsLayer.removeTileAt(tile.x, tile.y);
                            break;
                    }
                });
                break;
        }
        var loaderScene = this.scene.get("planetLoader");
        this.player = loaderScene.loadPlayer(inputData, tilemap, doorGroup, checkpointGroup, this.loadData.currentLevel || inputData.currentLevel, this.presetData.currentLevel);
        checkpointGroup.setDepth(10);
        this.physics.add.collider(this.player, worldLayer);
        this.physics.add.collider(greenBeakerGroup, worldLayer);
        this.physics.add.overlap(this.player, waterGroup, function (player, water) {
            water.onCollide(player);
        }, undefined, this);
        this.physics.add.overlap(this.player, lavaGroup, function (player, lava) {
            lava.onCollide(player);
        }, undefined, this);
        this.physics.add.overlap(this.player, doorGroup, function (player, door) {
            door.onCollide(player);
        }, undefined, this);
        this.physics.add.overlap(this.player, slopeGroup, function (player, slope) {
            slope.processCollision(player);
        }, undefined, this);
        this.physics.add.overlap(this.player, slopeGroup, function (player, slope) {
            slope.processCollision(player);
        }, undefined, this);
        this.physics.add.overlap(this.player, invisiblePlatformGroup, function (player, invisiblePlatform) {
            invisiblePlatform.processCollision(player);
        }, undefined, this);
        this.physics.add.collider(greenBeakerGroup, worldLayer);
        this.physics.add.overlap(greenBeakerGroup, waterGroup, function (beaker, water) {
            water.onCollide(beaker);
        }, undefined, this);
        this.physics.add.overlap(greenBeakerGroup, lavaGroup, function (beaker, lava) {
            lava.onCollide(beaker);
        }, undefined, this);
        this.physics.add.overlap(greenBeakerGroup, slopeGroup, function (beaker, slope) {
            beaker.onCollide(slope);
        }, undefined, this);
        this.physics.add.collider(greenBeakerGroup, this.player, function (beaker, player) {
            beaker.onCollide(player);
        }, undefined, this);
        this.physics.add.overlap(checkpointGroup, this.player, function (checkpoint, player) {
            checkpoint.onCollide(player);
        });
        this.physics.add.overlap(slopeGroup, greenBeakerGroup, function (slope, beaker) {
            slope.processCollision(beaker);
        }, undefined, this);
        this.physics.world.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
        this.physics.world.setBoundsCollision(true, true, true, false);
        var cam = this.cameras.main;
        cam.startFollow(this.player);
        cam.setZoom(2);
        cam.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
        this.scene.get("planetEffects").fadeIn(500, 0, 0, 0);
        this.graphics = this.add.graphics();
        this.tilemap = tilemap;
    };
    PlanetLogicScene.prototype.getPlayerStats = function () {
        return this.player.getStats();
    };
    PlanetLogicScene.prototype.update = function (time, delta) {
        this.scene.get("planetEffects").processBrickCollision(this.player, this.tilemap);
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
        this.scene.sleep("planetEffects");
        this.scene.sleep("planetBack");
        this.scene.sleep("planetUI");
    };
    PlanetScene.prototype.runScenes = function (calledByEntryScene) {
        this.scene.run("planetLogic");
        this.scene.run("planetBack");
        this.scene.run("planetUI");
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
var SpaceBackgroundScene_1 = __webpack_require__(/*! ./scenes/space/SpaceBackgroundScene */ "./scenes/space/SpaceBackgroundScene.js");
var PlanetScene_1 = __webpack_require__(/*! ./scenes/planet/PlanetScene */ "./scenes/planet/PlanetScene.js");
var SpaceLogicScene_1 = __webpack_require__(/*! ./scenes/space/SpaceLogicScene */ "./scenes/space/SpaceLogicScene.js");
var PlanetLogicScene_1 = __webpack_require__(/*! ./scenes/planet/PlanetLogicScene */ "./scenes/planet/PlanetLogicScene.js");
var PlanetEffectsScene_1 = __webpack_require__(/*! ./scenes/planet/PlanetEffectsScene */ "./scenes/planet/PlanetEffectsScene.js");
var PlanetUIScene_1 = __webpack_require__(/*! ./scenes/planet/PlanetUIScene */ "./scenes/planet/PlanetUIScene.js");
var PlanetBackScene_1 = __webpack_require__(/*! ./scenes/planet/PlanetBackScene */ "./scenes/planet/PlanetBackScene.js");
var PlanetLoaderScene_1 = __webpack_require__(/*! ./scenes/planet/PlanetLoaderScene */ "./scenes/planet/PlanetLoaderScene.js");
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
        PlanetScene_1.default, PlanetBackScene_1.default, PlanetLogicScene_1.default, PlanetLoaderScene_1.default, PlanetUIScene_1.default, PlanetEffectsScene_1.default
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