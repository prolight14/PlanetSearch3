import PlanetLoaderScene from "../../scenes/planet/PlanetLoaderScene";
import PlanetLogicScene from "../../scenes/planet/PlanetLogicScene";
import GameObject from "./GameObject";
import Player from "./Player";
import StaticGameObject from "./StaticGameObject";

export default class Checkpoint extends StaticGameObject
{
    constructor(scene: PlanetLogicScene, x: number, y: number)
    {
        super(scene, x, y, "checkpoint", 0, false);

        this.setOrigin(0, 0);
        scene.physics.add.existing(this);
        this.setImmovable(true);
        this.setGravity(0, 0);
        this.setMaxVelocity(0, 0);
    }
    
    public goto: {
        level: string,
        index: number
    };

    public onOverlap(object: GameObject)
    {
        if(object.texture.key === "Player")
        {
            const player: Player = object as Player;

            this.setFrame(1);
            player.onCheckpoint(this);
    
            (this.scene.scene.get("planetLoader") as PlanetLoaderScene).setTravelerSaveInfo({
                playerStats: player.getStats()
            }); 
        }
    }
}