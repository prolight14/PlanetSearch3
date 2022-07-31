import SpaceScene from "../../scenes/space/SpaceScene";
import Ship from "./Ship";

import Fov from "../Utils/Fov";
import COL_CATEGORIES from "./CollisionCategories";
import SpaceLogicScene from "../../scenes/space/SpaceLogicScene";

export default class EnemyShip extends Ship
{
    constructor(scene: SpaceScene, x: number, y: number, texture: string, frame?: number | string)
    {
        super(scene, x, y, texture, frame);
        
        this.initControls();

        this.fov = new Fov(scene, this);
    }

    public showHpBar: boolean = true;
    
    protected fov: Fov;

    protected movement = {
        angleDir: "",
        thrust: "forward",
        isShooting: false,
    };

    private initControls()
    {
        this.controls = {
            turnLeft: () =>
            {
                return this.movement.angleDir === "left";
            },
            turnRight: () =>
            {
                return this.movement.angleDir === "right";
            },
            goForward: () =>
            {
                return this.movement.thrust === "forward";
            },
            slowDown: () => 
            {
                return this.movement.thrust === "slowDown";
            },
            shoot: () => 
            {
                return this.movement.isShooting;
            }   
        };
    }

    public fovStats = {
        range: 1000,
        fov: 90,
    };

    public canSeeSomething: boolean = false;

    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);
    }

    protected onKill()
    {
        this.dropXP();
        this.dropCrests();
    }

    protected xpDropAmt: number = 3;

    private dropXP()
    {
        const spaceLogicScene = (this.scene.scene.get("spaceLogic") as SpaceLogicScene);

        for(var i = 0; i < this.xpDropAmt; i++)
        {
            if(Phaser.Math.RND.frac() < 0.5)
            {
                spaceLogicScene.addXPStar(this.x, this.y);
            }
            else
            {
                spaceLogicScene.addSmallXPStar(this.x, this.y);
            }
        }
    }

    protected crestDropAmt: number = Phaser.Math.RND.between(3, 6);

    private dropCrests()
    {
        const spaceLogicScene = (this.scene.scene.get("spaceLogic") as SpaceLogicScene);

        for(var i = 0; i < this.crestDropAmt; i++)
        {
            spaceLogicScene.addCrests(this.x, this.y);
        }
    }
}