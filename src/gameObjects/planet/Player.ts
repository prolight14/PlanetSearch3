import GameObject from "./GameObject";
import ILifeform from "./ILifeform";

export default class Player extends Phaser.Physics.Arcade.Sprite implements ILifeform
{
    public isLifeform: boolean = true;
    public inWater: boolean = false;

    constructor(scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y, "Helix2", 0);

       
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.resetPhysics().setDisplaySize(16, 32);


        
        scene.anims.create({
            key: "idle",
            frames: [{ key: "Helix2", frame: 0 }],
            frameRate: 20
        });
       
        scene.anims.create({
            key: "left",
            frames: [{ key: "Helix2", frame: 3 }, { key: "Helix2", frame: 4 }],
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: "right",
            frames: [{ key: "Helix2", frame: 1 }, { key: "Helix2", frame: 2 }],
            frameRate: 10,
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
            }
        };


    }

    private resetPhysics()
    {
        return this.setDrag(300, 0).setMaxVelocity(145, 600).setGravity(300);
    }

    controls: {
        left: Function,
        right: Function,
        up: Function,
        down: Function
    }
    keys: {
        a: Phaser.Input.Keyboard.Key, 
        d: Phaser.Input.Keyboard.Key,
        w: Phaser.Input.Keyboard.Key,
        s: Phaser.Input.Keyboard.Key,
        left: Phaser.Input.Keyboard.Key, 
        right: Phaser.Input.Keyboard.Key,
        up: Phaser.Input.Keyboard.Key,
        down: Phaser.Input.Keyboard.Key
    }

    preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);

        const onGround = this.body.blocked.down;

        if(this.controls.left())
        {
            this.setVelocityX(-300);
            this.anims.play("left", true);
        }
        if(this.controls.right())
        {
            this.setVelocityX(300);
            this.anims.play("right", true);
        }
        if(!this.controls.left() && !this.controls.right())
        {
            const xDeacl = onGround ? 10 : 2;

            if(this.body.velocity.x > 0)
            {
                this.setVelocityX(this.body.velocity.x - xDeacl);
            }
            if(this.body.velocity.x < 0)
            {
                this.setVelocityX(this.body.velocity.x + xDeacl);
            }

            if(Math.abs(this.body.velocity.x) < xDeacl)
            {
                this.setVelocityX(0);
                this.anims.play("idle");
            }
        }

        if(this.inWater)
        {
            if(this.controls.up())
            {
                this.setVelocityY(-140);
            }
            else if(this.controls.down())
            {
                this.setVelocityY(140);
            }
        }
        else if(onGround && this.controls.up())
        {
            // this.setVelocityY(-400);
            this.jumping = true;
        }

        if(!this.controls.up() || this.body.velocity.y < -this.jumpHeight)
        {
            this.jumping = false;
        }

        if(this.jumping)
        {
            this.body.velocity.y -= this.jumpSpeed;
        }

        const onCeiling = this.body.blocked.up;

        if(onCeiling)
        {
            this.jumping = false;
            this.body.velocity.y = 0;
        }

        if(this.inWater)
        {
            this.setMaxVelocity(85);
            this.setGravity(0);
        }
        else
        {
            this.resetPhysics();
        }

        this.inWater = false;

        if(this.y > this.scene.cameras.main.getBounds().height)
        {
            this.kill();
        }
    }

    // Physics stuff
    private jumping: boolean = false;
    private jumpSpeed: number = 80;
    private jumpHeight: number = 310;


    dead: boolean;

    private kill()
    {
        this.dead = true;
        this.destroy();
    }
}