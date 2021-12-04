export default class SpaceGameObject extends Phaser.Physics.Matter.Sprite   
{
    constructor (scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number, config?: any)
    {
        super(scene.matter.world, x, y, texture, frame);

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

    protected typeName: string = "gameObject";

    public getTypeName()
    {
        return this.typeName;
    }

    public _id: number;
    body: MatterJS.BodyType;
    bodyConf: any;
    _arrayName: string;
    _name: string;

    protected onCollide(object: SpaceGameObject)
    {

    }
}