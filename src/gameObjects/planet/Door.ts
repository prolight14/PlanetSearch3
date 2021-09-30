import PlanetLoaderScene from "../../scenes/planet/PlanetLoaderScene";
import PlanetLogicScene from "../../scenes/planet/PlanetLogicScene";
import Player from "./Player";

export default class Door extends Phaser.Physics.Arcade.Image
{
    constructor(scene: PlanetLogicScene, x: number, y: number)
    {
        super(scene, x, y, "door");

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setVisible(false);

        this.setMaxVelocity(0, 0);
        this.setOrigin(0.5, 0.5);
        this.setSize(16, 32);
    }

    private goto: {
        level: string,
        door: string
    };

    public setGoto(goto: { level: string, door: string })
    {
        this.goto = goto;
    }

    public onCollide(player: Player)
    {
        if(player.activate() && Math.abs(player.body.y - this.body.y) < 0.5 && Math.abs(player.body.velocity.y) < 0.05)
        {
            (this.scene.scene.get("planetLoader") as PlanetLoaderScene).restart({
                loadType: "door",
                reason: "door",
                doorGoto: this.goto,
            }); 
        }
    }
}