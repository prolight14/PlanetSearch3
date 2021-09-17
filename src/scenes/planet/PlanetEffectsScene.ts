import PlanetLogicScene from "./PlanetLogicScene";

interface Sounds {
    [key: string]: Phaser.Sound.BaseSound;
}

export default class PlanetEffectsScene extends Phaser.Scene
{
    constructor()
    {
        super("planetEffects");
    }    

    public preload()
    {
        this.load.audio("brickBreak", "./assets/Planet/Sounds/quickBoom.wav")

        this.load.spritesheet("brick", "./assets/Planet/GameObjects/blocks/brick.png", {
            frameWidth: 8,
            frameHeight: 8,
        });
    }
    
    private brickParticles: Phaser.GameObjects.Particles.ParticleEmitterManager
    private brickEmitter: Phaser.GameObjects.Particles.ParticleEmitter

    private logicCam: Phaser.Cameras.Scene2D.Camera;

    private sounds: Sounds;

    public create()
    {
        this.brickParticles = this.add.particles("brick");
        this.brickEmitter = this.brickParticles.createEmitter({
            gravityY: 1600,
            lifespan: 5000
        });
        this.brickEmitter.stop();

        this.logicCam = this.scene.get("planetLogic").cameras.main;

        this.sounds = {
            brickBreak: this.sound.add("brickBreak")
        };
    }

    private playSound(key: string)
    {
        this.sounds[key].play();
    };
    
    public emitBricks(bounds: Phaser.Geom.Rectangle)
    {
        this.logicCam = this.scene.get("planetLogic").cameras.main;

        const emitter = this.brickEmitter;

        const xSpeed = 20;
        const ySpeed = 300;

        emitter.setFrame(0).setSpeedX(-xSpeed).setSpeedY(-ySpeed).emitParticleAt(bounds.x + 0.25 * bounds.width, bounds.y + 0.25 * bounds.height);
        emitter.setFrame(1).setSpeedX(xSpeed).setSpeedY(-ySpeed).emitParticleAt(bounds.x + 0.75 * bounds.width, bounds.y + 0.25 * bounds.height);
        emitter.setFrame(2).setSpeedX(-xSpeed * 2).setSpeedY(-ySpeed).emitParticleAt(bounds.x + 0.25 * bounds.width, bounds.y + 0.75 * bounds.height);
        emitter.setFrame(3).setSpeedX(xSpeed * 2).setSpeedY(-ySpeed).emitParticleAt(bounds.x + 0.75 * bounds.width, bounds.y + 0.75 * bounds.height);

        this.playSound("brickBreak");
    }

    public update(time: number, delta: number)
    {
        var mainCam = this.cameras.main;
        var logicCam = this.logicCam;
        mainCam.setScroll(logicCam.scrollX, logicCam.scrollY);
        mainCam.setZoom(logicCam.zoom);
    }

    public fadeOut(...args: any[])
    {
        this.cameras.main.fadeOut.apply(this.cameras.main, arguments);
    }

    public fadeIn(...args: any[])
    {
        this.cameras.main.fadeIn.apply(this.cameras.main, arguments);
    }
}