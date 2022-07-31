import SpaceScene from "../../scenes/space/SpaceScene";
import EnemyShip from "./EnemyShip";
import COL_CATEGORIES from "./CollisionCategories";
import SpaceGameObject from "./SpaceGameObject";
import Bullet from "./Bullet";
import PlayerShip from "./PlayerShip";
import trig from "../Utils/trig";
import timer from "../Utils/Timer";
import DelayedEvent from "../Utils/DelayedEvent";
import DelayedEventSystem from "../Utils/DelayedEventSystem";

function now()
{
    return performance.now();
}

export default class HyperBeamerShip extends EnemyShip
{
    constructor(scene: SpaceScene, x: number, y: number)
    {
        super(scene, x, y, "greenShip");

        this.setCollisionCategory(COL_CATEGORIES.ENEMY);
        this.setCollidesWith([COL_CATEGORIES.PLAYER, COL_CATEGORIES.PLAYER_BULLETS]);

        this.speeds.maxSpeed = 3.75;
        this.speeds.angleVel = 1.3;
        this.speeds.angleVel = 2;

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

        // this.speeds.useAngleAcl = true;

        // this.timers.changeDir.interval = 200;

        // const angleDir = this.movement.angleDir = Phaser.Math.RND.frac() < 0.5 ? "left" : "right";
        // this.timers.changeDir.targetAngle = this.angle + Phaser.Math.RND.between(30, 75) * (angleDir === "left" ? -1 : 1);
        // this.timers.changeDir.targetingAngle = true; 

        // this.timers.moveStraight = timer(true, 500, () =>
        // {
        //     this.startTurn(this.angle + Phaser.Math.RND.between(60, 75) * (Phaser.Math.RND.frac() < 0.5 ? -1 : 1), false, false, () =>
        //     {
        //         this.timers.moveStraight.reset(Phaser.Math.RND.between(500, 1500));
        //     });
        // });

        this.delayedEvents = new DelayedEventSystem();



        // this.movement.thrust = "forward";
        // this.delayedEvents.quickEvent([this.x, this.y], (firstX: number, firstY: number) =>
        // {
        //     const dx = firstX - this.x;
        //     const dy = firstY - this.y;

        //     return dx * dx + dy * dy > 300 * 300;
        // }, () =>
        // {
        //     this.movement.thrust = "";
        // });

        this.movement.thrust = "forward";

        // this.movement.angleDir = "left";
        // this.delayedEvents.quickEvent([this.angle - 60], (targetAngle: number) =>
        // {
        //     return Math.abs(
        //         Phaser.Math.Angle.ShortestBetween(
        //             Phaser.Math.Angle.WrapDegrees(
        //                 targetAngle
        //             ), 
        //             this.angle
        //         )) < Math.abs(this.speeds.maxAngleVel);
        // }, () =>
        // {
        //     this.movement.angleDir = "";
        // });

        this.delayedCall(3000, () =>
        {
            this.turn(-90, 1.5);
        });
    }

    private delayedCall(delayTime: number, callback: () => void)
    {
        const startTime = now();

        this.delayedEvents.quickEvent([], () =>
        {
            return (now() - startTime >= delayTime);
        }, () =>
        {
            callback();
        });
    }

    private turn(amt: number, speed?: number, callback?: () => void)
    {
        var oldAngleVel = this.speeds.angleVel;
        if(speed !== undefined)
        {
            this.speeds.angleVel = speed;
        }

        this.movement.angleDir = (amt < 0) ? "left" : "right";
        this.delayedEvents.quickEvent([this.angle + amt], (targetAngle: number) =>
        {
            return Math.abs(
                Phaser.Math.Angle.ShortestBetween(
                    Phaser.Math.Angle.WrapDegrees(
                        targetAngle
                    ), 
                    this.angle
                )) < Math.abs(this.speeds.maxAngleVel);
        }, () =>
        {
            this.movement.angleDir = "";
            if(callback !== undefined)
            {
                callback();
            }
            this.speeds.angleVel = oldAngleVel;
        });
    }

    private delayedEvents: DelayedEventSystem;

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


    // private timers = {
    //     changeDir: {
    //         lastTime: now(),
    //         interval: 0,
    //         targetAngle: 0,
    //         targetingAngle: false
    //     }
    // };

    private events = {
        turn: {
            targetAngle: 0,
            active: false,
            callback: (() => {}),
            callbackContext: this
        }
    };

    private startTurn(targetAngle: number, 
        inverted?: boolean, ignoreIfActive?: boolean,
        callback?: (() => void), callbackContext?: any)
    {
        if(inverted === undefined) { inverted = false; }
        if(ignoreIfActive === undefined) { ignoreIfActive = false; }
        if(callback === undefined) { callback = (() => {}); }
        if(callbackContext === undefined) { callbackContext = this; }

        const turnEvent = this.events.turn;

        if(ignoreIfActive && turnEvent.active)
        {
            return;
        }

        if(targetAngle - this.angle < 0 && !inverted)
        {
            this.movement.angleDir = "left";
        }
        else
        {
            this.movement.angleDir = "right";
        }

        turnEvent.targetAngle = targetAngle;
        turnEvent.active = true;

        turnEvent.callback = callback;
        turnEvent.callbackContext = callbackContext;
    }

    private updateTurn()
    {
        const turnEvent = this.events.turn;

        if(turnEvent.active)
        {
            if(Math.abs(
                Phaser.Math.Angle.ShortestBetween(
                    Phaser.Math.Angle.WrapDegrees(
                        turnEvent.targetAngle
                    ), 
                    this.angle
                )) < Math.abs(this.speeds.maxAngleVel))
            {
                this.movement.angleDir = "";
                turnEvent.active = false;

                turnEvent.callback.call(turnEvent.callbackContext);
            }
        }
    }

    private timers: any = {};
    private updateTimers()
    {
        this.timers.moveStraight.update();
    }

    private updateRandomTurns()
    {
        this.delayedEvents.updateEvents();

        // this.updateTurn();
        // this.updateTimers();

        // this.travelEvent.update();

        // if(changeDirTimer.targetingAngle)
        // {
        //     if(Phaser.Math.Angle.ShortestBetween(this.angle, changeDirTimer.targetAngle) <= Math.abs(this.speeds.angleVel))
        //     {
        //         debugger;
        //         this.movement.angleDir = "";
        //         // changeDirTimer.lastTime = now();
        //         // changeDirTimer.interval = 0;
        //         changeDirTimer.targetingAngle = false;
        //     }
        // }
        // else //if(now() - changeDirTimer.lastTime > changeDirTimer.interval)
        // {
        //     // if(["left", "right"].indexOf(this.movement.angleDir) !== -1)
        //     // {

        //     // }
        //     // else
        //     // {

        //         const angleOffset = Phaser.Math.RND.between(30, 75) * (Phaser.Math.RND.frac() < 0.5 ? -1 : 1);
        //         this.movement.angleDir = (angleOffset < 0) ? "left" : "right";
        //         changeDirTimer.targetAngle = Phaser.Math.Angle.WrapDegrees(this.angle + angleOffset);
        //         changeDirTimer.targetingAngle = true;
        //     // }
        // }

        // if(now() - changeDirTimer.lastTime > changeDirTimer.interval && !changeDirTimer.targetingAngle)
        // {
        //     if(["left", "right"].indexOf(this.movement.angleDir) !== -1)
        //     {
        //         const nextTurnTime = Phaser.Math.RND.between(500, 1000);

        //         this.movement.angleDir = "";
        //         changeDirTimer.lastTime = now();                        
        //         changeDirTimer.interval = nextTurnTime;
        //     }
        //     else
        //     {
        //         const angleOffset = Phaser.Math.RND.between(30, 75) * (Phaser.Math.RND.frac() < 0.5 ? -1 : 1);
        //         changeDirTimer.targetAngle = this.angle + angleOffset;
        //         this.movement.angleDir = (angleOffset > 0) ? "left" : "right";

        //         changeDirTimer.targetingAngle = true;
        //     }
        // }

        // if(changeDirTimer.targetingAngle &&
        //     Phaser.Math.Angle.ShortestBetween(this.angle, Phaser.Math.Angle.WrapDegrees(changeDirTimer.targetAngle)) <= Math.abs(this.speeds.angleVel * 2))
        // {
        //     this.movement.angleDir = "";
        //     changeDirTimer.lastTime = now();
        //     changeDirTimer.targetingAngle = false;
        // }
    }

    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);

        // Todo: Change to state machin

        const visibleObjects = this.fov.look(this.angle - 90, this.fovStats.range, this.fovStats.fov);
        this.canSeeSomething = (visibleObjects.length > 0);

        switch(this.cur_state)
        {
            case "wander":
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
                //                 if(Math.abs(angleDiff) > this.speeds.angleVel)
                //                 {
                //                     this.movement.angleDir = (angleDiff < 0) ? "right" : "left";
                //                     this.events.wander.avoidChangeDir = true;
                //                 }
                //                 else
                //                 {
                //                     this.movement.angleDir = "";
                //                     this.events.wander.avoidChangeDir = false;
                //                 }
                //             }
                //             break;

                //         // It's a star, planet or moon
                //         case "body":

                //             break;
                //     }
                // });

                this.updateRandomTurns();
                break;

            case "attack":

                break;

            case "escape":

                break;
        }

        // this.movement.angleDir = "";

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
                            this.movement.angleDir = "";
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
                            this.movement.angleDir = "";
                        }
                    }
                    break;
            }*/
        });
    }
}