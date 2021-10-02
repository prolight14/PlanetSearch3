import PlanetLogicScene from "../../scenes/planet/PlanetLogicScene";

export default class GameObject extends Phaser.Physics.Arcade.Image
{
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture, frame?: string | integer, solid?: boolean)
    {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        (scene as PlanetLogicScene).gameObjects.push(this);

        if(solid === undefined) { solid = true; }
        if(solid)
        {
            (scene as PlanetLogicScene).solidGameObjects.push(this);
        }
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