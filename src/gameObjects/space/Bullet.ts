import SpaceScene from "../../scenes/space/SpaceScene";
import timer from "../Utils/timer";
import SpaceGameObject from "./SpaceGameObject";

export default class Bullet extends SpaceGameObject
{
    constructor(scene: SpaceScene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture);

        this.killTimer = timer(true, 1600, () =>
        {
            this.kill();
        });
    }

    private killTimer: {
        update: () => void;
    };

    protected preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);

        this.killTimer.update();
    }
}