import SpaceScene from "../../scenes/space/SpaceScene";
import SpaceGameObject from "./SpaceGameObject";

export default class Sun extends SpaceGameObject
{
    constructor(scene: SpaceScene, x: number, y: number)
    {
        super(scene, x, y, "sun");

        // this.setVisible(false);

        this.setScale(3);
        this.setStatic(true);
    } 

    private radius: number = 600;

    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);
        this.bodyConf.update();
    }
}