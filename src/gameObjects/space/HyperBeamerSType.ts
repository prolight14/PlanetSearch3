import SpaceScene from "../../scenes/space/SpaceScene";
import HyperBeamerShip from "./HyperBeamerShip";
import timer from "../Utils/timer";
import StateMachine from "../Utils/StateMachine";
import trig from "../Utils/trig";
import Bullet from "./Bullet";
import SpaceGameObject from "./SpaceGameObject";
import PlayerShip from "./PlayerShip";
import State from "../Utils/State";

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

        this.turnManager = {
            turning: false,
            targetAngle: _this.angle,
            turnStep: 0,
            callback: () => {},
            start: function(targetAngle: number, turnStep: number, callback?: () => void)//: boolean
            {
                if(callback === undefined)
                {
                    callback = () => {};
                }
                
                this.targetAngle = Phaser.Math.Wrap(targetAngle, -180, 180);
                
                this.turning = true;
                this.callback = callback;
                this.turnStep = turnStep;
            },
            update: function()
            {
                if(!this.turning)
                {
                    return;
                }
                var angleDiff = Phaser.Math.Wrap(this.targetAngle - _this.angle, 0, 360);

                if(Math.abs(angleDiff) <= this.turnStep || _this.angle === this.targetAngle)
                {
                    _this.angle = this.targetAngle;

                    this.callback();
                    this.turning = false;
                    return;
                }

                if(angleDiff > 180)
                {
                    _this.angle -= this.turnStep;
                }
                else
                {
                    _this.angle += this.turnStep;
                }
            }
        };

        class WanderState extends State
        {
            private turnSpeed: number = 3;

            private turnToTarget: boolean;
            private targetTurnAngle: number;
            private changeDirTimer: { update: () => void; reset: (time?: number) => void; };

            turnInterval()
            {
                return Phaser.Math.RND.between(750, 2100);
            }

            start()
            {
                _this.isShooting = false;
                this.turnToTarget = false;
                this.targetTurnAngle = 0;

                this.changeDirTimer = timer(true, this.turnInterval(), () =>
                {
                    if(this.turnToTarget)
                    {
                        _this.turnManager.start(this.targetTurnAngle, 6, () => 
                        {
                            this.changeDirTimer.reset(this.turnInterval());
                        });      

                        this.turnToTarget = false;
                        this.targetTurnAngle = 0;
                    }
                    else
                    {
                        _this.turnManager.start(_this.angle + Phaser.Math.RND.between(0, 360), this.turnSpeed, () =>
                        {
                            this.changeDirTimer.reset(this.turnInterval());
                        }); 
                    }
                });
            }

            public update()
            {
                this.changeDirTimer.update();

                _this.isShooting = false;
                
                for(var i = 0; i < _this.visibleObjects.length; i++)
                {
                    const object = _this.visibleObjects[i] as {
                        gameObject: SpaceGameObject; 
                        angleBetween: number;
                    };

                    const _arrayName = object.gameObject._arrayName;

                    if(_this.shouldTarget(_arrayName))
                    {
                        this.startAttackState();
                        return;
                    }

                    if(_arrayName === "playerShip")
                    {
                        _this.isShooting = true;
                        this.targetTurnAngle = object.angleBetween; 
                        this.turnToTarget = true;
                        break;
                    }
                }
            }

            private startAttackState()
            {
                _this.sm.stop("wander");
                _this.sm.start("attack");
                _this.sm.states.attack.updateTarget();
            }
        }

        class AttackState extends State
        {
            private lastSceneTarget: {
                x: number;
                y: number;
                _arrayName: number
            };

            private updateTarget(x: number, y: number, _arrayName: number)
            {
                this.lastSceneTarget = {
                    x: x,
                    y: y,
                    _arrayName: _arrayName
                };
            }

            public start()
            {
                _this.isShooting = true;
            }

            public update()
            {

            }
        }
        
        this.sm = new StateMachine({
            "wander": new WanderState(),
            "attack": new AttackState()
        });

        this.setAngle(Phaser.Math.RND.frac() * 360);

        this.sm.start("wander");

        this.shootTimer = timer(true, 450, () =>
        {
            if(this.isShooting)
            {
                this.shoot();
            }
            this.shootTimer.reset();
        });

        this.setFovStats(1000, 70);
    

        this.move = true;
    }

    private shouldTarget(_arrayName: string): boolean
    {
        switch(_arrayName)
        {
            case "playerShip":
                return true;
        }

        return false;
    }

    private turnManager: any;

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

    private shoot()
    {
        this.shootBullet(0, this.displayWidth / 2);
    }

    private sm: StateMachine;
    
    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);

        this.sm.emit("update", []);

        this.turnManager.update();
        this.shootTimer.update();
    }
}