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
        // this.angleVel = 3;

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
       
        // this.controls = {
        //     turnLeft: () =>
        //     {
        //         return this.keys.turnLeft.isDown;
        //     },
        //     turnRight: () =>
        //     {
        //         return this.keys.turnRight.isDown;
        //     },
        //     goForward: () =>
        //     {
        //         return this.keys.goForward.isDown;
        //     },
        //     slowDown: () =>
        //     {
        //         return this.keys.slowDown.isDown;
        //     },
        //     shoot: () =>
        //     {
        //         return false;
        //     }         
        // };

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
            if(button.index === BTNS.ZR)
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
            if(button.index === BTNS.ZR)
            {
                this.gamepadControls.slowdown = false;
            }
            if((button.index === BTNS.A || button.index === BTNS.B) && this.canShoot)
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
                return this.keys.goForward.isDown || this.gamepadControls.forward;///*this.keys.goForward.isDown ||*/ this.getPad()?.isButtonDown(1) || false;
            },
            slowDown: () =>
            {
                return this.keys.slowDown.isDown || this.gamepadControls.slowdown;//this.doSlowdown;///*this.keys.slowDown.isDown ||*/ this.getPad()?.isButtonDown(2) || false;
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
    private setGamepadControls: boolean = false;

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

    // private getPad(): Phaser.Input.Gamepad.Gamepad | undefined
    // {
    //     if(this.scene.input.gamepad.total > 0 || this.scene.input.gamepad.gamepads.length === 0)
    //     {
    //         return;
    //     }
    //     const pads = this.scene.input.gamepad.gamepads;

    //     for(var i = 0; i < pads.length; i++)
    //     {
    //         if(pads[i] && pads[i].connected)
    //         {
    //             return pads[i];
    //         }
    //     }

    //     return undefined;
    // }

    private targetAngle: number;

    private relSpeed: number = 0;

    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);

        // if(!this.setGamepadControls && this.scene.input.gamepad.total > 0)
        // {
        //     const pads = this.scene.input.gamepad.gamepads;
        //     var pad: Phaser.Input.Gamepad.Gamepad | undefined = undefined;

        //     for(var i = 0; i < pads.length; i++)
        //     {
        //         if(pads[i])
        //         {
        //             pad = pads[i];
        //             break;
        //         }
        //     }

        //     if(pad === undefined)
        //     {
        //         return;
        //     }

        //     this.controls = {
        //         turnLeft: () =>
        //         {
        //             return false;
        //         },
        //         turnRight: () =>
        //         {
        //             return false;
        //         },
        //         goForward: () =>
        //         {
        //             debugger
        //             if(!pad) { return false; }
        //             return pad.A;
        //         },
        //         slowDown: () =>
        //         {
        //             if(!pad) { return false; }
        //             return pad.B;
        //         },
        //         shoot: () =>
        //         {
        //             return false;
        //         }         
        //     };

        //     this.setGamepadControls = true;
        //     return;
        // }

        if(this.usingGamepad && this.gamepad !== undefined)
        {
            const AXES = {
                LX: 0,
                LY: 1,
                RX: 2,
                RY: 3
            };

            const gamepad = this.gamepad;

            // const speedVector = new Phaser.Math.Vector2(gamepad.leftStick.x, gamepad.leftStick.y);

            // this.setAngle(trig.atan2(gamepad.leftStick.y, gamepad.leftStick.x));

            const axisX = gamepad.leftStick.x;
            const axisY = gamepad.leftStick.y;

            // this.x += gamepad.leftStick.x * this.speed;
            // this.y += gamepad.leftStick.y * this.speed;

            // this.speed = Math.sqrt(axisX * axisX + axisY * axisY) * this.maxSpeed;

            if(axisX !== 0 || axisY !== 0)
            {
                const refAngle = Phaser.Math.Wrap(this.angle, 0, 360);
                // const targetAngle = Phaser.Math.Wrap(Math.atan2(axisY, axisX) * Phaser.Math.RAD_TO_DEG + 90, 0, 360);
                const targetAngle = Phaser.Math.Angle.Normalize(Math.atan2(axisY, axisX) + 90 * Phaser.Math.DEG_TO_RAD);//, -Math.PI, Math.PI);

                this.rotation = Phaser.Math.Angle.RotateTo(this.rotation, targetAngle, 0.09);

                // const angleDiff = (refAngle - targetAngle);

                // var vel = 0;

                // if(Math.abs(angleDiff) > this.angleVel)
                // {
                //     this.angle += (((angleDiff > 0) ? 1 : -1) * this.angleVel);
                // }
                // else
                // {
                //     this.angle = targetAngle;
                // }


                // this.flipY = (axisH > 0);
            }

             
            if(this.controls.goForward())
            {
                this.relSpeed += this.speedAcl; //* Math.sqrt(axisX * axisX + axisY * axisY);
            }
            else 
            {
                if(this.relSpeed > 0)
                {
                    this.relSpeed -= this.speedDeacl;
                }  
                else
                {
                    this.relSpeed = 0;
                } 
            }

            if(this.controls.slowDown())
            {
                if(this.relSpeed > 0)
                {
                    this.relSpeed -= this.manualSpeedDeacl;
                }  
                else
                {
                    this.relSpeed = 0; 
                }
            }

            this.relSpeed = Math.min(this.relSpeed, this.maxSpeed);

            this.speed = this.relSpeed;

            // const DEG_TO_RAD: number = Phaser.Math.DEG_TO_RAD;
            // const RAD_TO_DEG: number = Phaser.Math.RAD_TO_DEG;
            
            // this.rotation = Phaser.Math.Angle.RotateTo(this.rotation, Phaser.Math.Wrap(this.targetAngle, -180, 180) * DEG_TO_RAD, this.angleVel * DEG_TO_RAD);
            
            // const relAngle = Phaser.Math.Wrap(this.rotation * RAD_TO_DEG, 0, 360);
            // if(Math.abs(relAngle - this.targetAngle) <= this.angleVel)
            // {
            //     this.angle = relAngle;
            // }
        }

        var length = this.displayHeight * 0.4;
        const relAngle: number = this.angle + 90;
        this.particles.x = this.x + trig.cos(relAngle) * length;
        this.particles.y = this.y + trig.sin(relAngle) * length;
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