import SpaceLogicScene from "../../scenes/space/SpaceLogicScene";
import SpaceScene from "../../scenes/space/SpaceScene";
import Ship from "./Ship";

export default class EnemyShip extends Ship
{
    protected turnDir: string;
    
    constructor(scene: SpaceScene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture);

        this.turnDir = "";

        this.controls = {
            turnLeft: () =>
            {
                return this.turnDir === "left";
            },
            turnRight: () =>
            {
                return this.turnDir === "right";
            },
            goForward: () =>
            {
                return this.move;
            },
            slowDown: () => false,
            shoot: () => 
            {
                return this.isShooting;
            }         
        };

        this.angleVel = 3;
    }

    public showHpBar: boolean = true;

    protected move: boolean = true;
    protected isShooting: boolean = false;

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