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

    protected speeds = {
        maxSpeed: 5,
        speedAcl: 0.5,
        speedDeacl: 0.05,
        manualSpeedDeacl: 0.35,
        angleVel: 0.2,
        angleAcl: 0.4,
        angleDeacl: 0.1,
        maxAngleVel: 3,
        useAngleAcl: false
    };

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
            if(this.speeds.useAngleAcl)
            {
                if(this.controls.turnLeft())
                {
                    this.speeds.angleVel -= this.speeds.angleAcl;
                }
                if(this.controls.turnRight())
                {
                    this.speeds.angleVel += this.speeds.angleAcl;
                }
                this.speeds.angleVel = Math.min(Math.max(this.speeds.angleVel, -this.speeds.maxAngleVel), this.speeds.maxAngleVel);
    
                if(!this.controls.turnLeft() && !this.controls.turnRight())
                {
                    if(this.speeds.angleVel > 0)
                    {
                        this.speeds.angleVel -= this.speeds.angleDeacl;
                    }
                    if(this.speeds.angleVel < 0)
                    {
                        this.speeds.angleVel += this.speeds.angleDeacl;
                    }
    
                    if(this.speeds.angleVel > -this.speeds.angleDeacl && this.speeds.angleVel < this.speeds.angleDeacl)
                    {
                        this.speeds.angleVel = 0;
                    }
                }
    
                this.setAngle(this.angle + this.speeds.angleVel);
            }
            else
            {
                if(this.controls.turnLeft())
                {
                    this.setAngle(this.angle - this.speeds.angleVel);
                }     
                if(this.controls.turnRight())
                {
                    this.setAngle(this.angle + this.speeds.angleVel);
                }
            }    
        }
        
        if(this.controls.shoot())
        {
            this.shootTimer.update();
        }

        if(this.controls.goForward())
        {
            this.speed += this.speeds.speedAcl;
        }
        else 
        {
            if(this.speed > 0)
            {
                this.speed -= this.speeds.speedDeacl;
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
                this.speed -= this.speeds.manualSpeedDeacl;
            }  
            else
            {
                this.speed = 0; 
            }
        }

        this.speed = Math.min(this.speed, this.speeds.maxSpeed);

        let angle = this.angle - 90;
        this.x += trig.cos(angle) * this.speed;
        this.y += trig.sin(angle) * this.speed;

        if(this.hp <= 0)
        {
            this.kill();
        }
    }
}