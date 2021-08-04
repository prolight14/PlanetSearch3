import PlanetLogicScene from "../../scenes/planet/PlanetLogicScene";
import GameObject from "./GameObject";

export default class Player extends Phaser.Physics.Matter.Image
{
    constructor(scene: PlanetLogicScene, x: number, y: number)
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

        const { Body, Bodies } = Phaser.Physics.Matter.Matter; // Native Matter modules
   
        const { width: w, height: h } = this;
        
        const mainBody = Bodies.rectangle(0, 0, w, h, { chamfer: { radius: 10 } });;

        this.sensors = {
            bottom: Bodies.rectangle(0, h * 0.5 + 2, w * 0.8, 2, { isSensor: true }),
        };
        // this.setOrigin(0.5, 0.5);
        this.sensors.bottom.__id = 23;

        const compoundBody = Body.create({
            parts: [mainBody, this.sensors.bottom],
            frictionStatic: 0,
            frictionAir: 0.02,
            friction: 0.1
        });

        this.setExistingBody(compoundBody);
        this.setFixedRotation();
        this.setOrigin(0.5, 0.7);
        this.setPosition(x, y);

        this.isTouching = {
            ground: false
        };

        scene.matter.world.on("beforeupdate", this.resetTouching, this);

        scene.matterCollision.addOnCollideStart({
            objectA: [this.sensors.bottom],
            callback: this.onSensorCollide,
            context: this
        });
    }

    private onSensorCollide({ bodyA, bodyB, pair }: any)
    {

        if (bodyB.isSensor) return;

        // if(bodyA.__id === this.sensors.bottom.__id)
        // {

            this.isTouching.ground = true;
        // }
    }

    private resetTouching()
    {
        this.isTouching.ground = false;
    }

    isTouching: {
        ground: boolean;
    };
    sensors: any;

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

            this.setVelocityX(-4);
        }
        if(this.controls.right())
        {
            this.setVelocityX(4);
            // this.setAccelerationX(800);
        }
        if(!this.controls.left() && !this.controls.right())
        {
            // this.setAccelerationX(0);
        }

        const isOnGround: boolean = this.isTouching.ground;

        if(this.controls.up() && this.canJump && isOnGround)
        {
            this.setVelocityY(-8);

             // Add a slight delay between jumps since the bottom sensor will still collide for a few
            // frames after a jump is initiated
            this.canJump = false;
            this.jumpCooldownTimer = this.scene.time.addEvent({
                delay: 250,
                callback: () => (this.canJump = true)
            });
        }

        if(this.y > this.scene.cameras.main.getBounds().height)
        {
            // this.kill();
        }
    }

    canJump: boolean;
    jumpCooldownTimer: Phaser.Time.TimerEvent;
    dead: boolean;

    private kill()
    {
        this.dead = true;
        this.destroy();
    }
}