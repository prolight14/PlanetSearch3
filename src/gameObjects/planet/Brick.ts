import PlanetLogicScene from "../../scenes/planet/PlanetLogicScene";

export default class Brick extends Phaser.Physics.Arcade.Image
{
    constructor(scene: PlanetLogicScene, x: number, y: number)
    {
        super(scene, x, y, "brick");
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setMaxVelocity(0, 0);
        this.setImmovable(true);
        this.setOrigin(0, 0);

    }

    private explode()
    {

        // TODO: Speed up
        var brickGraphics = this.scene.make.graphics({ x: 0, y: 0, add: false });


        this.setVisible(false);
        // var src = this.scene.textures.get("brick").getSourceImage() as (HTMLImageElement | HTMLCanvasElement);
        // var canvas = this.scene.textures.createCanvas("map" + Date.now().toString(), src.width, src.height);
        // canvas.draw(0, 0, src);

        // console.log(canvas);
        var pixel = new Phaser.Display.Color();
        var sw = this.width * 0.5;
        var sh = this.height * 0.5;
        
        var x, y;

        for (x = 0; x < sw; x++)
        {
            for (y = 0; y < sh; y++)
            {
                // canvas.getPixel(x, y, pixel);
                pixel = this.scene.textures.getPixel(x, y, "brick");

                if (pixel.alpha > 0)
                {
                    brickGraphics.fillStyle(pixel.color, pixel.alpha);
                    brickGraphics.fillRect(x, y, 1, 1);
                }
            }
        }

        var texKey = "brick-leftUp" + Date.now().toString();

        brickGraphics.generateTexture(texKey, sw, sh);

        this.blocks = [];

        var upperLeftBlock = (this.scene.add.image(this.x, this.y, texKey) as ImagePlate).setOrigin(0, 0);

        upperLeftBlock.startX = upperLeftBlock.x;
        this.blocks.push(upperLeftBlock);


        // this.scene.add.particles(texKey, undefined, {
        //     gravityY
        // })
        this.destroying = true;
    }

    blocks: Array<ImagePlate>;
    private destroying: boolean;

    public preUpdate(delta: number, time: number)
    {
        super.update(delta, time);

        if(this.destroying && this.blocks !== undefined)
        {
            for(var i = this.blocks.length - 1; i >= 0; i--)
            {
                var block = this.blocks[i];

                block.y += 6;

                if(block.y > (this.scene.scene.get("planetLogic") as PlanetLogicScene).getLevelHeight())
                {
                    block.destroy();
                    this.blocks.splice(i, 1);
                }
            }

            if(this.blocks.length === 0)
            {
                this.destroy();
            }
        }
    }

    public onCollide(object: Phaser.Physics.Arcade.Sprite)
    {
        if(object.body.touching.up && this.body.touching.down)
        {
            this.explode();
            // this.destroy();
        }
    }
}

class ImagePlate extends Phaser.GameObjects.Image
{
    public startX: number;
}