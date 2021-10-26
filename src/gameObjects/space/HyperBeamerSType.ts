import SpaceScene from "../../scenes/space/SpaceScene";
import HyperBeamerShip from "./HyperBeamerShip";
import timer from "../Utils/timer";
import StateMachine from "../Utils/StateMachine";

export default class HyperBeamerSType extends HyperBeamerShip
{
    constructor(scene: SpaceScene, x: number, y: number)
    {
        super(scene, x, y, "hyperBeamerSTypeGreen");

        this.particles = scene.add.particles("hyperBeamerSTypeGreenParticle");

        this.pEmitter = this.particles.createEmitter({
            lifespan: 500,
            scale: 1.5,
            speed: 70,
            angle: { min: 65, max: 115 },
            rotate: 0,
            x: 0,
            y: 0,
            quantity: 1,
            // alpha: { min: 0x00, max: 0xFF }
            alpha: {
                start: 0xFF,
                end: 0x00,
                steps: 10
            }
        });

        this.move = false;

        var _this = this;

        this.sm = new StateMachine({
            "wander": {
                start: function()
                {
                    this.changeDirTimer = timer(true, 500, (stopTurningTime?: number) =>
                    {
                        // _this.turnDir = Math.random() < 0.5 ? "left" : "right";

                        // console.log(_this.turnDir);

                        this.turn(Math.random() < 0.5 ? "left" : "right", stopTurningTime || 500, () =>
                        {
                            this.changeDirTimer.reset(Phaser.Math.Between(500, 1500), [Phaser.Math.Between(500, 1500)]);
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

        // this.sm.start("wander");
    }

    private sm: StateMachine;

    private particles: Phaser.GameObjects.Particles.ParticleEmitterManager;
    private  pEmitter: Phaser.GameObjects.Particles.ParticleEmitter;
 
    public preUpdate()
    {
        HyperBeamerShip.prototype.preUpdate.apply(this, arguments);

        var rot = this.rotation + Math.PI / 2;

        this.particles.x = this.x + Math.cos(rot) * this.height * 0.8;
        this.particles.y = this.y + Math.sin(rot) * this.height * 0.8;
        this.pEmitter.setAngle(this.angle + 90 + 90 * Math.random() - 45);
        this.pEmitter.setVisible(this.speed >= 0.005);
        this.pEmitter.setSpeed(this.speed * 10);

        this.sm.emit("update", []);
    }
}