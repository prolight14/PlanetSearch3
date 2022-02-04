import Bullet from "./Bullet";
import Ship from "./Ship";
import SpaceGameObject from "./SpaceGameObject";

export default class EnemyShipBullet extends Bullet
{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, shootAngle: number)
    {
        super(scene, x, y, texture);

        this.shootAngle = shootAngle;
        this.speed = 12;
        this.damage = 1;

        this.setCollisionGroup(2);
        this.setCollidesWith(0);

        this.setOnCollide((colData: Phaser.Types.Physics.Matter.MatterCollisionData) =>
        {
            if(colData.bodyA.gameObject && (colData.bodyA.gameObject as SpaceGameObject)._arrayName === "playerShip")
            {
                this.onCollide(colData.bodyA.gameObject);
            }
        });
    }

    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);
    }

    protected onCollide(object: Ship)
    {
        object.takeDamage(this);
        this.kill();
    }
}