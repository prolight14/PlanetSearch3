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
}