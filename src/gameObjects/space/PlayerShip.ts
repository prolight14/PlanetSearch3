import SpaceScene from "../../scenes/space/SpaceScene";
import timer from "../Utils/timer";
import trig from "../Utils/trig";
import Bullet from "./Bullet";
import HyperBeamerSType from "./HyperBeamerSType";
import Ship from "./Ship";
import SpaceGameObject from "./SpaceGameObject";
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
        // shoot: Phaser.Input.Keyboard.Key;
        // shootZ: Phaser.Input.Keyboard.Key;
    };

    public scene: SpaceScene;

    protected hp: number = 10;
    protected maxHp: number = 10;

    private xp: number = 0;
    private nextLevelXp: number = 100;

    public resetStats()
    {
        this.resetKeys();
        this.killed = false;
        this.hp = this.maxHp;
    }
 
    public resetKeys()
    {
        for(var i in this.keys)
        {
            (this.keys as any)[i].reset();
        }
    }

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

    protected maxSpeed: number = 7.5;
    protected speedAcl: number = 0.25;
    protected speedDeacl: number = 0.075;
    protected manualSpeedDeacl: number = 0.15;
    // protected angleDeacl: number = 0.12;
    protected angleDeacl: number = 0.2;

    protected destroyOnKill: boolean = false;

    private shootLimiterTimer: {
        update: () => any;
        reset: (newInterval?: number, _args?: Array<any>) => any;
    };
    private canShoot: boolean = true;

    constructor (scene: SpaceScene, x: number, y: number)
    {
        super(scene, x, y, "helixShip", undefined/*, { shape: scene.cache.json.get("helixShipShape").helixShip }*/);

        this.ignoreDestroy = true;

        this.setCollisionGroup(2);
        this.setCollidesWith(0);

        this.useAngleAcl = true;
        this.angleVel = 0;

        this.keys = {
            turnLeft: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT), 
            turnRight: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            goForward: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            slowDown: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
            // shoot: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            // shootZ: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
        };

        if(!(this.bullets = scene.world.get.gameObjectArray("playerShipBullet")))
        {
            this.bullets = scene.world.add.gameObjectArray(Bullet, "playerShipBullet");
            this.bullets.define("ignoreDestroy", true);
        }

        this.scene.input.keyboard.on("keyup-Z", () =>
        {
            if(this.canShoot)
            {
                this.shoot();
                this.canShoot = false;
            }
        });
        this.scene.input.keyboard.on("keyup-SPACE", () =>
        {
            if(this.canShoot)
            {
                this.shoot();
                this.canShoot = false;
            }
        });

        const shootInterval = 200;

        this.shootLimiterTimer = timer(true, shootInterval, () =>
        {
            this.canShoot = true;
            this.shootLimiterTimer.reset();
        });


        this.particles = scene.add.particles("helixShipParticle");

        this.pEmitter = this.particles.createEmitter({
            lifespan: 500,
            scale: { start: 1.5, end: 0 },
            rotate: 45,
            x: 0,
            y: 0,
            quantity: 1,
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

    private shoot()
    {
        this.initBullet(this.angle + 30, 25);
        this.initBullet(this.angle + 150, 25);
        this.initBullet(this.angle - 20, 17);
        this.initBullet(this.angle + 200, 17);
    }

    private initBullet(theta: number, length: number, life?: number)
    {
        var bullet = this.bullets.add(
            this.scene, 
            this.x + trig.cos(theta) * length, 
            this.y + trig.sin(theta) * length, 
            "lightningBlueLong", 
            this.angle - 90,
            life || 2500,
            this.bulletOnCollide,
            this,
        ) as Bullet;
        bullet.speed = 16;
        bullet.setComparePosition(this.x, this.y);
        bullet.setAngle(this.angle);
        bullet.setCollisionGroup(1);
        bullet.setCollidesWith(0);
    }

    private bulletOnCollide(gameObject: SpaceGameObject): boolean
    {
        if(gameObject._arrayName === "hyperBeamerSType")
        {
            // It may have hit according to the takeDamage method
            return (gameObject as HyperBeamerSType).takeDamage(this);
        }

        // Didn't hit since there were no relevant gameObjects
        return false;
    }

    private bullets: any; 

    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);

        var length = this.height * this.scaleX * 0.4;
        this.particles.x = this.x + trig.cos(this.angle + 90) * length;
        this.particles.y = this.y + trig.sin(this.angle + 90) * length;
        this.pEmitter.setAngle(this.angle + 67.5 + 45 * Phaser.Math.RND.frac());
        this.pEmitter.setVisible(this.speed > 0.0);
        this.pEmitter.setSpeed(this.speed * 30);

        this.shootLimiterTimer.update();
    }

    protected onKill()
    {
        super.onKill();
        (this.scene as SpaceScene).handleGameOver();
    }
}