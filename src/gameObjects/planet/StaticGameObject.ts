export default class GameObject extends Phaser.Physics.Arcade.Image
{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | integer)
    {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
    }

    public onCollide(object: GameObject) 
    {

    }

    public onOverlap(object: GameObject) 
    {

    }

    public processCollision(object: GameObject)
    {
        
    }
}