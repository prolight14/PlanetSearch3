export default class Platform extends Phaser.GameObjects.Image
{
    constructor(scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y, "GrassTileset", 0);
    }

}