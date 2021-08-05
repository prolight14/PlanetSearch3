import GameObject from "./GameObject";
import ILifeform from "./ILifeform";

export default class Player extends Phaser.Physics.Arcade.Sprite implements ILifeform
{
    public isLifeform: boolean = true;
    public inWater: boolean = false;

    constructor(scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y, "helix");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.resetPhysics()//.setScale(0.5, 1)
        // .setSize(16, 32)
        .setDisplaySize(16, 32);

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
        return this.setDrag(200, 0).setMaxVelocity(145, 600).setGravity(300);
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
        const onGround = this.body.blocked.down;

        if(this.controls.left())
        {
            this.setAccelerationX(-800);
        }
        if(this.controls.right())
        {
            this.setAccelerationX(800);
        }
        if(!this.controls.left() && !this.controls.right())
        {
            this.setAccelerationX(0);
            const xDeacl = 10;

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
            this.setVelocityY(-400);
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

    dead: boolean;

    private kill()
    {
        this.dead = true;
        this.destroy();
    }
}