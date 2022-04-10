import SpaceScene from "./SpaceScene";
import SpaceStarScene from "./SpaceStarScene";

export default class StarSceneControllerScene extends Phaser.Scene
{
    constructor()
    {
        super("starSceneController");
    }

    starScenesSleeping: boolean;

    public preload()
    {
        this.load.image("starBackground", "./assets/Space/Stars/starBackground.png");
    }

    public create()
    {
        this.startStarScenes();
        this.events.on("sleep", this.onSleep, this);
        this.events.on("wake", this.onWake, this);
    }

    private startStarScenes()
    {
        const spaceScene: SpaceScene = this.scene.get("space") as SpaceScene;

        this.scene.add("spaceStar", SpaceStarScene, true,
        {
            // starScroll: 0.65,
            starScroll: 1.0,

            imageKey: "starBackground",
            cspConfig: {
                window: {
                    width: spaceScene.cspConfig.width,
                    height: spaceScene.cspConfig.height
                },
                grid: {
                    cols: 200,
                    rows: 200,
                    cellWidth: 1024,
                    cellHeight: 1024,
                }
            }
        });
        this.scene.sendToBack("spaceStar");

        this.scene.sendToBack("spaceBackground");

        this.starScenesSleeping = false;
    }

    private onSleep()
    {
        this.scene.sleep("spaceStar");

        this.starScenesSleeping = true;
    }

    private onWake()
    {
        this.scene.wake("spaceStar");
        
        this.starScenesSleeping = false;
    }
}