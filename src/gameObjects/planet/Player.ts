import GameObject from "./GameObject";

export default class Player extends Phaser.Physics.Matter.Image
{
    constructor(scene: Phaser.Scene, x: number, y: number)
    {
        super(scene.matter.world, x, y, "helix");

        scene.add.existing(this);
        // scene.matter.add.(this);

        // this.setDrag(300, 0).setMaxVelocity(145, 500).setScale(0.5, 1);

        // this.setCollideWorldBounds(true);

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
        // const onGround = this.body.blocked.down;

        if(this.controls.left())
        {
            // this.setAccelerationX(-800);
        }
        if(this.controls.right())
        {
            // this.setAccelerationX(800);
        }
        if(!this.controls.left() && !this.controls.right())
        {
            // this.setAccelerationX(0);
        }

        // if(onGround && this.controls.up())
        {
            // this.setVelocityY(-345);
        }

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