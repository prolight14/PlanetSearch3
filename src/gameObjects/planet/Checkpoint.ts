import PlanetLogicScene from "../../scenes/planet/PlanetLogicScene";
import GameObject from "./GameObject";
import Player from "./Player";

export default class Checkpoint extends GameObject
{
    constructor(scene: PlanetLogicScene, x: number, y: number)
    {
        super(scene, x, y, "checkpoint", 0);

        this.setOrigin(0, 0);
        scene.physics.add.existing(this);
        this.setImmovable(true);
        this.setGravity(0, 0);
        this.setMaxVelocity(0, 0);
    }

    public onCollide(player: Player)
    {
        this.setFrame(1);
    }
}