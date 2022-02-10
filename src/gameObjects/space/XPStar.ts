import SpaceScene from "../../scenes/space/SpaceScene";
import PlayerShip from "./PlayerShip";
import SpaceGameObject from "./SpaceGameObject";

export default class XPStar extends SpaceGameObject
{
    constructor(scene: SpaceScene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture);

        this.setAngle(Phaser.Math.RND.between(0, 180));

        this.setCollisionGroup(2);
        this.setCollidesWith(0);

        if(texture === "xpStar")
        {
            this.amt = 2;
        }

        this.setOnCollide((colData: Phaser.Types.Physics.Matter.MatterCollisionData) =>
        {
            if(colData.bodyA.gameObject && (colData.bodyA.gameObject as SpaceGameObject)._arrayName === "playerShip")
            {
                var playerShip = colData.bodyA.gameObject;

                this.onCollide(playerShip);
            }
        });
    }

    public amt: number = 1;

    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);
    }

    protected onCollide(playerShip: PlayerShip)
    {
        playerShip.collectXPStars(this);

        this.destroy();
    }
}