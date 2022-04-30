import SpaceScene from "../../scenes/space/SpaceScene";

export default class SpaceGameObject extends Phaser.Physics.Matter.Sprite   
{
    constructor (scene: SpaceScene, x: number, y: number, texture: string, frame?: string | number)
    {
        super(scene.matter.world, x, y, texture, frame);

        scene.add.existing(this);

        // Todo: move to SpaceGrid
        scene.world.initGameObject(this);

        scene.matter.world.remove(this);
    }

    protected preUpdate(time: number, delta: number)
    {
        this.bodyConf.update();
        
        super.preUpdate(time, delta);
    }

    public getType: () => string = () => "spaceGameObject";

    public _id: number;
    public body: MatterJS.BodyType;
    public bodyConf: {
        moves: boolean;
        boundingBox: any;
        update: () => void;
        destroy: () => void;
        updateBoundingBox: () => void;
    };
    public _arrayName: string;
    public _name: string;

    public onCollide(object: SpaceGameObject)
    {

    }

    protected killed: boolean = false;

    protected destroyOnKill: boolean = true;
    public destroyQueued: boolean = false;

    protected onKill()
    {

    }

    protected kill()
    {
        if(this.killed)
        {
            return;
        }

        this.killed = true;

        this.onKill();
        this.destroyQueued = this.destroyOnKill;
    }
}