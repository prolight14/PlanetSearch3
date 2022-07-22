import SpaceScene from "../../scenes/space/SpaceScene";
import HyperBeamerShip from "./HyperBeamerShip";
import timer from "../Utils/timer";
import StateMachine from "../Utils/StateMachine";
import trig from "../Utils/trig";
import Bullet from "./Bullet";
import SpaceGameObject from "./SpaceGameObject";
import PlayerShip from "./PlayerShip";
import TurnManager from "../Utils/TurnManager";
import State from "../Utils/State";
import Clock from "../Utils/Clock";

export default class HyperBeamerSType extends HyperBeamerShip
{
    static indexId: number = 0;

    constructor(scene: SpaceScene, x: number, y: number)
    {
        super(scene, x, y, "greenShip");

        // this.setCollisionGroup(1);
        // this.setCollidesWith(0);

        this.bullets = scene.world.get.gameObjectArray("hyperBeamerSTypeGreenBullet");

        if(!this.bullets)
        {
            this.bullets = scene.world.add.gameObjectArray(Bullet, "hyperBeamerSTypeGreenBullet");
        }

        this.ignoreObjNames = ["hyperBeamerSTypeGreenBullet", "purpleNebula", "grayNebula"];

        this.setDepth(1).setScale(2);

        scene.anims.create({
            key: "flying",
            frames: [{ key: "greenShip", frame: 0 }, { key: "greenShip", frame: 1 }],
            frameRate: 8,
            repeat: -1
        });

        this.anims.play("flying");

        const _this = this;

        this.turnManager = new TurnManager(this);

        this.shootTimer = timer(true, 450, () =>
        {
            if(this.isShooting)
            {
                this.shoot();
            }
            this.shootTimer.reset();
        });

        const defaultMaxSpeed: number = this.maxSpeed; 

        const avoidLimits = {
            changeDir: 450,
            slowdown: 120,
            turnAround: 30,

            changeDirSquared: 0,
            slowdownSquared: 0,
            turnAroundSquared: 0,

            avoidAngleAmt: 50,
        };  

        avoidLimits.changeDirSquared = avoidLimits.changeDir * avoidLimits.changeDir;
        avoidLimits.slowdownSquared = avoidLimits.slowdown * avoidLimits.slowdown;
        avoidLimits.turnAroundSquared = avoidLimits.turnAround * avoidLimits.turnAround;

        type vObj = { 
            _arrayName: string 

            angleDiff: number, 
            angleBetween: number, 

            distanceSquared: number,
        };

        class WanderState extends State
        {
            private subState: string;
            private lastSubState: string;
            private wanderTurnTimer: { update: () => void, reset: (time: number) => void };
            private turningTowardsTarget: boolean = false;
            private lookTimer: { update: () => void, reset: (time: number) => void };

            private randomInt(min: number, max: number): number
            {
                return Phaser.Math.RND.between(min, max);
            }

            private getNextTurnTime(): number
            {
                return this.randomInt(1000, 3000);
            }

            private getNextTurnAngle(): number
            {
                return Phaser.Math.RND.angle();
            }

            public start()
            {
                this.subState = "wander";
                _this.isShooting = false;

                this.wanderTurnTimer = timer(true, this.getNextTurnTime(), () =>
                {
                    _this.turnManager.startTurning(this.getNextTurnAngle(), () => this.wanderTurnTimer.reset(this.getNextTurnTime()));
                });

                this.lookTimer = timer(true, 300, () => 
                {
                    this.look();
                    this.lookTimer.reset(300);
                })
            }

            public update()
            {
                this.runSubStates();
            }
 
            private setSubState(state: string)
            {
                if(this.subState !== state)
                {
                    this.lastSubState = this.subState;
                    this.subState = state;
                }
            }

            private look()
            {
                for(var i = 0; i < _this.visibleObjects.length; i++)
                {
                    const { _arrayName, distanceSquared, angleDiff, angleBetween }: vObj = _this.visibleObjects[i];

                    switch(true)
                    {
                        case _arrayName === _this._arrayName: 
                        case _this.getType() === "projectile":
                            // this.setSubState("redirect");
                            this.subState = "redirect";

                            if(distanceSquared > avoidLimits.changeDirSquared)
                            {
                                break;
                            }

                            var redirectAngle = _this.angle + avoidLimits.avoidAngleAmt * (angleDiff < 0 ? 1 : -1);

                            if(distanceSquared < avoidLimits.slowdownSquared)
                            {
                                _this.maxSpeed = 2.5;

                                // if(distanceSquared < avoidLimits.turnAroundSquared)
                                // {
                                //     redirectAngle = _this.angle + (angleDiff < 0 ? 1 : -1) * 90;
                                //     _this.maxSpeed = 0.5;
                                // }
                            }

                            _this.turnManager.startTurning(redirectAngle, () =>
                            {
                                this.subState = "wander";
                                _this.maxSpeed = defaultMaxSpeed;

                                // if(this.subState === "wander")
                                // {
                                    this.wanderTurnTimer.reset(this.getNextTurnTime());
                                // }
                            });
                            return;
                    }
                }
            }

            private offense()
            {
                var canSeeEnemy: boolean = false;

                for(var i = 0; i < _this.visibleObjects.length; i++)
                {
                    const { _arrayName, distanceSquared, angleDiff, angleBetween }: vObj = _this.visibleObjects[i];

                    switch(true)
                    {
                        case _arrayName === "playerShip": 

                        // if(distanceSquared < 30 * 30)
                        // {
                        //     this.subState = "loopAround";

                        //     return;
                        // }

                        if(this.subState === "wander")
                        {
                            // this.setSubState("attack");
                            this.subState = "attack";
                            _this.isShooting = true;
                            canSeeEnemy = true;

                            if(!this.turningTowardsTarget)
                            {
                                var redirectAngle = _this.angle + angleDiff * 0.2;
                                this.turningTowardsTarget = true;

                                _this.turnManager.startTurning(redirectAngle, () =>
                                {
                                    this.turningTowardsTarget = false;
                                    _this.isShooting = false;
                                });
                            }
                        }
                        break;
                    }
                }

                if(!canSeeEnemy)
                {
                    this.subState = "wander";
                    _this.isShooting = false;
                    this.turningTowardsTarget = false;
                }
            }

            private runSubStates()
            {
                switch(this.subState)
                {
                    // Fly around randomly observing things
                    case "wander":
                        this.wanderTurnTimer.update();
                        // this.look();
                        this.lookTimer.update();
                     
                        break;
                        
                    case "redirect":

                        break;
                    
                    // Follow another ship and attack it as long as it's in view
                    case "attack":
                        // this.look();
                        this.lookTimer.update();
                        // this.offense();
                        break;

                    case "loopAround":
                        // this.look();
                        this.lookTimer.update();
                        // this.offense();
                        break;

                    // If something hit this ship (like a bullet),
                    // Instead take evasive action
                    case "evade":
                        
                        break;
                }

                this.offense();
            }

            public stop()
            {

            }
        }

        this.sm = new StateMachine({
            "wander": new WanderState()
        });

        this.sm.start("wander");
        
        this.setAngle(Phaser.Math.RND.angle());
        this.setFovStats(500, 70);
        this.isMoving = true;
        this.isShooting = false;
    }

    private turnManager: TurnManager;
    private sm: StateMachine;
    
    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);

        this.sm.emit("update", []);

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
            3000,
            this.bulletOnCollide,
            this,
        ) as Bullet;
        bullet.setAngle(this.angle);
        // bullet.setCollisionGroup(2);
        // bullet.setCollidesWith(0);
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