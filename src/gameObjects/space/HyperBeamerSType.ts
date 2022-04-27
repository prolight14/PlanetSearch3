import SpaceScene from "../../scenes/space/SpaceScene";
import HyperBeamerShip from "./HyperBeamerShip";
import timer from "../Utils/timer";
import StateMachine from "../Utils/StateMachine";
import trig from "../Utils/trig";
import Bullet from "./Bullet";
import SpaceGameObject from "./SpaceGameObject";
import PlayerShip from "./PlayerShip";
import State from "../Utils/State";
import Clock from "../Utils/Clock";
import TurnManager from "../Utils/TurnManager";

export default class HyperBeamerSType extends HyperBeamerShip
{
    static indexId: number = 0;

    constructor(scene: SpaceScene, x: number, y: number)
    {
        super(scene, x, y, "greenShip");

        this.setCollisionGroup(1);
        this.setCollidesWith(0);

        this.isShooting = true;

        this.bullets = scene.world.get.gameObjectArray("hyperBeamerSTypeGreenBullet");

        if(!this.bullets)
        {
            this.bullets = scene.world.add.gameObjectArray(Bullet, "hyperBeamerSTypeGreenBullet");
        }

        this.setDepth(1).setScale(2);

        scene.anims.create({
            key: "flying",
            frames: [{ key: "greenShip", frame: 0 }, { key: "greenShip", frame: 1 }],
            frameRate: 8,
            repeat: -1
        });

        this.anims.play("flying");

        var _this = this;

        // this.turnManager = {
        //     turning: false,
        //     targetAngle: _this.angle,
        //     turnStep: 0,
        //     callback: () => {},
        //     start: function(targetAngle: number, turnStep: number, callback?: () => void)
        //     {
        //         if(callback === undefined)
        //         {
        //             callback = () => {};
        //         }
                
        //         this.targetAngle = Phaser.Math.Wrap(targetAngle, -180, 180);
                
        //         this.turning = true;
        //         this.callback = callback;
        //         this.turnStep = turnStep;
        //     },
        //     update: function()
        //     {
        //         if(!this.turning)
        //         {
        //             return;
        //         }
        //         var angleDiff = Phaser.Math.Wrap(this.targetAngle - _this.angle, 0, 360);

        //         if(Math.abs(angleDiff) <= this.turnStep || _this.angle === this.targetAngle)
        //         {
        //             _this.angle = this.targetAngle;

        //             this.callback();
        //             this.turning = false;
        //             return;
        //         }

        //         if(angleDiff > 180)
        //         {
        //             _this.angle -= this.turnStep;
        //         }
        //         else
        //         {
        //             _this.angle += this.turnStep;
        //         }
        //     }
        // };

        this.turnManager = new TurnManager(this);

        this.setAngle(Phaser.Math.Angle.RandomDegrees());

        this.shootTimer = timer(true, 450, () =>
        {
            if(this.isShooting)
            {
                this.shoot();
            }
            this.shootTimer.reset();
        });

      
        this.move = false;

        class WanderState
        {
            private subState: string;
            private changeDirTimer: Clock;
            
            public start()
            {
                this.subState = "wander";

                this.changeDirTimer = new Clock(Phaser.Math.RND.between(750, 1500), true);
            }

            public update()
            {
                switch(this.subState)
                {
                    // Fly around randomly observing things
                    case "wander":
                        if(!_this.turnManager.isTurning() && this.changeDirTimer.isFinished())
                        {
                            _this.turnManager.startTurning(Phaser.Math.RND.between(0, 360), () =>
                            {
                                this.changeDirTimer.reset(Phaser.Math.RND.between(750, 1500));
                            });                            
                        }
                        break;

                    // Follow another ship as long as it's in view
                    case "attack":

                        break;

                    // If something hit this ship (like a bullet),
                    // inspect where it came from
                    case "inspect":

                        break;
                }
            }

            public stop()
            {

            }
        }

        this.sm = new StateMachine({
            "wander": new WanderState()
        });

        this.sm.start("wander");

        this.setFovStats(500, 70);


    }

    private turnManager: TurnManager;
    private sm: StateMachine;
    
    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);

        // this.sm.emit("update", []);

        this.turnManager.update();
        this.shootTimer.update();
    }

    public onCollide(object: SpaceGameObject): void
    {
        if(object._arrayName === "HyperBeamerSTypeBullet")
        {
            return;
        }
    }
    

    private shootTimer: {
        update: () => void,
        reset: () => void
    };

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
            this.bulletOnCollide,
            this,
        ) as Bullet;
        bullet.setAngle(this.angle);
        bullet.setCollisionGroup(2);
        bullet.setCollidesWith(0);
    }

    private shoot()
    {
        this.shootBullet(0, this.displayWidth / 2);
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
}