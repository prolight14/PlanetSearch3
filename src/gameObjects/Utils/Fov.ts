import SpaceScene from "../../scenes/space/SpaceScene";
import Ship from "../space/Ship";
import SpaceGameObject from "../space/SpaceGameObject";

export default class Fov
{
    constructor(scene: SpaceScene, ship: Ship)
    {
        this.scene = scene;
        this.ship = ship;
    }

    private scene: SpaceScene;
    private ship: Ship;

    /**
     * 
     * @param viewAngle The angle where the ship is looking (degrees)
     * @param viewRange How far the ship can see (degrees)
     * @param fov The field of view (degrees)
     */
    public look(viewAngle: number, viewRange: number, fov: number)
    {
        const objectsInRange: Array<SpaceGameObject> = this.getObjectsInRange(viewRange);

        const filteredObjects: Array<any> = [];

        const viewRangeSquared = viewRange * viewRange;

        objectsInRange.forEach((gameObject: SpaceGameObject) =>
        {
            const dx = gameObject.x - this.ship.x;
            const dy = gameObject.y - this.ship.y;

            if(dx * dx + dy * dy < viewRangeSquared)
            {
                const angleBetween = Phaser.Math.Angle.Reverse(Phaser.Math.Angle.BetweenPoints(gameObject, this.ship)) * Phaser.Math.RAD_TO_DEG;
                const angleDiff = Phaser.Math.Angle.ShortestBetween(viewAngle, angleBetween);
    
                if(Math.abs(angleDiff) < fov)
                {
                    filteredObjects.push({
                        object: gameObject,
                        angleDiff: angleDiff,
                        angleBetween: angleBetween,
                    });
                }
            }
        });

        return filteredObjects;
    }

    private getObjectsInRange(viewRange: number): Array<SpaceGameObject>
    {
        const ship = this.ship;

        return this.scene.world.getObjectsInBox(
            ship.x - viewRange,
            ship.y - viewRange,
            ship.x + viewRange,
            ship.y + viewRange
        ) as Array<SpaceGameObject>;
    }
}

