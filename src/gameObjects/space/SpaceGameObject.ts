import SpaceScene from "../../scenes/space/SpaceScene";

export default class SpaceGameObject extends Phaser.Physics.Matter.Sprite   
{
    constructor (scene: SpaceScene, x: number, y: number, texture: string, frame?: string | number)
    {
        super(scene.matter.world, x, y, texture, frame);

        scene.add.existing(this);
        scene.csp.initGameObject(this);
    }

    protected preUpdate(time: number, delta: number)
    {
        this.bodyConf.update();
        
        super.preUpdate(time, delta);
    }

    public _id: number;
    body: MatterJS.BodyType;
    bodyConf: {
        moves: boolean;
        boundingBox: any;
        update: () => void;
        destroy: () => void;
        updateBoundingBox: () => void;
    };
    _arrayName: string;
    _name: string;

    protected onCollide(object: SpaceGameObject)
    {

    }

    protected dead: boolean = false;

    protected destroyOnKill: boolean = true;
    public destroyQueued: boolean = false;

    protected onKill()
    {

    }

    protected kill()
    {
        if(this.dead)
        {
            return;
        }

        this.dead = true;

        // this.bodyConf.update();
        // this.bodyConf.updateBoundingBox();

        this.onKill();

        this.destroyQueued = this.destroyOnKill;

        // if(this.destroyOnKill)
        // {
        //     // Might not need
        //     this.bodyConf.destroy();
        //     (this.body as any).destroy();
        //     this.scene.sys.displayList.remove(this);

        //     // Definitely need
        //     this.destroy();
        // }
    }
}