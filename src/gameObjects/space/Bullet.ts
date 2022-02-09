import trig from "../Utils/trig";
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
    protected life: number = 100;

    protected onKill()
    {

    }

    protected destroyOnKill: boolean = true;

    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);

        this.x += trig.cos(this.shootAngle) * this.speed;
        this.y += trig.sin(this.shootAngle) * this.speed;

        this.life -= 3.5;

        if(this.life <= 0)
        {
            this.kill();
        }
    }

    // protected dead: boolean = false;

    // protected kill()
    // {
    //     this.dead = true;
    //     this.bodyConf.destroy();
    //     this.destroy();
    // }

    public getDamage()
    {
        return this.damage;
    }
}