import Bullet from "./Bullet";

export default class PlayerShipBullet extends Bullet
{
    constructor(scene: Phaser.Scene, x: number, y: number, shootAngle: number)
    {
        super(scene, x, y, "playerShipBullet");

        this.shootAngle = shootAngle;
        this.speed = 15;
        this.damage = 2;
    }
}