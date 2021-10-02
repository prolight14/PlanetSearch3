import PlanetLogicScene from "../../scenes/planet/PlanetLogicScene";
import GameObject from "./GameObject";

export default class Lifeform extends GameObject
{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number)
    {
        super(scene, x, y, texture, frame); 

        scene.physics.add.existing(this);

        this.resetPhysics();
    }

    protected hp: number = 2;
    protected maxHp: number = 2;  
    protected damage: number = 1;

    public getDamage(object: Lifeform): number
    {
        return this.damage;
    }

    public takeDamage(object: { getDamage: (object: Lifeform) => number })
    {
        this.hp -= object.getDamage(this);
    }

    public isLifeform: boolean = true;

    protected controls: {
        left: () => boolean;
        right: () => boolean;
        up: () => boolean;
        down: () => boolean;
        activate: () => boolean;
    };

    public inLiquid: boolean = false;
    public isOnSlope: boolean = false;
    public wasInLiquid: boolean = false;
    public wasOnSlope: boolean = false;
    
    private isJumping: boolean = false;
    protected jumpSpeed: number = 80;
    protected jumpHeight: number = 310;

    protected xSpeed: number = 8;
    protected maxVel: { x: number, y: number} = { x: 175, y: 600};
    protected drag: { x: number, y: number} = { x: 30, y: 0};
    protected xDeacl: number = 10;
    protected xDeaclInAir: number = 3;
    protected ySwimSpeed: number = 140;
    protected maxVelInWater: number = 75;

    protected resetPhysics()
    {
        return this.setDrag(this.drag.x, this.drag.y).setMaxVelocity(this.maxVel.x, this.maxVel.y);
    }

    public preUpdate(time: number, delta: number)
    {
        if(this.dead)
        {
            return;
        }

        super.preUpdate(time, delta);
        
        const onGround = this.body.blocked.down || this.isOnSlope;

        if(this.controls.left())
        {
            this.setVelocityX(this.body.velocity.x - this.xSpeed);
        }
        if(this.controls.right())
        {
            this.setVelocityX(this.body.velocity.x + this.xSpeed);
        }
        if(!this.controls.left() && !this.controls.right())
        {
            const xDeacl = onGround ? this.xDeacl : this.xDeaclInAir;

            if(this.body.velocity.x > 0)
            {
                this.setVelocityX(this.body.velocity.x - xDeacl);
            }
            if(this.body.velocity.x < 0)
            {
                this.setVelocityX(this.body.velocity.x + xDeacl);
            }

            if(Math.abs(this.body.velocity.x) < xDeacl)
            {
                this.setVelocityX(0);
                this.anims.play("idle");
            }
        }

        if(this.inLiquid)
        {
            if(this.controls.up())
            {
                this.setVelocityY(-this.ySwimSpeed);
            }
            else if(this.controls.down())
            {
                this.setVelocityY(this.ySwimSpeed);
            }
        }
        else if(onGround && this.controls.up())
        {
            this.isJumping = true;
        }

        if(!this.controls.up() || this.body.velocity.y < -this.jumpHeight)
        {
            this.isJumping = false;
        }
  
        if(this.isJumping)
        {
            this.body.velocity.y -= this.jumpSpeed;
        }

        const onCeiling = this.body.blocked.up;

        if(onCeiling)
        {
            this.isJumping = false;
            this.body.velocity.y = 0;
        }

        if(this.inLiquid)
        {
            this.setMaxVelocity(this.maxVelInWater);
            this.setGravity(0);
        }
        else
        {
            this.resetPhysics();
        }

        (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(!this.isOnSlope);
    
        this.wasInLiquid = this.inLiquid;
        this.wasOnSlope = this.isOnSlope;
        this.isOnSlope = false;
        this.inLiquid = false;

        if(this.y > this.scene.cameras.main.getBounds().height + this.body.halfHeight)
        {
            this.kill("fellOff");
        }
        else if(this.hp <= 0)
        {
            this.kill("noHp");
        }
    }

    protected dead: boolean = false;

    public isDead()
    {
        return this.dead;
    }

    protected kill(reason?: string)
    {
        this.dead = true;
        this.scene.time.delayedCall(0, () => 
        {
            this.destroy();
        });
    }
}