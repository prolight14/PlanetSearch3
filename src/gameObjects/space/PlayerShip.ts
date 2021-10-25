import SpaceScene from "../../scenes/space/SpaceScene";
import timer from "../Utils/timer";
import PlayerShipBullet from "./PlayerShipBullet";
import Ship from "./Ship";

export default class PlayerShip extends Ship
{
    public particles: Phaser.GameObjects.Particles.ParticleEmitterManager;
    private pEmitter: Phaser.GameObjects.Particles.ParticleEmitter;

    constructor (scene: SpaceScene, x: number, y: number)
    {
        super(scene, x, y, "helixShip");

        this.useAngleAcl = true;
        this.angleVel = 0;

        this.keys = {
            a: scene.input.keyboard.addKey('a'), 
            d: scene.input.keyboard.addKey('d'),
            w: scene.input.keyboard.addKey('w'),
            s: scene.input.keyboard.addKey('s'),
            space: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        };

        this.particles = scene.add.particles("helixShipParticle");

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
        
        this.controls = {
            turnLeft: () =>
            {
                return this.keys.a.isDown;
            },
            turnRight: () =>
            {
                return this.keys.d.isDown;
            },
            goForward: () =>
            {
                return this.keys.w.isDown;
            },
            slowDown: () =>
            {
                return this.keys.s.isDown;
            },
            shoot: () =>
            {
                return this.keys.space.isDown;
            }         
        };
        
        this.setScale(1, 1);
        this.speed = 6;

        this.setupShootTimer();
    }
    
    private setupShootTimer()
    {
        this.shootTimer = timer(true, 750, () =>
        {
            if(this.controls.shoot())
            {
                this.bullets.add(this.scene, this.x, this.y, this.angle - 90);
            }

            this.shootTimer.reset();
        });
    }

    private shootTimer: any;

    public setBullets(playerShipBullets: any)
    {
        this.bullets = playerShipBullets
    }

    private bullets: any;

    public keys: any;
    
    public preUpdate()
    {
        Ship.prototype.preUpdate.apply(this, arguments);

        var rot = this.rotation + Math.PI / 2;

        this.particles.x = this.x + Math.cos(rot) * this.height;
        this.particles.y = this.y + Math.sin(rot) * this.height;
        this.pEmitter.setAngle(this.angle + 90 + 90 * Math.random() - 45);
        this.pEmitter.setVisible(this.speed >= 0.005);
        this.pEmitter.setSpeed(this.speed * 10);
        
        this.shootTimer.update();
    }
}