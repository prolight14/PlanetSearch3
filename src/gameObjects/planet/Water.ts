import PlanetLogicScene from "../../scenes/planet/PlanetLogicScene";

export default class Water extends Phaser.Physics.Arcade.Image
{
    constructor(scene: PlanetLogicScene, x: number, y: number)
    {
        super(scene, x, y, "water");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setVisible(false);

        console.log("Water created");
    }

    public onCollide(object: Phaser.GameObjects.GameObject)
    {
        
    }
}