import SpaceScene from "../../scenes/space/SpaceScene";
import trig from "../Utils/trig";
import Bullet from "./Bullet";
import Ship from "./Ship";
import XPStar from "./XPStar";

export default class PlayerShip extends Ship
{
    public particles: Phaser.GameObjects.Particles.ParticleEmitterManager;
    private pEmitter: Phaser.GameObjects.Particles.ParticleEmitter;

    private keys: {
        turnLeft: Phaser.Input.Keyboard.Key;
        turnRight: Phaser.Input.Keyboard.Key;
        goForward: Phaser.Input.Keyboard.Key;
        slowDown: Phaser.Input.Keyboard.Key;
        shoot: Phaser.Input.Keyboard.Key;
        shootZ: Phaser.Input.Keyboard.Key;
    };

    protected hp: number = 10;
    protected maxHp: number = 10;

    public resetKeys()
    {
        for(var i in this.keys)
        {
            (this.keys as any)[i].reset();
        }
    }

    private xp: number = 0;
    private nextLevelXp: number = 100;

    public getXp(): number
    {
        return this.xp;
    }
    public getNextLevelXp(): number
    {
        return this.nextLevelXp;
    }
    
    private crests: number = 0;

    public collectCrests(crest: any)
    {
        this.crests += crest.amt;
    }

    public collectXPStars(xpStar: XPStar)
    {
        this.xp += xpStar.amt;
    }

    protected maxSpeed: number = 5;
    protected speedAcl: number = 0.25;
    protected speedDeacl: number = 0.025;
    protected manualSpeedDeacl: number = 0.15;
    protected angleDeacl: number = 0.12;
    
    protected destroyOnKill: boolean = false;

    constructor (scene: SpaceScene, x: number, y: number)
    {
        super(scene, x, y, "helixShip", undefined/*, { shape: scene.cache.json.get("helixShipShape").helixShip }*/);

        this.setCollisionGroup(2);
        this.setCollidesWith(0);

        this.useAngleAcl = true;
        this.angleVel = 0;

        this.keys = {
            turnLeft: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT), 
            turnRight: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            goForward: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            slowDown: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
            shoot: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            shootZ: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
        };

        this.bullets = scene.csp.world.add.gameObjectArray(Bullet, "playerShipBullet");

        this.scene.input.keyboard.on("keyup-Z", () =>
        {
            var theta = 30 + this.angle;
            var length = 25;
            var bullet = this.bullets.add(this.scene, this.x + trig.cos(theta) * length, this.y + trig.sin(theta) * length, "helixShipLvl1Bullet") as Bullet;
            bullet.setAngle(this.angle);

            theta = 150 + this.angle;
            length = 25;
            bullet = this.bullets.add(this.scene, this.x + trig.cos(theta) * length, this.y + trig.sin(theta) * length, "helixShipLvl1Bullet") as Bullet;
            bullet.setAngle(this.angle);

            theta = this.angle - 20;
            length = 17;
            bullet = this.bullets.add(this.scene, this.x + trig.cos(theta) * length, this.y + trig.sin(theta) * length, "helixShipLvl1Bullet") as Bullet;
            bullet.setAngle(this.angle);

            theta = 200 + this.angle;
            length = 17;
            bullet = this.bullets.add(this.scene, this.x + trig.cos(theta) * length, this.y + trig.sin(theta) * length, "helixShipLvl1Bullet") as Bullet;
            bullet.setAngle(this.angle);
        });

        this.particles = scene.add.particles("helixShipParticle");

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
        
        this.controls = {
            turnLeft: () =>
            {
                return this.keys.turnLeft.isDown;
            },
            turnRight: () =>
            {
                return this.keys.turnRight.isDown;
            },
            goForward: () =>
            {
                return this.keys.goForward.isDown;
            },
            slowDown: () =>
            {
                return this.keys.slowDown.isDown;
            },
            shoot: () =>
            {
                return false;
            }         
        };
    }

    private bullets: any; 

    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);

        var length = this.height * this.scaleX * 0.4;
        this.particles.x = this.x + trig.cos(this.angle + 90) * length;
        this.particles.y = this.y + trig.sin(this.angle + 90) * length;
        this.pEmitter.setAngle(this.angle + 67.5 + 45 * Math.random());
        this.pEmitter.setVisible(this.speed > 0.0);
        this.pEmitter.setSpeed(this.speed * 30);
    }

    protected onKill()
    {
        (this.scene as SpaceScene).handleGameOver();
    }
}