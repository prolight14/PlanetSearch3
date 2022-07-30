import SpaceScene from "../../scenes/space/SpaceScene";
import EnemyShip from "./EnemyShip";
import COL_CATEGORIES from "./CollisionCategories";
import SpaceGameObject from "./SpaceGameObject";
import Bullet from "./Bullet";
import PlayerShip from "./PlayerShip";
import trig from "../Utils/trig";
import timer from "../Utils/Timer";

export default class HyperBeamerShip extends EnemyShip
{
    constructor(scene: SpaceScene, x: number, y: number)
    {
        super(scene, x, y, "greenShip");

        this.setCollisionCategory(COL_CATEGORIES.ENEMY);
        this.setCollidesWith([COL_CATEGORIES.PLAYER, COL_CATEGORIES.PLAYER_BULLETS]);

        this.maxSpeed = 3.75;
        this.angleVel = 1.3;
        this.hp = 12;
        this.maxHp = 12;

        this.fovStats.range = 400;
        this.fovStats.fov = 60;

        this.setScale(2);
        
        scene.anims.create({
            key: "flying",
            frames: [{ key: "greenShip", frame: 0 }, { key: "greenShip", frame: 1 }],
            frameRate: 8,
            repeat: -1
        });

        this.anims.play("flying");

        this.setAngle(Phaser.Math.RND.angle());
        this.setShootInterval(600);

        this.bullets = scene.world.get.gameObjectArray("hyperBeamerShipBullet");

        if(!this.bullets)
        {
            this.bullets = scene.world.add.gameObjectArray(Bullet, "hyperBeamerShipBullet");
        }

        this.setDepth(23);

        this.createTimers();

        // this.createAdjustDir();
        this.adjustDir(-90, 300, function()
        {
            this.adjustDir(Phaser.Math.RND.between(-90, 90), 500);
        }, this);
    }

    private bullets: any;

    private shootBullet(theta: number, length: number, life?: number)
    {
        theta += this.angle - 90;

        var bullet = this.bullets.add(
            this.scene, 
            this.x + trig.cos(theta) * length, 
            this.y + trig.sin(theta) * length, 
            "lightningBlue", 
            this.angle - 90,
            life || 2000, // Life (in seconds)
            3000,
            this.bulletOnCollide,
            this,
        ) as Bullet;
        bullet.setAngle(this.angle);

        bullet.setCollisionCategory(COL_CATEGORIES.ENEMY_BULLETS);
        bullet.setCollidesWith(COL_CATEGORIES.PLAYER);
    }

    private bulletOnCollide(gameObject: SpaceGameObject)
    {
        if(gameObject._arrayName === "playerShip")
        {
            // It may have hit according to the takeDamage method
            return (gameObject as PlayerShip).takeDamage(this);
        }

        // Didn't hit since there were no relevant gameObjects
        return false;
    }

    protected shoot()
    {
        this.shootBullet(0, this.displayWidth / 2);
    }

    private cur_state: string = "wander";

    // private timers: any = {};

    // private changingDir: boolean = false;

    private createTimers()
    {
        // this.timers.changeDir = timer(true, Phaser.Math.RND.integerInRange(750, 1500), () =>
        // {
        //     if(this.changingDir = !this.changingDir)
        //     {
        //         this.movement.angleDir = (Phaser.Math.RND.frac() > 0.5) ? "left" : "right";
        //         this.timers.changeDir.reset(Phaser.Math.RND.integerInRange(200, 600));
        //     }
        //     else
        //     {
        //         this.movement.angleDir = "none";
        //         this.timers.changeDir.reset(Phaser.Math.RND.integerInRange(750, 1500));
        //     }
        // });

        
    }

    // private createAdjustDir()
    // {

    // }
    
    private turnEvent: {
        angleAdjust: number,
        inTime: number,
        callback: () => void,
        callbackContext: any,

        startTime: number
    } | undefined;

    private now(): number
    {
        return performance.now();
    }

    private adjustDir(angleAdjust: number, inTime: number, finishCallback?: (() => void) | undefined, callbackContext?: any | undefined)
    {
        this.turnEvent = {
            angleAdjust: angleAdjust,
            inTime: inTime,
            callback: (finishCallback === undefined) ? (() => {}) : finishCallback,
            callbackContext: callbackContext,

            startTime: this.now(),
        };

        this.movement.angleDir = (angleAdjust < 0) ? "left" : "right";
    }

    private updateAdjustDir()
    {
        if(this.turnEvent !== undefined)
        {
            const turnEvent = this.turnEvent;

            if(this.now() - turnEvent.startTime >= turnEvent.inTime)
            {
                this.movement.angleDir = "none";
                this.turnEvent = undefined;

                var context = turnEvent.callbackContext;

                if(context === undefined)
                {
                    turnEvent.callback.call(this);
                }
                else
                {
                    turnEvent.callback.call(context);
                }
            }
        }
    }

    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);

        // Todo: Change to state machine

        this.updateAdjustDir();
        
        const visibleObjects = this.fov.look(this.angle - 90, this.fovStats.range, this.fovStats.fov);
        this.canSeeSomething = (visibleObjects.length > 0);

        switch(this.cur_state)
        {
            case "wander":

                // this.timers.changeDir.update();

                // visibleObjects.forEach((objectInfo: any) =>
                // {
                //     const gameObject = objectInfo.object as SpaceGameObject;
                //     const angleDiff = objectInfo.angleDiff; // The angle difference between this ship and the object

                //     switch(gameObject.getType())
                //     {
                //         // It's a spaceship
                //         case "ship":
                //             // if(gameObject._arrayName === "playerShip")
                //             // {
                //             //     this.cur_state = "attack";
                //             //     this.movement.isShooting = true;
                //             // }
                //             // else
                //             {
                //                 if(Math.abs(angleDiff) > this.angleVel)
                //                 {
                //                     this.movement.angleDir = (angleDiff < 0) ? "right" : "left";
                //                 }
                //                 else
                //                 {
                //                     this.movement.angleDir = "none";
                //                 }
                //             }
                //             break;

                //         // It's a star, planet or moon
                //         case "body":

                //             break;
                //     }
                // });
                break;

            case "attack":

                break;

            case "escape":

                break;
        }

        // this.movement.angleDir = "none";

        visibleObjects.forEach((objectInfo: any) =>
        {
            /*const gameObject = objectInfo.object;
            const angleDiff = objectInfo.angleDiff;

            switch(gameObject._arrayName)
            {
                case "playerShip":
                    if(this.hp > this.maxHp * 0.4)
                    {
                        this.cur_state = "follow";
                    }
                    else
                    {
                        this.cur_state = "run";
                    }

                    if(this.cur_state === "follow")
                    {
                        if(Math.abs(angleDiff) > this.angleVel)
                        {
                            this.movement.angleDir = (angleDiff < 0) ? "left" : "right";
                        }
                        else
                        {
                            this.movement.angleDir = "none";
                        }
                    }
                    else if(this.cur_state === "run")
                    {
                        if(Math.abs(angleDiff) < 45)
                        {
                            this.movement.angleDir = (angleDiff < 0) ? "right" : "left";
                        }
                        else
                        {
                            this.movement.angleDir = "none";
                        }
                    }
                    break;
            }*/
        });
    }
}