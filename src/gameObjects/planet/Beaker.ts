import PlanetLogicScene from "../../scenes/planet/PlanetLogicScene";
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

        if(!this.wasOnSlope && !this.touchingSlope && !this.slopeWay)
        {
            if(this.body.blocked.right || this.body.touching.right)
            {
                this.xDir = "left";
            }
            if(this.body.blocked.left || this.body.touching.left)
            {
                this.xDir = "right";
            }
        }
        else
        {
            // if(this.body.blocked.right && this.body.touching.right)
            // {
            //     this.xDir = "left";
            // }
            // if(this.body.blocked.left && this.body.touching.left)
            // {
            //     this.xDir = "right";
            // }

            // if(this.body.touching.right)
            // {
            //     this.xDir = "left";
            // }
            // if(this.body.touching.left)
            // {
            //     this.xDir = "right";
            // }
            // this.xDir = this.slopeXDir;
        }

        // if(/* this.slopeWay && !this.wasOnSlope && */!this.wasInLiquid)
        // {
        //     if(this.body.blocked.left && this.body.touching.left)
        //     {
        //         this.xDir = "right";
        //     }
        //     if(this.body.blocked.right && this.body.touching.right)
        //     {
        //         this.xDir = "left";
        //     }
        // }

        this.touchingSlope = false;
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
    private touchingSlope: boolean;
    private slopeXDir: string;

    public onOverlap(object: any)
    {
        if(object.texture.key !== "slope")
        {
            // if(this.body.touching.left)
            // {
            //     this.xDir = "right";
            // }
            // if(this.body.touching.right)
            // {
            //     this.xDir = "left";
            // }
        }
        else if(this.xDir)
        {
            // this.slopeXDir = this.slopeWay;
            this.touchingSlope = true;


        }
    }

    public onCollide(object: any)
    {
        if(object.name === "slope")
        {
            let slope: Slope = object as Slope;
            this.slopeWay = slope.way;
            slope.body.touching
        }
        // else 
        // if(this.body.blocked.right)
        // {
        //     this.xDir = "left";
        // }
        // if(this.body.blocked.left)
        // {
        //     this.xDir = "right";
        // }
        if(object.texture.key === "Player")
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