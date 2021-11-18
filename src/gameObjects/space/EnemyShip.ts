import SpaceLogicScene from "../../scenes/space/SpaceLogicScene";
import SpaceScene from "../../scenes/space/SpaceScene";
import Ship from "./Ship";

export default class EnemyShip extends Ship
{
    protected turnDir: string;
    
    protected typeName: string = "enemyShip";

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
            shoot: () => false         
        };

        this.angleVel = 3;
    }

    protected move: boolean = true;

    public preUpdate()
    {
        Ship.prototype.preUpdate.apply(this, arguments);
    }

    protected onKill?: Function = function()
    {
        this.dropXP();
        this.dropCrests();
    }

    protected xpDropAmt: number = 3;

    private dropXP()
    {
        for(var i = 0; i < this.xpDropAmt; i++)
        {
            if(Phaser.Math.RND.frac() < 0.5)
            {
                (this.scene.scene.get("spaceLogic") as SpaceLogicScene).addXPStar(this.x, this.y);
            }
            else
            {
                (this.scene.scene.get("spaceLogic") as SpaceLogicScene).addSmallXPStar(this.x, this.y);
            }
        }
    }

    protected crestDropAmt: number = Phaser.Math.RND.between(3, 6);

    private dropCrests()
    {
        for(var i = 0; i < this.crestDropAmt; i++)
        {
            (this.scene.scene.get("spaceLogic") as SpaceLogicScene).addCrests(this.x, this.y);
        }
    }
}