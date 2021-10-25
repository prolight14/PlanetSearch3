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
            goForward: () => true,
            slowDown: () => false,
            shoot: () => false         
        };

        this.angleVel = 3;
    }

    public preUpdate()
    {
        Ship.prototype.preUpdate.apply(this, arguments);
    }
}