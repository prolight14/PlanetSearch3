import SpaceScene from "../../scenes/space/SpaceScene";
import OLD_EnemyShip from "./old_EnemyShip";
import XPStar from "./XPStar";

export default class OLD_HyperBeamerShip extends OLD_EnemyShip
{
    constructor(scene: SpaceScene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture);

        this.maxSpeed = 3.75;
    }
}