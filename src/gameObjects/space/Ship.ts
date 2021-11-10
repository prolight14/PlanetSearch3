import Bullet from "./Bullet";
import SpaceGameObject from "./SpaceGameObject";

export default class Ship extends SpaceGameObject
{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: number | string, config?: any)
    {
        super(scene, x, y, texture, frame, config);
    }

    protected maxHp: number = 10;
    protected hp: number = 10;
    protected damage: number = 1;
    public isShip: boolean = true;

    public takeDamage(object: Bullet)
    {
        this.hp -= object.getDamage();
    }

    public getMaxHp()
    {
        return this.maxHp;
    }

    public getHp()
    {
        return this.hp;
    }

    public getDamage()
    {
        return this.damage;
    }

    protected controls: {
        turnLeft: () => boolean;
        turnRight: () => boolean;
        goForward: () => boolean;
        slowDown: () => boolean;
        shoot: () => boolean;
    }

    protected maxSpeed: number = 5;

    protected angleVel: number;
    protected angleAcl: number = 0.4;
    protected angleDeacl: number = 0.1;
    protected maxAngleVel: number = 3;
    protected useAngleAcl: boolean = false;

    protected speed: number = 0;

    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);

        if(this.useAngleAcl)
        {
            if(this.controls.turnLeft())
            {
                this.angleVel -= this.angleAcl;
            }
            if(this.controls.turnRight())
            {
                this.angleVel += this.angleAcl;
            }
            this.angleVel = Math.min(Math.max(this.angleVel, -this.maxAngleVel), this.maxAngleVel);

            if(!this.controls.turnLeft() && !this.controls.turnRight())
            {
                if(this.angleVel > 0)
                {
                    this.angleVel -= this.angleDeacl;
                }
                if(this.angleVel < 0)
                {
                    this.angleVel += this.angleDeacl;
                }

                if(this.angleVel > -this.angleDeacl && this.angleVel < this.angleDeacl)
                {
                    this.angleVel = 0;
                }

            }

            this.setAngle(this.angle + this.angleVel);
        }
        else
        {
            if(this.controls.turnLeft())
            {
                this.setAngle(this.angle - this.angleVel);
            }     
            if(this.controls.turnRight())
            {
                this.setAngle(this.angle + this.angleVel);
            }
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

        this.speed = Math.min(this.speed, this.maxSpeed);

        let angle = Phaser.Math.DEG_TO_RAD * (this.angle - 90);
        this.x += Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;

        this.bodyConf.update();

        if(this.hp <= 0)
        {
            this.kill();
        }
    }

    /**
     * Is the ship dead?
     */
    public dead: boolean = false;

    protected onKill?: Function;

    protected kill()
    {
        this.dead = true;

        if(this.onKill !== undefined)
        {
            this.onKill();
        }
    }
}