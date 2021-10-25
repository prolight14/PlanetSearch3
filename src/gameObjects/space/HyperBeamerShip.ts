import SpaceScene from "../../scenes/space/SpaceScene";
import EnemyShip from "./EnemyShip";

export default class HyperBeamerShip extends EnemyShip
{
    constructor(scene: SpaceScene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture);

        this.maxSpeed = 7.5;
    }
}