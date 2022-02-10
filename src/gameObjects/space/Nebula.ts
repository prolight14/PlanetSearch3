import SpaceScene from "../../scenes/space/SpaceScene";
import SpaceImg from "./SpaceGameObject";

export default class Nebula extends SpaceImg
{
    constructor(scene: SpaceScene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture);

        this.setStatic(true);
        this.body.collisionFilter = {
            'group': -1,
            'category': 2,
            'mask': 0,
        };
    }
}