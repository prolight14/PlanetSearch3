import Bullet from "./Bullet";
import EnemyShip from "./EnemyShip";
import Ship from "./Ship";

export default class PlayerShipBullet extends Bullet
{
    constructor(scene: Phaser.Scene, x: number, y: number, shootAngle: number)
    {
        super(scene, x, y, "helixShipLvl1Bullet");

        this.shootAngle = shootAngle;
        this.speed = 15;
        this.damage = 1;

        this.setCollisionGroup(1);
        this.setCollidesWith(0);

        this.setOnCollide((colData: Phaser.Types.Physics.Matter.MatterCollisionData) =>
        {
            if(colData.bodyA.gameObject && colData.bodyA.gameObject.isShip)
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