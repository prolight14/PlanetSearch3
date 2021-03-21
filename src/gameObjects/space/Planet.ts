import SpaceGameObject from "./SpaceGameObject";

export default class Planet extends SpaceGameObject
{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture);
    }

    public preUpdate()
    {
        this.bodyConf.update();
    }

    public onCollide(object: SpaceGameObject)
    {
        if(object._arrayName === "playerShip")
        {
        }
        console.log("hit!");
    }
}