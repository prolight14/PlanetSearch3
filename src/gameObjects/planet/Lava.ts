import PlanetLogicScene from "../../scenes/planet/PlanetLogicScene";
import Lifeform from "./Lifeform";
import StaticGameObject from "./StaticGameObject";

export default class Lava extends StaticGameObject
{
    private damage: number = 1;

    public getDamage(object: Lifeform): number
    {
        return this.damage;
    }

    constructor(scene: PlanetLogicScene, x: number, y: number)
    {
        super(scene, x, y, "lava");

        scene.physics.add.existing(this);

        this.setMaxVelocity(0, 0);
        this.setOrigin(0, 0);
        this.setScale(16 / this.displayWidth, 16 / this.displayHeight);

        this.setVisible(false);
    }

    public onCollide(object: Lifeform)
    {
        object.takeDamage(this);
        object.inLiquid = true;
    }
}