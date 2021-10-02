import PlanetLogicScene from "../../scenes/planet/PlanetLogicScene";
import StaticGameObject from "./StaticGameObject";

export default class Slope extends StaticGameObject
{
    constructor(scene: PlanetLogicScene, way: string, x: number, y: number)
    {
        super(scene, x, y, "slope", undefined, false);
        this.way = way;
        this.name = "slope";

        scene.physics.add.existing(this);

        this.setMaxVelocity(0, 0);
        this.setImmovable(true);
        this.setOrigin(0, 0);
        this.setScale(16 / this.displayWidth, 16 / this.displayHeight);
        this.setVisible(false);

        switch(this.way)
        {
            case "leftUp":
                const offset = 0;
                const yOffset = 0;

                this.triangle = new Phaser.Geom.Triangle(
                    this.x - offset, this.y - offset - yOffset,
                    this.x, this.y + this.displayHeight,
                    this.x + this.displayWidth + offset, this.y + this.displayHeight + offset - yOffset,
                );

                this.onOverlap = function(object: any)
                {
                    object.isOnSlope = false;
                    if(object.body.x <= this.body.x)
                    {
                        object.isOnSlope = true;
                        object.body.y = this.body.y - object.body.height - yOffset;
                    }

                    if(this.intersects(object.getBounds()))
                    {
                        let dx = object.body.x - this.body.x;
                        object.y = this.body.bottom + dx - object.body.halfHeight - this.body.height - yOffset;
                        object.body.blocked.down = true;
                        object.body.touching.down = true;
                        object.isOnSlope = true;
                        object.body.velocity.y = 0;
                    }
                };
                break;

            case "rightUp":
                this.triangle = new Phaser.Geom.Triangle(
                    this.x, this.y + this.displayHeight,
                    this.x + this.displayWidth, this.y,
                    this.x + this.displayWidth, this.y + this.displayHeight
                );

                this.onOverlap = function(object: any)
                {
                    object.isOnSlope = false;
                    if(object.body.right >= this.body.right)
                    {
                        object.body.y = this.body.y - object.body.height;
                        object.isOnSlope = true;
                    }

                    if(this.intersects(object.getBounds()))
                    {
                        let dx = this.body.x - object.body.x;
                        object.y = this.body.bottom + dx - object.body.halfHeight - this.body.height;
                        object.body.blocked.down = true;
                        object.body.touching.down = true;
                        object.isOnSlope = true;
                        object.body.velocity.y = 0;
                    }
                };
                break;
        }

        // let graphics = scene.add.graphics({});

        // graphics.lineStyle(2, 0x00ff00);
        // graphics.strokeTriangleShape(this.triangle);
    }
    public way: string;
    onOverlap(object: any) {}

    triangle: Phaser.Geom.Triangle;
    
    public intersects(rect: any)
    {
        return Phaser.Geom.Intersects.RectangleToTriangle(rect, this.triangle);
    }
}