import Lifeform from "./Lifeform";
import Player from "./Player";
import Slope from "./Slope";

export default class Beaker extends Lifeform
{
    private xDir: string; 
    private yDir: string; 

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: number)
    {
        super(scene, x, y, texture, frame);

        this.maxHp = this.hp = 2;
        this.damage = 1;
        
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.resetPhysics();

        this.xDir = Phaser.Math.Between(0, 100) < 50 ? "left" : "right";

        this.controls = {
            left: () =>
            {
                return this.xDir === "left";
            },
            right: () =>
            {
                return this.xDir === "right";
            },
            up: () =>
            {
                return this.yDir === "up";
            },
            down: () =>
            {
                return false;
            },
            activate: () => 
            {
                return false;
            }
        };

    }

    public takeDamage(object: Lifeform)
    {
        this.hp -= object.getDamage(this);
    }

    public isOnSlope: boolean = false;

    protected resetPhysics()
    {
        return this.setDrag(30, 0).setMaxVelocity(50, 200);
    }
    public preUpdate(time: number, delta: number)
    {   
        super.preUpdate(time, delta);

        if(!this.wasOnSlope && !this.wasInLiquid && !this.slopeWay)
        {
            if(this.body.blocked.left || this.body.touching.left)
            {
                this.xDir = "right";
            }
            if(this.body.blocked.right || this.body.touching.right)
            {
                this.xDir = "left";
            }
        }

        this.slopeWay = "";

        if(this.wasInLiquid)
        {
            this.yDir = "up";
        }
        else
        {
            this.yDir = "";
        }
    }

    private slopeWay: string = "";

    public onCollide(object: any)
    {
        if(object.name === "slope")
        {
            let slope: Slope = object as Slope;
            this.slopeWay = slope.way;
        }
        else if(object.texture.key === "Player")
        {
            let player: Player = object as Player;

            if(player.body.blocked.down && this.body.touching.up)
            {
                player.body.velocity.y -= player.enemyBounce;
                this.takeDamage(player);
            }
            else if((player.body.touching.left || player.body.touching.right) && (this.body.touching.left || this.body.touching.right))
            {
                player.takeDamage(this);
            }
        }
    }
}