import SpaceScene from "../../scenes/space/SpaceScene";
import HyperBeamerShip from "./HyperBeamerShip";
import timer from "../Utils/timer";
import StateMachine from "../Utils/StateMachine";
import trig from "../Utils/trig";
import Bullet from "./Bullet";
import SpaceGameObject from "./SpaceGameObject";
import PlayerShip from "./PlayerShip";

export default class HyperBeamerSType extends HyperBeamerShip
{
    static indexId: number = 0;

    constructor(scene: SpaceScene, x: number, y: number)
    {
        super(scene, x, y, "hyperBeamerSTypeGreen");

        this.setCollisionGroup(1);
        this.setCollidesWith(0);

        this.isShooting = true;

        this.particles = scene.add.particles("hyperBeamerSTypeGreenParticle");

        // this.bullets = scene.csp.world.get.gameObjectArray("hyperBeamerSTypeGreenBullet");

        // if(!this.bullets)
        // {
        //     this.bullets = scene.csp.world.add.gameObjectArray(Bullet, "hyperBeamerSTypeGreenBullet");
        // }

        this.pEmitter = this.particles.createEmitter({
            lifespan: 500,
            scale: 1.5,
            rotate: 0,
            x: 0,
            y: 0,
            quantity: 1
        });

        this.pEmitter.setAlpha(function(p: any, k: any, t: number)
        {
            return 1 - t;
        });

        var _this = this;
        const world = scene.csp.world;

        this.sm = new StateMachine({
            "wander": {
                start: function()
                {
                    _this.isShooting = false;
                    this.cancelTurnTimers = false;

                    this.changeDirTimer = timer(true, 1000, () =>
                    {
                        this.turn(Phaser.Math.RND.frac() < 0.5 ? "left" : "right", "", Phaser.Math.RND.between(150, 350), undefined, () =>
                        {
                            this.changeDirTimer.reset(Phaser.Math.RND.between(3000, 7000) * 2);
                        });
                    });
                },
                turn: function(turnDir: string, oldTurn: string | undefined, time: number, maxTurnAmt: number | undefined, callback: Function)
                {
                    if(callback === undefined) { callback = () => {}; }
                    _this.turnDir = turnDir;

                    this.redirectTimer = timer(true, time, () =>
                    {
                        _this.turnDir = oldTurn || "";
                        callback();
                    });
                },
                update: function()
                {
                    this.changeDirTimer.update();

                    if(this.redirectTimer !== undefined)
                    {
                        this.redirectTimer.update();
                    }

                    _this.visibleObjects.forEach((object: any) =>
                    {
                        const gameObject = object.gameObject;

                        switch(gameObject._arrayName)
                        {
                            case "playerShip":
                                _this.sm.stop("wander");
                                _this.sm.start("follow");
                                break;

                            case _this._arrayName:
                                
                                this.turn(object.angleBetween - _this.angle > 0 ? "left" : "right", "", 200, undefined, () => {});
                                break;
                        }
                    });
                }
            },
            "follow": {
                start: function()
                {
                    _this.isShooting = true;
                    _this.turnDir = "";
                },
                update: function()
                {
                    _this.shootTimer.update();
                }
            },
        });

        this.setAngle(Phaser.Math.RND.frac() * 360);

        this.sm.start("wander");

        this.shootTimer = timer(true, 500, () =>
        {
            if(this.isShooting)
            {
                this.shoot();
            }
            this.shootTimer.reset();
        });
    }

    private shootTimer: {
        update: () => void,
        reset: () => void
    };

    private bullets: any;

    private shootBullet(theta: number, length: number, life?: number)
    {
        var bullet = this.bullets.add(
            this.scene, 
            this.x + trig.cos(theta) * length, 
            this.y + trig.sin(theta) * length, 
            "helixShipLvl1Bullet", 
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
        // this.shootBullet(0, 20);
    }

    private sm: StateMachine;

    private particles: Phaser.GameObjects.Particles.ParticleEmitterManager;
    private pEmitter: Phaser.GameObjects.Particles.ParticleEmitter;

    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);

        var length = this.displayHeight * 0.4;
        this.particles.x = this.x + trig.cos(this.angle + 90) * length;
        this.particles.y = this.y + trig.sin(this.angle + 90) * length;
        this.pEmitter.setAngle(this.angle + 67.5 + 45 * Phaser.Math.RND.frac());
        this.pEmitter.setVisible(this.speed > 0.005);
        this.pEmitter.setSpeed(this.speed * 30);

        this.sm.emit("update", []);
    }

    protected onKill()
    {
        super.onKill();

        this.particles.destroy();
    }
}