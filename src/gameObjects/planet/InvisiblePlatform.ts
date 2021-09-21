import PlanetLogicScene from "../../scenes/planet/PlanetLogicScene";
import Player from "./Player";
import StaticGameObject from "./StaticGameObject";

export default class InvisiblePlatform extends StaticGameObject
{
    constructor(scene: PlanetLogicScene, x: number, y: number)
    {
        super(scene, x, y, "invisiblePlatform");

        scene.physics.add.existing(this);

        this.setMaxVelocity(0, 0);
        this.setOrigin(0, 0);
        this.setScale(0.5, 0.5);
        this.setVisible(false);
    }

    public processCollision(object: Player)
    {
        if(object.body.velocity.y > 0 && object.body.y + object.body.height <= this.body.y + (object.body.deltaAbsY() as number))
        {
            object.body.y = this.body.y - object.body.height;
            object.body.velocity.y = 0;
            object.body.blocked.down = true;
        }
    }
}