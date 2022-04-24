import SpaceScene from "../../scenes/space/SpaceScene";
import timer from "../Utils/timer";
import trig from "../Utils/trig";
import SpaceGameObject from "./SpaceGameObject";

export default class Bullet extends SpaceGameObject
{
    constructor(scene: SpaceScene, x: number, y: number, texture: string, shootAngle: number, life: number, onCollide: (gameObject: SpaceGameObject) => boolean, onCollideContext: any)
    {
        super(scene, x, y, texture);
        this.shootAngle = shootAngle;
        this.speed = 12;

        this.setDepth(0);

        this.setScale(2);

        this.killTimer = timer(true, life, () =>
        {
            this.kill();
        });

        this.setOnCollide((colData: Phaser.Types.Physics.Matter.MatterCollisionData) =>
        {
            if(colData.bodyA.gameObject)
            {
                const hit = onCollide.call(onCollideContext, colData.bodyA.gameObject);

                if(hit)
                {
                    this.kill();
                }
            }
        });

    }

    private shootAngle: number;
    private speed: number;

    private killTimer: {
        update: () => void;
    };

    private amtTraveled: number = 0;
    private range: number = 500;

    protected onKill()
    {
        // this.bodyConf.updateBoundingBox();
        // (this.scene as SpaceScene).world.cameraGrid.removeReference(this);
    }

    protected preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);

        this.killTimer.update();

        this.x += trig.cos(this.shootAngle) * this.speed;
        this.y += trig.sin(this.shootAngle) * this.speed;

        this.amtTraveled += this.speed;

        if(this.amtTraveled > this.range)
        {
            this.kill();
        }
    }
}