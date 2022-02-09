import SpaceScene from "../../scenes/space/SpaceScene";
import timer from "../Utils/timer";
import trig from "../Utils/trig";
import PlayerShipBullet from "./PlayerShipBullet";
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

    private shootTimer: {
        update: () => void;
        reset: (newInterval?: number, _args?: Array<any>) => void;
    };

    private pointerDX: number = 0;
    private pointerDY: number = 0;

    protected destroyOnKill: boolean = false;

    constructor (scene: SpaceScene, x: number, y: number)
    {
        super(scene, x, y, "helixShip", undefined, { shape: scene.cache.json.get("helixShipShape").helixShip });

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

        // scene.input.on(Phaser.Input.Events.POINTER_MOVE, (pointer: Phaser.Input.Pointer) =>
        // {
        //     this.pointerDX = (pointer.x - (this.scene.game.config.width as number) / 2); 
        //     this.pointerDY = (pointer.y - (this.scene.game.config.height as number) / 2); 


        //     // var wDiff = (pointer.x - (this.scene.game.config.width as number) / 2) * 0.005;
        //     // var hDiff = (pointer.y - (this.scene.game.config.height as number) / 2) * 0.005;

        //     // var length = Math.min(this.maxSpeed, Math.sqrt(wDiff * wDiff + hDiff * hDiff));

        //     // var theta = Math.atan2(-hDiff, wDiff);

        //     // this.x += trig.sin(theta) * length;
        //     // this.y += trig.cos(theta) * length;
        // });

        // var shots = 0;

        // this.shootTimer = timer(false, 625, () =>
        // {
        //     shots = 0;
        // });

        this.scene.input.keyboard.on("keyup-Z", () =>
        {
            // if(++shots === 15)
            // {
            //     this.shootTimer.reset();
            // }
            // if(shots >= 15)
            // {
            //     return;
            // }
            var theta = 30 + this.angle;
            var length = 25;
            var bullet = this.bullets.add(this.scene, this.x + trig.cos(theta) * length, this.y + trig.sin(theta) * length, this.angle - 90) as PlayerShipBullet;
            bullet.setAngle(this.angle);

            var theta = 150 + this.angle;
            var length = 25;
            var bullet = this.bullets.add(this.scene, this.x + trig.cos(theta) * length, this.y + trig.sin(theta) * length, this.angle - 90) as PlayerShipBullet;
            bullet.setAngle(this.angle);

            var theta = this.angle - 20;
            var length = 17;
            var bullet = this.bullets.add(this.scene, this.x + trig.cos(theta) * length, this.y + trig.sin(theta) * length, this.angle - 90) as PlayerShipBullet;
            bullet.setAngle(this.angle);

            var theta = 200 + this.angle;
            var length = 17;
            var bullet = this.bullets.add(this.scene, this.x + trig.cos(theta) * length, this.y + trig.sin(theta) * length, this.angle - 90) as PlayerShipBullet;
            bullet.setAngle(this.angle);
        });

        this.scene.input.keyboard.on("keydown-M", () =>
        {
            this.hp = 0;
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

    public setBullets(playerShipBullets: any)
    {
        this.bullets = playerShipBullets;
    }

    private bullets: any;
    
    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);

        // var dx = this.pointerDX;
        // var dy = this.pointerDY;
        // this.x += Math.min(this.maxSpeed, dx * 0.05);
        // this.y += Math.min(this.maxSpeed, dy * 0.05);
        // this.setAngle(Math.atan2(dy, dx) + Math.PI / 2);

        // this.shootTimer.update();

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