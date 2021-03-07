import SpaceGameObject from "./SpaceGameObject";

export default class Planet extends SpaceGameObject
{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture);

        this.setScale(50, 50);
    }

    public preUpdate()
    {
        this.bodyConf.update();
    }
}