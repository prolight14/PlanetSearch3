export default class StarSceneControllerScene extends Phaser.Scene
{
    constructor()
    {
        super("starSceneController");
    }
    
    public preload()
    {
        this.load.image("starBackground1", "./assets/Space/Stars/starBackground1.png");
        this.load.image("starBackground2", "./assets/Space/Stars/starBackground2.png");
        this.load.image("starBackground3", "./assets/Space/Stars/starBackground3.png");
    }

    public create()
    {
        const cam = this.cameras.main;
      
        this.starLayers = new Array<Phaser.GameObjects.TileSprite>();
        this.scrollValues = [0.65, 0.9, 1];
        const layerAmt = this.scrollValues.length;

        for(var i = 1; i <= layerAmt; i++)
        {
            const tileSprite = this.add.tileSprite(cam.width / 2, cam.height / 2, cam.width * 2, cam.height * 2, "starBackground" + i).setDepth(i - layerAmt);
            tileSprite.setOrigin(0.5);
            this.starLayers.push(tileSprite);
        }
        
        this.scene.sendToBack("starSceneController");

        this.scene.run("spaceMap");
        this.scene.bringToTop("spaceMap");
    }

    private starLayers: Array<Phaser.GameObjects.TileSprite>;
    private scrollValues: Array<number>;

    public update(time: number, delta: number) 
    {
        const cam = this.scene.get("space").cameras.main;
        const { scrollX, scrollY, zoom } = cam;
        const rf = (1 - 1 / zoom);

        for(var i = 0; i < this.starLayers.length; i++)
        {
            const tileSprite = this.starLayers[i];

            tileSprite.setTileScale(zoom);
            tileSprite.setTilePosition(
                rf * cam.width + scrollX * this.scrollValues[i] | 0, 
                rf * cam.height + scrollY * this.scrollValues[i] | 0
            );
        }
    }

    public updateToRenderTexture(rt: Phaser.GameObjects.RenderTexture, cam: Phaser.Cameras.Scene2D.BaseCamera, starZoom: number, relativeWidth: number, relativeHeight: number)
    {
        const starLayers = this.starLayers;
        const scrollValues = this.scrollValues;
        const zoom = cam.zoom * starZoom;

        for(var i = 0; i < starLayers.length; i++)
        {
            const tileSprite = starLayers[i];

            tileSprite.setTileScale(zoom);
            tileSprite.setTilePosition(
                (relativeWidth + cam.scrollX * scrollValues[i]) / starZoom | 0, 
                (relativeHeight + cam.scrollY * scrollValues[i]) / starZoom | 0
            );
          
            rt.batchDraw(tileSprite, tileSprite.x, tileSprite.y);
        }
    }
}