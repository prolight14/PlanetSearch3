import SpaceGameObject from "./SpaceGameObject";

export default class Bullet extends SpaceGameObject
{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture);
    }

    protected shootAngle: number;
    protected speed: number;
    protected damage: number;

    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);

        var angle = this.shootAngle * Phaser.Math.DEG_TO_RAD;
        this.x += Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;
    }

    public onCollide(object: SpaceGameObject)
    {
        console.log("Hit!");
    }
}