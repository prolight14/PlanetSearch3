import PlanetLogicScene from "../../scenes/planet/PlanetLogicScene";
import ILifeform from "./ILifeform";
import Player from "./Player";

export default class Slope extends Phaser.Physics.Arcade.Image
{
    constructor(scene: PlanetLogicScene, way: string, x: number, y: number)
    {
        super(scene, x, y, "slope");
        this.way = way;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setMaxVelocity(0, 0);
        this.setImmovable(true);
        this.setOrigin(0, 0);
        this.setScale(16 / this.displayWidth, 16 / this.displayHeight);
        this.setVisible(false);

        switch(this.way)
        {
            case "leftUp":
                this.triangle = new Phaser.Geom.Triangle(
                    this.x, this.y,
                    this.x, this.y + this.displayHeight,
                    this.x + this.displayWidth, this.y + this.displayHeight,
                );

                this.processCollision = function(object: any)
                {
                    object.isOnSlope = false;
                    if(this.intersects(object.getBounds()))
                    {
                        let dx = object.body.x - this.body.x;
                        object.y = this.body.y + this.body.height + dx - object.body.height;
                        object.body.blocked.down = true;
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

                this.processCollision = function(object: any)
                {
                    object.isOnSlope = false;
                    if(this.intersects(object.getBounds()))
                    {
                        let dx = this.body.x - object.body.x;
                        object.y = this.body.y + this.body.height + dx - object.body.height;
                        object.body.blocked.down = true;
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
    private way: string;
    processCollision(object: Player) {}

    triangle: Phaser.Geom.Triangle;
    
    private intersects(rect: any)
    {
        return Phaser.Geom.Intersects.RectangleToTriangle(rect, this.triangle);
    }
}