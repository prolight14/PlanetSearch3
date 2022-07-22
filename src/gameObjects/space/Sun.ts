import SpaceScene from "../../scenes/space/SpaceScene";
import SpaceGameObject from "./SpaceGameObject";

export default class Star extends SpaceGameObject
{
    constructor(scene: SpaceScene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture);

        // this.setVisible(false);

        // this.setScale(3);
        this.setStatic(true);

        this.body.collisionFilter = {
            'group': -1,
            'category': 2,
            'mask': 0,
        };
    } 

    private radius: number = 600;

    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);
        this.bodyConf.update();
    }
}