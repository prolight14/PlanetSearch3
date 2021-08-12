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
        slowDown: () => boolean;
        shoot: () => boolean;
    }

    protected angleVel: number;
    protected speed: number = 0;

    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);

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
            this.speed += 0.5;
        }
        else 
        {
            if(this.speed > 0)
            {
                this.speed -= 0.05;
            }  
            else
            {
                this.speed = 0;
            } 
        }

        if(this.controls.slowDown())
        {
            if(this.speed > 0)
            {
                this.speed -= 0.35;
            }  
            else
            {
                this.speed = 0;
            } 
        }

        this.speed = Math.min(this.speed, 10);

        let angle = Phaser.Math.DEG_TO_RAD * (this.angle - 90);
        this.x += Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;

        this.bodyConf.update();
    }
}