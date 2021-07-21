import SpaceScene from "../../scenes/space/SpaceScene";
import Ship from "./Ship";

export default class PlayerShip extends Ship
{
    public particles: Phaser.GameObjects.Particles.ParticleEmitterManager;
    private pEmitter: Phaser.GameObjects.Particles.ParticleEmitter;

    constructor (scene: SpaceScene, x: number, y: number)
    {
        super(scene, x, y, "helixShip");

        this.keys = {
            a: scene.input.keyboard.addKey('a'), 
            d: scene.input.keyboard.addKey('d'),
            w: scene.input.keyboard.addKey('w'),
            s: scene.input.keyboard.addKey('s')
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
            alpha: { min: 0x00, max: 0xFF }
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
            shoot: () => false         
        };
        
        this.setScale(1, 1);
        this.angleVel = 3;
        this.speed = 6;
    }
    
    public keys: any;
    
    public preUpdate()
    {
        Ship.prototype.preUpdate.apply(this, arguments);

        var rot = this.rotation + Math.PI / 2;

        this.particles.x = this.x + Math.cos(rot) * this.height;
        this.particles.y = this.y + Math.sin(rot) * this.height;
        this.pEmitter.setAngle(this.angle + 90 + 90 * Math.random() - 45);
        this.pEmitter.setVisible(this.speed >= 0.005);
        this.pEmitter.setSpeed(this.speed * 100 / 10);
        
    }
}