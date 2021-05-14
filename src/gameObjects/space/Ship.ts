import SpaceGameObject from "./SpaceGameObject";

export default class Ship extends SpaceGameObject
{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture);
    }

    protected controls: {
        turnLeft: () => boolean;
        turnRight: () => boolean;
        goForward: () => boolean;
        shoot: () => boolean;
    }

    protected angleVel: number;
    protected speed: number;

    public preUpdate()
    {
        if(this.controls.turnLeft())
        {
            this.setAngle(this.angle - this.angleVel);
        }     
        if(this.controls.turnRight())
        {
            this.setAngle(this.angle + this.angleVel);
        }

        if(this.controls.goForward())
        {
            let angle = Phaser.Math.DEG_TO_RAD * (this.angle - 90);
            this.x += Math.cos(angle) * this.speed;
            this.y += Math.sin(angle) * this.speed;
        }

        this.bodyConf.update();
    }
}