import SpaceGameObject from "./SpaceGameObject"

export default class Shrapnel extends SpaceGameObject
{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture);

        // this.setCollisionGroup(2);
        // this.setCollidesWith(0);

        // this.setFrictionAir(0.0001);
    }
}