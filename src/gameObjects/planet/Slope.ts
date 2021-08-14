import PlanetLogicScene from "../../scenes/planet/PlanetLogicScene";
import ILifeform from "./ILifeform";

export default class Slope extends Phaser.Physics.Arcade.Image
{
    constructor(scene: PlanetLogicScene, way: string, x: number, y: number)
    {
        super(scene, x, y, "slope");
        this.way = way;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setMaxVelocity(0, 0);
        this.setOrigin(0, 0);
        this.setScale(16 / this.displayWidth, 16 / this.displayHeight);
        this.setVisible(false);
    }

    private way: string;
    
    public onCollide(object: ILifeform)
    {
        console.log("Hit"); 
    }
}