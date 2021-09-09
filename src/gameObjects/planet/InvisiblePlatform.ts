import PlanetLogicScene from "../../scenes/planet/PlanetLogicScene";
import ILifeform from "./ILifeform";
import Player from "./Player";

export default class InvisiblePlatform extends Phaser.Physics.Arcade.Image
{
    constructor(scene: PlanetLogicScene, x: number, y: number)
    {
        super(scene, x, y, "invisiblePlatform");

        scene.add.existing(this);
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