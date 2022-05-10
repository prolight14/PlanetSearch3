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
            // tileSprite.setPipeline("blackhole");
            this.starLayers.push(tileSprite);

            tileSprite.setVisible(false);
        }
        
        this.scene.sendToBack("starSceneController");

        this.scene.run("spaceMap");
        this.scene.bringToTop("spaceMap");

        // this.cameras.main.setPostPipeline("blackhole");

        this.camRT = this.add.renderTexture(cam.x, cam.y, cam.width, cam.height);

        this.camRT.draw(this.cameras.main);
        this.camRT.setDepth(500);
        // this.camRT.setPipeline("blackhole");

        this.camRT.setScrollFactor(0);

        this.camRT.saveTexture("camRT_Pipeline");

        this.camSprite = this.add.image(0, 0, "camRT_Pipeline").setDepth(3000).setScrollFactor(0);
        // this.camSprite.setScale(2.0);
        this.camSprite.setOrigin(0);
        this.camSprite.setPipeline("blackhole");
    }

    private camSprite: Phaser.GameObjects.Image;

    private camRT: Phaser.GameObjects.RenderTexture; 

    private starLayers: Array<Phaser.GameObjects.TileSprite>;
    private scrollValues: Array<number>;

    public update(time: number, delta: number) 
    {
        const cam = this.scene.get("space").cameras.main;
        const { scrollX, scrollY, zoom } = cam;
        const rf = (1 - 1 / zoom);

        this.camRT.clear();
        // this.camRT.draw(this.cameras.main);
        this.camRT.beginDraw();

            for(var i = 0; i < this.starLayers.length; i++)
            {
                const tileSprite = this.starLayers[i];

                tileSprite.setTileScale(zoom);
                tileSprite.setTilePosition(
                    rf * cam.width + scrollX * this.scrollValues[i] | 0, 
                    rf * cam.height + scrollY * this.scrollValues[i] | 0
                );

                // this.camRT.camera.x = (-tileSprite.tilePositionX);
                // this.camRT.camera.y = (-tileSprite.tilePositionY);

                this.camRT.batchDraw(tileSprite, tileSprite.x, tileSprite.y);
            }
            
            // this.updateToRenderTexture(this.camRT, cam, 1.0, cam.width, cam.height);

        this.camRT.endDraw();

        this.camRT.saveTexture("camRT_Pipeline");

    }

    public updateToRenderTexture(
        rt: Phaser.GameObjects.RenderTexture,
        cam: Phaser.Cameras.Scene2D.BaseCamera, 
        starZoom: number, 
        relativeWidth: number, 
        relativeHeight: number,
        layerAmt?: number | undefined,
        overrideScroll?: Array<number> | undefined
    )
    {
        const starLayers = this.starLayers;
        var scrollValues = this.scrollValues;
        const zoom = cam.zoom * starZoom;

        if(layerAmt === undefined) { layerAmt = starLayers.length; }
        if(overrideScroll !== undefined) { scrollValues = overrideScroll; }

        for(var i = 0; i < layerAmt; i++)
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