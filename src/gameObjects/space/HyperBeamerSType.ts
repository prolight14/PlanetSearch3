import SpaceScene from "../../scenes/space/SpaceScene";
import HyperBeamerShip from "./HyperBeamerShip";
import timer from "../Utils/timer";
import StateMachine from "../Utils/StateMachine";
import XPStar from "./XPStar";
import trig from "../Utils/trig";
import HyperBeamerSTypeBullet from "./HyperBeamerSTypeBullet";

export default class HyperBeamerSType extends HyperBeamerShip
{
    constructor(scene: SpaceScene, x: number, y: number)
    {
        super(scene, x, y, "hyperBeamerSTypeGreen");

        this.setCollisionGroup(1);
        this.setCollidesWith(0);

        this.isShooting = true;

        this.particles = scene.add.particles("hyperBeamerSTypeGreenParticle");

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

        this.sm = new StateMachine({
            "wander": {
                start: function()
                {
                    this.changeDirTimer = timer(true, 1000, () =>
                    {
                        this.turn(Math.random() < 0.5 ? "left" : "right", Phaser.Math.RND.between(300, 800), () =>
                        {
                            this.changeDirTimer.reset(Phaser.Math.RND.between(3000, 7000));
                        });
                    });
                },
                turn: function(turnDir: string, time: number, callback: Function)
                {
                    _this.turnDir = turnDir;

                    this.redirectTimer = timer(true, time, () =>
                    {
                        _this.turnDir = "";
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
                }
            }
        });

        this.sm.start("wander");

        // this.shootTimer = timer(false, 750, () =>
        // {
        //     var theta = this.angle;
        //     var length = 25;
        //     var bullet = this.bullets.add(this.scene, this.x + trig.cos(theta) * length, this.y + trig.sin(theta) * length, this.angle - 90) as HyperBeamerSTypeBullet;
        //     bullet.setAngle(this.angle);

        //     this.shootTimer.reset();
        // });
    }
    private sm: StateMachine;

    private particles: Phaser.GameObjects.Particles.ParticleEmitterManager;
    private pEmitter: Phaser.GameObjects.Particles.ParticleEmitter;

    private bullets: any;

    public setBullets(bullets: any)
    {
        this.bullets = bullets;
    }

    private millis(): number
    {
        return performance.now();
    }

    private lastShootTime: number = this.millis();

    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);

        var length = this.height * this.scaleX * 0.4;
        this.particles.x = this.x + trig.cos(this.angle + 90) * length;
        this.particles.y = this.y + trig.sin(this.angle + 90) * length;
        this.pEmitter.setAngle(this.angle + 67.5 + 45 * Math.random());
        this.pEmitter.setVisible(this.speed > 0.005);
        this.pEmitter.setSpeed(this.speed * 30);

        this.sm.emit("update", []);

        if(this.controls.shoot() && this.millis() - this.lastShootTime > 500)
        {
            this.shoot();

            this.lastShootTime = this.millis();
        }
    }

    private shoot()
    {
        var theta = this.angle;
        var length = 25;
        var bullet = this.bullets.add(this.scene, this.x + trig.cos(theta) * length, this.y + trig.sin(theta) * length, this.angle - 90) as HyperBeamerSTypeBullet;
        bullet.setAngle(this.angle);
    }

    protected onKill()
    {
        super.onKill();

        this.particles.destroy();
    }

    // private shootTimer: {
    //     update: () => void;
    //     reset: (newInterval?: number, _args?: Array<any>) => void;
    // };

    // public shoot()
    // {
    //     this.shootTimer.update();
    // }
}