import SpaceGameObject from "./SpaceGameObject";

export default class Planet extends SpaceGameObject
{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture);

        this.setScale(7);
    }

    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);
        this.bodyConf.update();
    }

    public onCollide(object: SpaceGameObject)
    {
        if(object._arrayName === "playerShip")
        {
        }
    }
}