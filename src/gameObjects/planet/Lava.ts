import PlanetLogicScene from "../../scenes/planet/PlanetLogicScene";
import IDamage from "./IDamage";
import ILifeform from "./ILifeform";

export default class Lava extends Phaser.Physics.Arcade.Image implements IDamage
{
    public damage: integer = 1;

    constructor(scene: PlanetLogicScene, x: number, y: number)
    {
        super(scene, x, y, "lava");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setMaxVelocity(0, 0);
        this.setOrigin(0, 0);
        this.setScale(16 / this.displayWidth, 16 / this.displayHeight);

        this.setVisible(false);
    }

    public onCollide(object: ILifeform)
    {
        object.takeDamage(this);
    }
}