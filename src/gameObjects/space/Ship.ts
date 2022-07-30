import SpaceScene from "../../scenes/space/SpaceScene";
import timer from "../Utils/Timer";
import trig from "../Utils/trig";
import SpaceGameObject from "./SpaceGameObject";

export default class Ship extends SpaceGameObject
{
    constructor(scene: SpaceScene, x: number, y: number, texture: string, frame?: number | string)
    {
        super(scene, x, y, texture, frame);
    }
    
    public getType: () => string = () => 
    {
        return "ship";
    };

    protected maxHp: number = 10;
    protected hp: number = 10;
    protected damage: number = 1;
    public isShip: boolean = true;

    public takeDamage(object: any): boolean
    {
        this.hp -= object.getDamage(this);

        // Did it hit?
        return true;
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

    protected usingGamepad: boolean = false;

    protected controls: {
        turnLeft: () => boolean;
        turnRight: () => boolean;
        goForward: () => boolean;
        slowDown: () => boolean;
        shoot: () => boolean;
    }

    protected maxSpeed: number = 5;
    protected speedAcl: number = 0.5;
    protected speedDeacl: number = 0.05;
    protected manualSpeedDeacl: number = 0.35;

    protected angleVel: number = 0.2;
    protected angleAcl: number = 0.4;
    protected angleDeacl: number = 0.1;
    protected maxAngleVel: number = 3;
    protected useAngleAcl: boolean = false;

    protected speed: number = 0;

    protected shootTimer: {
        update: () => void,
        reset: () => void
    };

    protected setShootInterval(interval: number)
    {
        this.shootTimer = timer(true, interval, () =>
        {
            this.shoot();
            this.shootTimer.reset();
        });
    }

    // Will be overridden
    protected shoot()
    {

    }

    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);

        if(!this.usingGamepad)
        {
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
        }
        
        if(this.controls.shoot())
        {
            this.shootTimer.update();
        }

        if(this.controls.goForward())
        {
            this.speed += this.speedAcl;
        }
        else 
        {
            if(this.speed > 0)
            {
                this.speed -= this.speedDeacl;
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
                this.speed -= this.manualSpeedDeacl;
            }  
            else
            {
                this.speed = 0; 
            }
        }

        this.speed = Math.min(this.speed, this.maxSpeed);

        let angle = this.angle - 90;
        this.x += trig.cos(angle) * this.speed;
        this.y += trig.sin(angle) * this.speed;

        if(this.hp <= 0)
        {
            this.kill();
        }
    }
}