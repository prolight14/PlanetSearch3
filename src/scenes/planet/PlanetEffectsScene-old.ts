interface GraphicsHolder {
    [key: string]: Phaser.GameObjects.Graphics;
}

export default class PlanetEffectsScene extends Phaser.Scene
{
    constructor()
    {
        super("planetEffects");
    }    

    public preload()
    {
        this.load.image("brick", "./assets/Planet/GameObjects/blocks/brick.png");

    }
    
    public create()
    {

        this.initBrickBreaking(3, 3);
    }
    
    public update(time: number, delta: number)
    {

    }

    private initBrickBreaking(blocksCol: number, blocksRow: number)
    {
        var graphicsHolders: GraphicsHolder = {};
        var srcTexture = this.textures.get("brick").getSourceImage();
        // var graphics = this.make.graphics({ x: 0, y: 0, add: false });

        
        for(var col = 0; col < blocksCol; col++)
        {
            for(var row = 0; row < blocksRow; row++)
            {   
                var texKey = "brick" + col.toString() + row.toString();
                graphicsHolders[texKey] = this.make.graphics({ x: 0, y: 0, add: false });

                var maxX = srcTexture.width / blocksCol;
                var maxY = srcTexture.height / blocksRow;

                for(var x = 0; x < maxX; x++)
                {
                    for(var y = 0; y < maxY; y++)
                    {
                        var pixel = this.textures.getPixel(x + maxX * col, y + maxY * row, "brick");

                        if(pixel.alpha > 0)
                        {
                            graphicsHolders[texKey].fillStyle(pixel.color, pixel.alpha);
                            graphicsHolders[texKey].fillRect(x, y, 1, 1);
                        }
                    }
                } 

                graphicsHolders[texKey].generateTexture(texKey, maxX, maxY);
                // graphics.clear();
            }
        }
        
        // for(var key in graphicsHolders)
        // {
        //     graphicsHolders[key].destroy();
        //     delete graphicsHolders[key];
        // }

        this.add.image(200, 200, "brick00").setScrollFactor(0).setScale(2);
        this.add.image(200, 200 + 16, "brick01").setScrollFactor(0).setScale(2);
        this.add.image(200 + 16, 200, "brick10").setScrollFactor(0).setScale(2);
        this.add.image(200 + 16, 200 + 16, "brick11").setScrollFactor(0).setScale(2);
        // this.add.image(200, 208, "brick10").setScrollFactor(0).setScale(2);
        // this.add.image(208, 208, "brick11").setScrollFactor(0).setScale(2);

        // var blocksWidth = srcTexture.width / blocksCol;
        // var blocksHeight = srcTexture.height / blocksRow;

        // for(var col = 0; col <= blocksCol; col++)
        // {
        //     for(var row = 0; row <= blocksRow; row++)
        //     {
        //         var graphicsX = col * blocksWidth;
        //         var graphicsY = row * blocksHeight;
        //         var graphicsEndX = (col + 1) * blocksWidth;
        //         var graphicsEndY = (row + 1) * blocksHeight;

        //         var graphics = this.make.graphics({ x: graphicsX, y: graphicsY, add: false });
            
        //         // for(var x = graphicsX; x < graphicsEndX; x++)
        //         // {
        //         //     for(var y = graphicsY; y < graphicsEndY; y++)
        //         //     {
        //         //         var pixel = this.textures.getPixel(x, y, "brick");

        //         //         if(pixel.alpha > 0)
        //         //         {
        //         //             graphics.fillStyle(pixel.color, pixel.alpha);
        //         //             graphics.fillRect(x, y, 1, 1);
        //         //         }
        //         //     }   
        //         // }

        //         graphics.generateTexture("brick" + col.toString() + row.toString(), blocksWidth, blocksHeight);
        //         graphics.destroy();
        //     }
        // }

    }

    public showBrickBreaking()
    {

    }

    public fadeOut(...args: any[])
    {
        this.cameras.main.fadeOut.apply(this.cameras.main, arguments);
    }

    public fadeIn(...args: any[])
    {
        this.cameras.main.fadeIn.apply(this.cameras.main, arguments);
    }
}