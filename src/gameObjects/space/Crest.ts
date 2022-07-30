import SpaceScene from "../../scenes/space/SpaceScene";
import timer from "../Utils/Timer";
import COL_CATEGORIES from "./CollisionCategories";
import PlayerShip from "./PlayerShip";
import SpaceGameObject from "./SpaceGameObject";

export default class Crest extends SpaceGameObject
{
    constructor(scene: SpaceScene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture);

        this.setAngle(Phaser.Math.RND.between(0, 180));
        
        this.setCollisionCategory(COL_CATEGORIES.PICK_UP);
        this.setCollidesWith(COL_CATEGORIES.PLAYER);

        this.despawnTimer = timer(true,  this.startBlinkingTime, () =>
        {
            this.startBlinking();
        });

        scene.matterCollision.addOnCollideStart({
            objectA: this,
            callback: function(event)
            {
                const { gameObjectB } = event;

                if((gameObjectB as PlayerShip)._arrayName === "playerShip")
                {
                    const playerShip = (gameObjectB as PlayerShip);

                    this.onCollide(playerShip);
                }
            },
            context: this
        });
    }

    private startBlinkingTime: number = 10000;
    private blinkInterval: number = 30;
    private despawnAfterBlinkingTime: number = 4500; 

    private isBlinking: boolean = false;
    private despawnTimer: { update: () => void; };
    private blinkTimer: { update: () => void; reset: (time: number) => void; };

    private startBlinking()
    {
        if(this.isBlinking)
        {
            return;
        }

        this.isBlinking = true;

        this.blinkTimer = timer(true, this.blinkInterval, () =>
        {
            this.setVisible(!this.visible);

            this.blinkTimer.reset(this.blinkInterval);
        });

        this.despawnTimer = timer(true, this.despawnAfterBlinkingTime, () =>
        {
            this.destroy();
        });
    }

    public amt: number = 1;

    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);

        this.despawnTimer.update();

        if(this.isBlinking)
        {
            this.blinkTimer.update();
        }
    }

    public onCollide(playerShip: PlayerShip)
    {
        playerShip.collectCrests(this);

        this.kill();
    }
}