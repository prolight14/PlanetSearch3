import SpaceScene from "../../scenes/space/SpaceScene";
import EnemyShip from "./EnemyShip";
import COL_CATEGORIES from "./CollisionCategories";
import SpaceGameObject from "./SpaceGameObject";

export default class HyperBeamerShip extends EnemyShip
{
    constructor(scene: SpaceScene, x: number, y: number)
    {
        super(scene, x, y, "greenShip");

        this.setCollisionCategory(COL_CATEGORIES.ENEMY);
        this.setCollidesWith([COL_CATEGORIES.PLAYER, COL_CATEGORIES.PLAYER_BULLETS]);

        this.maxSpeed = 3.75;
        this.angleVel = 1.3;
        this.hp = 12;
        this.maxHp = 12;

        this.fovStats.range = 400;
        this.fovStats.fov = 60;

        this.setScale(2);
        
        scene.anims.create({
            key: "flying",
            frames: [{ key: "greenShip", frame: 0 }, { key: "greenShip", frame: 1 }],
            frameRate: 8,
            repeat: -1
        });

        this.anims.play("flying");

        this.setAngle(Phaser.Math.RND.angle());
    }

    private cur_state: string = "wander";

    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);

        // Todo: Change to state machine

        this.movement.angleDir = "none";

        const visibleObjects = this.fov.look(this.angle - 90, this.fovStats.range, this.fovStats.fov);
        this.canSeeSomething = (visibleObjects.length > 0);

        visibleObjects.forEach((objectInfo: any) =>
        {
            const gameObject = objectInfo.object;
            const angleDiff = objectInfo.angleDiff;

            switch(gameObject._arrayName)
            {
                case "playerShip":
                    if(this.hp > this.maxHp * 0.4)
                    {
                        this.cur_state = "follow";
                    }
                    else
                    {
                        this.cur_state = "run";
                    }

                    if(this.cur_state === "follow")
                    {
                        if(Math.abs(angleDiff) > this.angleVel)
                        {
                            this.movement.angleDir = (angleDiff < 0) ? "left" : "right";
                        }
                        else
                        {
                            this.movement.angleDir = "none";
                        }
                    }
                    else if(this.cur_state === "run")
                    {
                        if(Math.abs(angleDiff) < 45)
                        {
                            this.movement.angleDir = (angleDiff < 0) ? "right" : "left";
                        }
                        else
                        {
                            this.movement.angleDir = "none";
                        }
                    }
                    break;
            }
        });
    }
}