export default class SpaceImg extends Phaser.GameObjects.Image
{
    constructor (scene: Phaser.Scene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture);

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
    _arrayName: string;
    _name: string;
}