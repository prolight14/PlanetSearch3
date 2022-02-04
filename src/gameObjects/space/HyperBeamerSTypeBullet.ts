import EnemyShipBullet from "./EnemyShipBullet";

export default class HyperBeamerSTypeBullet extends EnemyShipBullet
{
    constructor(scene: Phaser.Scene, x: number, y: number, shootAngle: number)
    {
        super(scene, x, y, "helixShipLvl1Bullet", shootAngle);
    }
}