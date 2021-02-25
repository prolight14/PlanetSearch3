import SpaceScene from "../../scenes/space/SpaceScene";

export default class SpaceGameObject extends Phaser.GameObjects.Sprite
{
    constructor (scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number)
    {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);

        let _this: this = this;

        this.bodyConf = {
            moves: true,
            boundingBox: {},
            update: function() {},
            destroy: function() {}
        };
        this.bodyConf.updateBoundingBox = function()
        {
            this.boundingBox.minX = _this.x - _this.displayWidth / 2;
            this.boundingBox.minY = _this.y - _this.displayHeight / 2;
            this.boundingBox.maxX = _this.x + _this.displayWidth / 2;
            this.boundingBox.maxY = _this.y + _this.displayHeight / 2;
        };

        this.bodyConf.updateBoundingBox();
    }

    body: any;
    bodyConf: any;
}