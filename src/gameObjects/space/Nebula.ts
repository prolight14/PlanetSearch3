import SpaceImg from "./SpaceGameObject";

export default class Nebula extends SpaceImg
{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture);
    }
}