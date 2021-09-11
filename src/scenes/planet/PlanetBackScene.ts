import PlanetLogicScene from "./PlanetLogicScene";

export default class PlanetBackScene extends Phaser.Scene
{
    constructor()
    {
        super("planetBack");
    }

    public preload()
    {
        this.load.spritesheet("grassLand", "./assets/Planet/Backgrounds/GrassPlanet2/GrassLand.png", {
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
            2.3,
            1.6,
            0.8
        ];

        const layerAmt = 4;
        this.layers = [];
        this.nextLayers = [];

        for(var i = 0; i < layerAmt; i++)
        {
            var layer = this.add.image(0, 0, "grassLand", i);
            layer.setScrollFactor(0, 0).setDisplayOrigin(0, 0).setScale(2, 2);
            this.layers.push(layer);

            var nextLayer = this.add.image(0, 0, "grassLand", i);
            nextLayer.setScrollFactor(0, 0).setDisplayOrigin(0, 0).setScale(2, 2);
            this.nextLayers.push(nextLayer);
        }
    }

    public update()
    {
        const planetLogicScene = (this.scene.get("planetLogic") as PlanetLogicScene);
        const cam: Phaser.Cameras.Scene2D.Camera = planetLogicScene.cameras.main;
        const width = (this.game.config.width as number);
        const diff = planetLogicScene.getLevelWidth() - cam.scrollX;

        for(var i = 0; i < this.layers.length; i++)
        {   
            if(this.layerSpeeds[i] === -1)
            {
                continue;
            }

            var layer = this.layers[i];
            var speed = diff / this.layerSpeeds[i];
            var index = -Math.floor((speed + width) / layer.displayWidth);
            layer.x = layer.displayWidth * index + speed;
            this.nextLayers[i].x = layer.displayWidth * (index + 1) + speed;
        }        
    }
}