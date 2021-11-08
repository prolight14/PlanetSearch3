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
        this.load.image("starBackground2", "./assets/Space/Stars/starBackground2.png");
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

        this.scene.add("spaceStar2", SpaceStarScene, true,
        {
            imageKey: "starBackground2",
            cspConfig: {
                window: {
                    width: spaceScene.cspConfig.width,
                    height: spaceScene.cspConfig.height
                },
                grid: {
                    // cols: 100,
                    // rows: 100,
                    // cellWidth: 1600,
                    // cellHeight: 1600,
                    cols: 134,
                    rows: 134,
                    cellWidth: 1200,
                    cellHeight: 1200,
                }
            }
        });
        this.scene.sendToBack("spaceStar2");

        this.scene.add("spaceStar", SpaceStarScene, true,
        {
            starScroll: 0.65,

            imageKey: "starBackground",
            cspConfig: {
                window: {
                    width: spaceScene.cspConfig.width,
                    height: spaceScene.cspConfig.height
                },
                grid: {
                    // cols: 100,
                    // rows: 100,
                    // cellWidth: 1600,
                    // cellHeight: 1600,
                    cols: 134,
                    rows: 134,
                    cellWidth: 1200,
                    cellHeight: 1200,
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
        this.scene.sleep("spaceStar2");
        this.scene.sleep("spaceStar3");

        this.starScenesSleeping = true;
    }

    private onWake()
    {
        this.scene.wake("spaceStar");
        this.scene.wake("spaceStar2");
        this.scene.wake("spaceStar3");

        this.starScenesSleeping = false;
    }

    public update()
    {
        this.updateStarFade();
    }

    private updateStarFade()
    {
        if(this.starScenesSleeping)
        {
            return;
        }

        var mainCam = this.scene.get("space").cameras.main;

        if(mainCam.zoom <= 0.5)
        {
            this.scene.sleep("spaceStar3");
        }
        else
        {
            this.scene.wake("spaceStar3");
        }

        if(mainCam.zoom <= 0.35)
        {
            this.scene.sleep("spaceStar2");
        }
        else
        {
            this.scene.wake("spaceStar2");
        }
    }
}