import PlanetLogicScene from "../../scenes/planet/PlanetLogicScene";
import Lifeform from "./Lifeform";
import StaticGameObject from "./StaticGameObject";

export default class Water extends StaticGameObject
{
    constructor(scene: PlanetLogicScene, x: number, y: number)
    {
        super(scene, x, y, "water");

        scene.physics.add.existing(this);

        this.setMaxVelocity(0, 0);
        this.setOrigin(0, 0);
        // this.setSize(this.displayWidth, this.displayHeight);
        this.setVisible(false);
    }

    public onOverlap(object: Lifeform)
    {
        object.inLiquid = true;
    }
}  