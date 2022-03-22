import PlanetLogicScene from "./PlanetLogicScene";

export default class PlanetBackScene extends Phaser.Scene
{
    constructor()
    {
        super("planetBack");
    }

    public preload()
    {
        this.load.spritesheet("scrollBackground", "./assets/Planet/Backgrounds/GrassPlanet/GrassPlanet.png", 
        {
            frameWidth: 400,
            frameHeight: 225
        });
    }

    private layerSpeeds: Array<number>;
    private layers: Array<Phaser.GameObjects.Image>;
    private nextLayers: Array<Phaser.GameObjects.Image>;

    public create()
    { 
        let backgraphics = this.add.graphics().setScrollFactor(0);
        backgraphics.fillStyle(0x00ABFF);
        backgraphics.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
        backgraphics.setDepth(-2);

        this.layerSpeeds = [
            -1, 
            -1,
            0.75,
            0.6,
            0.4

            // 0.25,
            // 0.5,
            // 0.75,


            // 2.3,
            // 1.6,
            // 0.8,
            // 0.67,
            // 0.5
        ];

        this.layers = [];
        this.nextLayers = [];
 
        for(var i = 0; i < this.layerSpeeds.length; i++)
        {
            var layer = this.add.image(0, 0, "scrollBackground", i);
            layer.setScrollFactor(0, 0).setDisplayOrigin(0, 0).setScale(2, 2);
            this.layers.push(layer);

            var nextLayer = this.add.image(0, 0, "scrollBackground", i);
            nextLayer.setScrollFactor(0, 0).setDisplayOrigin(0, 0).setScale(2, 2);
            this.nextLayers.push(nextLayer);
        }
        
    }

    private ignoreLayersAmt: number = 2; 

    public update()
    {
        const planetLogicScene = (this.scene.get("planetLogic") as PlanetLogicScene);
        const cam: Phaser.Cameras.Scene2D.Camera = planetLogicScene.cameras.main;
        const width = (this.game.config.width as number);
        const diff = width - cam.scrollX;

        for(var i = this.ignoreLayersAmt; i < this.layers.length; i++)
        {   
            // if(this.layerSpeeds[i] === -1)
            // {
            //     continue;
            // }

            var layer = this.layers[i];
            var speed = diff / this.layerSpeeds[i];
            var index = -Math.floor((speed + width) / layer.displayWidth);
            layer.x = layer.displayWidth * index + speed;
            this.nextLayers[i].x = layer.displayWidth * (index + 1) + speed;

            layer.y = 100;
            this.nextLayers[i].y = 100;
        }        
    }
}