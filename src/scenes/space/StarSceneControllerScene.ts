import SpaceStarScene from "./SpaceStarScene";

export default class StarSceneControllerScene extends Phaser.Scene
{
    constructor()
    {
        super("starSceneController");
    }

    starScenesSleeping: boolean;

    public create()
    {
        this.startStarScenes();
        this.events.on("sleep", this.onSleep, this);
        this.events.on("wake", this.onWake, this);
    }

    private startStarScenes()
    {
        this.scene.add("spaceStar", SpaceStarScene, true,
        {
            starsPerCell: 100,
            starSize: 3,
            starScroll: 1
        });
        this.scene.sendToBack("spaceStar");

        this.scene.add("spaceStar2", SpaceStarScene, true,
        {
            starsPerCell: 124,
            starSize: 2,
            starScroll: 0.73
        });
        this.scene.sendToBack("spaceStar2");

        this.scene.add("spaceStar3", SpaceStarScene, true,
        {
            starsPerCell: 250,
            starSize: 1,
            starScroll: 0.56
        });
        this.scene.sendToBack("spaceStar3");

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