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
var Brick = (function (_super) {
    __extends(Brick, _super);
    function Brick(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "brick") || this;
        scene.add.existing(_this);
        scene.physics.add.existing(_this);
        _this.setMaxVelocity(0, 0);
        _this.setImmovable(true);
        _this.setOrigin(0, 0);
        return _this;
    }
    Brick.prototype.explode = function () {
        var brickGraphics = this.scene.make.graphics({ x: 0, y: 0, add: false });
        this.setVisible(false);
        var pixel = new Phaser.Display.Color();
        var sw = this.width * 0.5;
        var sh = this.height * 0.5;
        var x, y;
        for (x = 0; x < sw; x++) {
            for (y = 0; y < sh; y++) {
                pixel = this.scene.textures.getPixel(x, y, "brick");
                if (pixel.alpha > 0) {
                    brickGraphics.fillStyle(pixel.color, pixel.alpha);
                    brickGraphics.fillRect(x, y, 1, 1);
                }
            }
        }
        var texKey = "brick-leftUp" + Date.now().toString();
        brickGraphics.generateTexture(texKey, sw, sh);
        this.blocks = [];
        var upperLeftBlock = this.scene.add.image(this.x, this.y, texKey).setOrigin(0, 0);
        upperLeftBlock.startX = upperLeftBlock.x;
        this.blocks.push(upperLeftBlock);
        this.destroying = true;
    };
    Brick.prototype.preUpdate = function (delta, time) {
        _super.prototype.update.call(this, delta, time);
        if (this.destroying && this.blocks !== undefined) {
            for (var i = this.blocks.length - 1; i >= 0; i--) {
                var block = this.blocks[i];
                block.y += 6;
                if (block.y > this.scene.scene.get("planetLogic").getLevelHeight()) {
                    block.destroy();
                    this.blocks.splice(i, 1);
                }
            }
            if (this.blocks.length === 0) {
                this.destroy();
            }
        }
    };
    Brick.prototype.onCollide = function (object) {
        if (object.body.touching.up && this.body.touching.down) {
            this.explode();
        }
    };
    return Brick;
}(Phaser.Physics.Arcade.Image));
exports.default = Brick;
var ImagePlate = (function (_super) {
    __extends(ImagePlate, _super);
    function ImagePlate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ImagePlate;
}(Phaser.GameObjects.Image));
//# sourceMappingURL=Brick.js.map