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
        slowdown: Phaser.Input.Keyboard.Key;
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
    protected speedAcl: number = 0.2;//0.25;
    protected speedDeacl: number = 0.0745;
    protected manualSpeedDeacl: number = 0.15;
    protected angleDeacl: number = 0.06;
    // protected angleDeacl: number = 0.2;

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
            slowdown: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
            // shoot: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            // shootZ: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
        };

        if(!(this.bullets = scene.world.get.gameObjectArray("playerShipBullet")))
        {
            this.bullets = scene.world.add.gameObjectArray(Bullet, "playerShipBullet");
            this.bullets.define("ignoreDestroy", true);
        }

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

        // For Nintendo Switch Pro Controller
        const BTNS = {
            B: 0,
            A: 1,
            Y: 2,
            X: 3,

            L: 4,
            R: 5,
            ZL: 6,
            ZR: 7,
        };

        if (scene.input.gamepad !== undefined &&
            scene.input.gamepad.total > 0 &&
            scene.input.gamepad.gamepads.length > 0)
        {
            this.usingGamepad = true;
            this.gamepad = scene.input.gamepad.gamepads[0];
        }

        scene.input.gamepad.on('connected', function (gamepad: Phaser.Input.Gamepad.Gamepad)
        {
            this.usingGamepad = true;
            this.gamepad = gamepad;
        });

        scene.input.gamepad.on('disconnected', function (gamepad: Phaser.Input.Gamepad.Gamepad)
        {
            this.usingGamepad = false;
            delete this.gamepad;
        });

        scene.input.gamepad.on('down', (gamepad: Phaser.Input.Gamepad.Gamepad, button: Phaser.Input.Gamepad.Button, value: number) =>
        {
            if(value !== 1)
            {
                return;
            }

            if(!this.usingGamepad)
            {
                this.gamepad = gamepad;
                this.usingGamepad = true;
            }

            if(button.index === BTNS.ZL)
            {
                this.gamepadControls.forward = true;
            }
            if(button.index === BTNS.B)
            {
                this.gamepadControls.slowdown = true;
            }
        });
        
        scene.input.gamepad.on('up', (gamepad: Phaser.Input.Gamepad.Gamepad, button: Phaser.Input.Gamepad.Button, value: number) =>
        {
            if(value !== 0)
            {
                return;
            }
 
            if(button.index === BTNS.ZL)
            {
                this.gamepadControls.forward = false;
            }
            if(button.index === BTNS.B)
            {
                this.gamepadControls.slowdown = false;
            }
            if((button.index === BTNS.A || button.index === BTNS.ZR) && this.canShoot)
            {
                this.shoot();
                this.canShoot = false;
            }
        });

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
                return this.keys.goForward.isDown || this.gamepadControls.forward;
            },
            slowDown: () =>
            {
                return this.keys.slowdown.isDown || this.gamepadControls.slowdown;
            },
            shoot: () =>
            {
                return false;
            }         
        };

        this.targetAngle = this.angle;
    }

    private gamepadControls: {
        forward: boolean;
        slowdown: boolean;
    } = {
        forward: false,
        slowdown: false,
    };

    private gamepad: Phaser.Input.Gamepad.Gamepad;

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
            life || 3200,
            600,
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
    
    private targetAngle: number = 0; 

    private updateGamepad()
    {
        if(!this.usingGamepad || this.gamepad === undefined)
        {
            return;
        }

        const gamepad = this.gamepad;
        const axisX = gamepad.leftStick.x;
        const axisY = gamepad.leftStick.y;

        if(axisX !== 0 || axisY !== 0)
        {
            this.targetAngle = Phaser.Math.Angle.Normalize(Math.atan2(axisY, axisX) + 90 * Phaser.Math.DEG_TO_RAD);
        }

        this.rotation = Phaser.Math.Angle.RotateTo(this.rotation, this.targetAngle, 0.09);
    }

    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);

        this.updateGamepad();

        var length = this.displayHeight * 0.4;
        const refAngle: number = this.angle + 90;
        this.particles.x = this.x + trig.cos(refAngle) * length;
        this.particles.y = this.y + trig.sin(refAngle) * length;
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