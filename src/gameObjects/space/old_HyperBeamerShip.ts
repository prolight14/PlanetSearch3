import SpaceScene from "../../scenes/space/SpaceScene";
import EnemyShip from "./old_EnemyShip";
import XPStar from "./XPStar";

export default class HyperBeamerShip extends EnemyShip
{
    constructor(scene: SpaceScene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture);

        this.maxSpeed = 3.75;
    }
}