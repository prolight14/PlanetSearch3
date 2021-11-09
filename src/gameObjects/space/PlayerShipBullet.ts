import Bullet from "./Bullet";
import EnemyShip from "./EnemyShip";
import Ship from "./Ship";

export default class PlayerShipBullet extends Bullet
{
    constructor(scene: Phaser.Scene, x: number, y: number, shootAngle: number)
    {
        super(scene, x, y, "playerShipBullet");

        this.shootAngle = shootAngle;
        this.speed = 15;
        this.damage = 2;

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

    protected onCollide(object: Ship)
    {
        object.takeDamage(this);
        this.bodyConf.destroy();
        this.destroy();
    }
}