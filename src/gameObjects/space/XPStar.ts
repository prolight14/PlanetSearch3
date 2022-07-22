import SpaceLogicScene from "../../scenes/space/SpaceLogicScene";
import SpaceScene from "../../scenes/space/SpaceScene";
import timer from "../Utils/timer";
import PlayerShip from "./PlayerShip";
import SpaceGameObject from "./SpaceGameObject";

export default class XPStar extends SpaceGameObject
{
    constructor(scene: SpaceScene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture);

        this.setAngle(Phaser.Math.RND.between(0, 180));

        // this.setCollisionGroup(-1);
        // // this.setCollidesWith(0);

        // this.collides = ["playerShip"];

        // const col_objects: Array<SpaceGameObject> = [];

        // this.collides.forEach(arrayName => 
        // {
        //     this.scene.world.get.gameObjectArray(arrayName).forEach((gameObject: SpaceGameObject) =>
        //     {
        //         col_objects.push(gameObject);
        //     });
        // });

        // this.body.collisionFilter = {
        //     'group': -1,
        //     'category': 2,
        //     'mask': 0,
        // };

        this.despawnTimer = timer(true,  this.startBlinkingTime, () =>
        {
            this.startBlinking();
        });

        if(texture === "xpStar")
        {
            this.amt = 2;
        }

        // const spaceLogicScene = (scene.scene.get("spaceLogic") as SpaceLogicScene);
        // const playerShip = spaceLogicScene.playerShip;

        // const detector: MatterJS.Detector = new Phaser.Physics.Matter.();

        // this.setOnCollideWith(playerShip, (pair: Phaser.Types.Physics.Matter.MatterCollisionData) =>
        // {
        //     this.onCollide(playerShip);
        // });

        // this.setOnCollide((colData: Phaser.Types.Physics.Matter.MatterCollisionData) =>
        // {
        //     if(colData.bodyA.gameObject && (colData.bodyA.gameObject as SpaceGameObject)._arrayName === "playerShip")
        //     {
        //         var playerShip = colData.bodyA.gameObject;

        //         this.onCollide(playerShip);
        //     }
        // });

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

    public collides: Array<string>;
     
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

    public scene: SpaceScene;

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
        playerShip.collectXPStars(this);

        this.kill();
    }
}