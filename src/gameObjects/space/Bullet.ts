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
    protected life: number = 200;

    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);

        var angle = this.shootAngle * Phaser.Math.DEG_TO_RAD;
        this.x += Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;

        this.life -= 3.5;

        if(this.life <= 0)
        {
            this.kill();
        }
    }

    protected dead: boolean = false;

    protected kill()
    {
        this.dead = true;
        this.bodyConf.destroy();
        this.destroy();
    }

    public getDamage()
    {
        return this.damage;
    }
}