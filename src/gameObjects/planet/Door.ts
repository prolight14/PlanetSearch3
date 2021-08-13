import PlanetEffectsScene from "../../scenes/planet/PlanetEffectsSceen";
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

        this.goto = {
            level: "",
            door: "",
        };
    }

    public goto: {
        level: string;
        door: string;
    };

    private restartScene(scene: PlanetLogicScene)
    {
        scene.scene.restart({ 
            loadType: "door",
            gotoLevel: this.goto.level, 
            gotoDoor: this.goto.door, 
            playerStats: scene.getPlayerStats()
        });
    }

    public onCollide(player: Player)
    {
        if(player.activate() && Math.abs(player.body.y - this.body.y) < 0.5 && Math.abs(player.body.velocity.y) < 0.05)
        {
            let scene = this.scene as PlanetLogicScene;
            let effectsScene = scene.scene.get("planetEffects") as PlanetEffectsScene;

            effectsScene.fadeOut(500, 0, 0, 0);
        
            scene.scene.pause("planetLogic");

            // effectsScene.cameras.main.once("camerafadeoutcomplete", (cam: Phaser.Cameras.Scene2D.Camera, effect: Phaser.Cameras.Scene2D.Effects.Fade) => 
            effectsScene.cameras.main.once("camerafadeoutcomplete", () => 
            {
                scene.scene.run("planetLogic");
                this.restartScene(scene);
            });
            this.destroy();
        }
    }
}