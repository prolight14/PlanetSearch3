import SpaceScene from "./SpaceScene";
import SpaceStarScene from "./SpaceStarScene";

export default class StarSceneControllerScene extends Phaser.Scene
{
    constructor()
    {
        super("starSceneController");
    }
    
    // Ideas: Add tilesprite

    public preload()
    {
        // this.load.image("starBackground1", "./assets/Space/Stars/M_starBackground1.png");
        // this.load.image("starBackground2", "./assets/Space/Stars/M_starBackground2.png");
        // this.load.image("starBackground3", "./assets/Space/Stars/M_starBackground3.png");
        this.load.image("starBackground1", "./assets/Space/Stars/Old/starBackground.png");
        this.load.image("starBackground2", "./assets/Space/Stars/Old/starBackground2.png");
        this.load.image("starBackground3", "./assets/Space/Stars/Old/starBackground3.png");
    }

    public create()
    {
        // this.startStarScenes();

        const cam = this.cameras.main;
      

        this.tileSprites = [];
        this.scrollValues = [0.65, 0.78, 1];
        const layerAmt = this.scrollValues.length;

        for(var i = 1; i <= layerAmt; i++)
        {
            this.tileSprites.push(this.add.tileSprite(0, 0, cam.width * 2, cam.height * 2, "starBackground" + i).setDepth(i - layerAmt));
        }

        this.scene.sendToBack("starSceneController");
    }

    private tileSprites: Array<Phaser.GameObjects.TileSprite>;
    private scrollValues: Array<number>;

    public update(time: number, delta: number) 
    {
        const cam = this.scene.get("space").cameras.main;

        for(var i = 0; i < this.tileSprites.length; i++)
        {
            const tileSprite = this.tileSprites[i];

            tileSprite.tilePositionX = cam.scrollX * this.scrollValues[i];
            tileSprite.tilePositionY = cam.scrollY * this.scrollValues[i];
            tileSprite.tileScaleX = cam.zoomX;
            tileSprite.tileScaleY = cam.zoomY;
        }
    }

    private startStarScenes()
    {
        const spaceScene: SpaceScene = this.scene.get("space") as SpaceScene;

        var cellWidth = 2048;
        var cellHeight = 2048;

        for(var i = 1; i <= 3; i++)
        {
            this.scene.add("spaceStar" + i, SpaceStarScene, true,
            {
                starScroll: 0.7,
    
                imageKey: "starBackground" + i,
                cspConfig: {
                    window: {
                        width: spaceScene.cspConfig.width,
                        height: spaceScene.cspConfig.height
                    },
                    grid: {
                        cols: 204800 / cellWidth,
                        rows: 204800 / cellHeight,
                        cellWidth:  cellWidth,
                        cellHeight: cellHeight,
                    }
                }
            });
        }
        
        this.scene.sendToBack("spaceStar3");
        this.scene.sendToBack("spaceStar2");
        this.scene.sendToBack("spaceStar1");
    }
}