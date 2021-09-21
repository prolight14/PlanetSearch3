import StaticGameObject from "./StaticGameObject";

export default class Platform extends StaticGameObject
{
    constructor(scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y, "GrassTileset", 0);
    }
}