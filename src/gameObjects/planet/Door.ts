import PlanetLoaderScene from "../../scenes/planet/PlanetLoaderScene";
import PlanetLogicScene from "../../scenes/planet/PlanetLogicScene";
import GameObject from "./GameObject";
import Player from "./Player";
import StaticGameObject from "./StaticGameObject";

export default class Door extends StaticGameObject
{
    constructor(scene: PlanetLogicScene, x: number, y: number)
    {
        super(scene, x, y, "door", undefined, false);

        scene.physics.add.existing(this);

        this.setImmovable(true);
        this.setVisible(false);
        this.setMaxVelocity(0, 0);
        this.setOrigin(0, 0);
        this.width = this.displayWidth = 16;
        this.height = this.displayHeight = 32;
    }

    private goto: {
        level: string,
        door: string
    };

    public setGoto(goto: { level: string, door: string })
    {
        this.goto = goto;
    }

    public onOverlap(object: any)
    {
        if(object.texture.key === "Player")
        {
            const player: Player = object as Player;

            if(player.activate() && player.body.blocked.down)
            {
                (this.scene.scene.get("planetLoader") as PlanetLoaderScene).restart({
                    loadType: "door",
                    reason: "door",
                    doorGoto: this.goto,
                }); 
            }
        }
    }
}