import PlanetLoaderScene from "../../scenes/planet/PlanetLoaderScene";
import PlanetLogicScene from "../../scenes/planet/PlanetLogicScene";
import Checkpoint from "./Checkpoint";
import Lifeform from "./Lifeform";

// TODO: 1. Make hp not fill up when going through doors (done)
// 2. Add checkpoints
// 3. Add slopes (done)
// 4. Fix oneway collision (done)
// 5. Make player death animation
// 6. Add leveling up system (surpassing a certain score will cause hp (by 5) or damage (by 1) to go up)

export default class Player extends Lifeform
{
    public isLifeform: boolean = true;
    public inWater: boolean = false;
    
    private blinking: boolean = false;
    private blinkTime: integer = 1000; // Blink time in ms
    private blinkSpeed: integer = 100; // Blink speed (change on/off) in ms
    
    protected controls: {
        left: () => boolean;
        right: () => boolean;
        up: () => boolean;
        down: () => boolean;
        activate: () => boolean;
        restart: () => boolean;
    };
    
    public hp: integer;
    public maxHp: integer;
    public damage: integer;

    public getStats(): { hp: number, maxHp: number }
    {
        return {
            hp: this.hp,
            maxHp: this.maxHp,
        };
    }

    public setStats(stats: { hp: number, maxHp: number })
    {
        this.hp = stats.hp;
        this.maxHp = stats.maxHp;
    }
    
    public setCurrentState(info: any)
    {
        this.hp = info.hp;
        this.maxHp = info.maxHp;
        this.checkpointGoto = info.checkpointGoto;
    }

    public getCurrentState(): any
    {
        return {
            hp: this.hp,
            maxHp: this.maxHp,
            checkpointGoto: this.checkpointGoto
        };
    }

    constructor(scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y, "Player", 0);

        this.maxHp = this.hp = 5;
        this.damage = 1;

        this.setCollideWorldBounds(true);

        scene.anims.create({
            key: "idle",
            frames: [{ key: "Player", frame: 0 }],
            frameRate: 20
        });

        scene.anims.create({
            key: "left",
            frames: [{ key: "Player", frame: 4 }, { key: "Player", frame: 5 }, { key: "Player", frame: 6 }, { key: "Player", frame: 7 }],
            frameRate: 8,
            repeat: -1
        });
       
        scene.anims.create({
            key: "right",
            frames: [{ key: "Player", frame: 0 }, { key: "Player", frame: 1 }, { key: "Player", frame: 2 }, { key: "Player", frame: 3 }],
            frameRate: 8,
            repeat: -1
        });


        this.keys = {
            a: scene.input.keyboard.addKey('a'), 
            d: scene.input.keyboard.addKey('d'),
            w: scene.input.keyboard.addKey('w'),
            s: scene.input.keyboard.addKey('s'),
            left: scene.input.keyboard.addKey("left"),
            right: scene.input.keyboard.addKey("right"),
            up: scene.input.keyboard.addKey("up"),
            down: scene.input.keyboard.addKey("down"),
            r: scene.input.keyboard.addKey('r'),
        };

        this.controls = {
            left: () =>
            {
                return this.keys.a.isDown || this.keys.left.isDown;
            },
            right: () =>
            {
                return this.keys.d.isDown || this.keys.right.isDown;
            },
            up: () =>
            {
                return this.keys.w.isDown || this.keys.up.isDown;
            },
            down: () =>
            {
                return this.keys.s.isDown || this.keys.down.isDown;
            },
            activate: () =>
            {
                return this.keys.s.isDown || this.keys.down.isDown;
            },
            restart: () =>
            {
                return this.keys.r.isDown;
            }
        };

        this.activate = function()
        {
            return this.controls.activate();
        };

        this.blinkTimer = this.scene.time.addEvent({
            delay: this.blinkSpeed,
            callback: () =>
            {
                this.setVisible(!this.visible);
            },  
            repeat: -1 
        });
        this.blinkTimer.paused = true;
    }

    public takeDamage(object: { getDamage: (object: Lifeform) => number }, blink?: boolean)
    {
        if(blink === undefined) { blink = true; }

        if(!this.blinking)
        {
            this.hp -= object.getDamage(this);

            if(blink) 
            {
                this.startBlinking();
            }
        }
    }

    public activate: Function;
    
    blinkTimer: Phaser.Time.TimerEvent;

    private startBlinking()
    {   
        this.blinking = true;
        this.blinkTimer.paused = false;

        this.scene.time.delayedCall(this.blinkTime, () =>
        {
            this.blinking = false;
            this.setVisible(true);
            this.blinkTimer.paused = true;
        });
    }

    private keys: {
        a: Phaser.Input.Keyboard.Key;
        d: Phaser.Input.Keyboard.Key;
        w: Phaser.Input.Keyboard.Key;
        s: Phaser.Input.Keyboard.Key;
        left: Phaser.Input.Keyboard.Key;
        right: Phaser.Input.Keyboard.Key;
        up: Phaser.Input.Keyboard.Key;
        down: Phaser.Input.Keyboard.Key;
        r: Phaser.Input.Keyboard.Key;
    };
    private looking: string;
    private playingLeft: boolean;

    preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);

        const onGround = this.body.blocked.down || this.isOnSlope;

        if(this.controls.left())
        // if(this.body.velocity.x < 0)
        {
            this.anims.play("left", true);

            this.playingLeft = true;
        }
        if(this.controls.right())
        // if(this.body.velocity.x > 0)
        {
            this.anims.play("right", true);
        }

        if(this.body.deltaX() < 0.01)
        {
            this.playingLeft = false;
        }

        if(this.playingLeft)
        {
            this.anims.play("left", true);
        }

        if(!this.controls.left() && !this.controls.right())
        {
            if(this.body.velocity.x < 0)
            {
                // this.setFrame(4);
                this.looking = "left";
            }
            else if(this.body.velocity.x > 0)
            {
                // this.setFrame(0);
                this.looking = "right";
            }
        }
        else
        {
            this.looking = "";
        }

        if(this.looking === "left")
        {
            this.setFrame(4);

            if(!onGround)
            {
                this.setFrame(5);
            }
        }
        else if(this.looking === "right")
        {
            this.setFrame(0);
           
            if(!onGround)
            {
                this.setFrame(1);
            }
        }

        if(this.body.blocked.left && this.body.velocity.x < 0 && this.controls.left() && onGround)
        {
            this.setFrame(4);
        }
        if(this.body.blocked.right && this.body.velocity.x > 0 && this.controls.right() && onGround)
        {
            this.setFrame(0);
        }

        if(!onGround)
        {
            if(this.controls.left())
            {
                this.anims.pause(this.anims.currentAnim.frames[1]);
            }
            else if(this.controls.right())
            {
                this.anims.pause(this.anims.currentAnim.frames[1]);
            }
        }

        // if(this.controls.restart() || this.dead)
        // {
        //     if(this.checkpointGoto !== undefined)
        //     {
        //         (this.scene.scene.get("planetLoader") as PlanetLoaderScene).restart({
        //             loadType: "checkpoint",
        //             checkpointGoto: this.checkpointGoto,
        //             reason: this.controls.restart() ? "restart" : "death",
        //         });
        //     }
        //     else
        //     {
        //         (this.scene.scene.get("planetLoader") as PlanetLoaderScene).restart({
        //             loadType: "start",
        //             startGoto: {
        //                 level: this.startLevel
        //             },
        //             reason: this.controls.restart() ? "restart" : "death",
        //         });
        //     }
        // }
    }

    public startLevel: string;

    private checkpointGoto: {
        level: string,
        index: number
    };

    public onCheckpoint(checkpoint: Checkpoint)
    {
        this.checkpointGoto = checkpoint.goto;
    }

    public enemyBounce: number = 160;

    protected kill(reason?: string)
    {
        this.dead = true;
        this.setImmovable(true);
        this.setVisible(false);
        this.setMaxVelocity(0);
        this.blinking = false;
    }
}