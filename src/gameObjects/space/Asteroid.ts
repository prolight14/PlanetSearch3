import SpaceScene from "../../scenes/space/SpaceScene";
import SpaceGameObject from "./SpaceGameObject";

export default class Asteroid extends SpaceGameObject
{
    constructor(scene: SpaceScene, x: number, y: number)
    {
        super(scene, x, y, "asteroid1");
    }
}