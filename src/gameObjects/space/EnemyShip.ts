import SpaceLogicScene from "../../scenes/space/SpaceLogicScene";
import SpaceScene from "../../scenes/space/SpaceScene";
import timer from "../Utils/timer";
import trig from "../Utils/trig";
import Ship from "./Ship";
import SpaceGameObject from "./SpaceGameObject";

export default class EnemyShip extends Ship
{
    protected turnDir: string;
    public isEnemyShip(): boolean { return true; };

    constructor(scene: SpaceScene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture);

        this.turnDir = "";

        this.controls = {
            turnLeft: () =>
            {
                return this.turnDir === "left";
            },
            turnRight: () =>
            {
                return this.turnDir === "right";
            },
            goForward: () =>
            {
                return this.move;
            },
            slowDown: () => false,
            shoot: () => 
            {
                return this.isShooting;
            }         
        };

        this.angleVel = 3;

        this.lookTimer = timer(true, 70, () =>
        {
            this.fovLook();

            this.lookTimer.reset();
        });

        this.fovSetup();
    }
    
    public scene: SpaceScene;
    public showHpBar: boolean = true;

    protected move: boolean = true;
    protected isShooting: boolean = false;


    private lookTimer: { update: () => any; reset: () => any;  };
    private fovRadius: number = 400;
    private fovRadiusSquared: number;
    private fovAngle: number = 60;
    private halfFovAngle: number;

    private fovSetup()
    {
        this.halfFovAngle = this.fovAngle / 2;
        this.fovRadiusSquared = this.fovRadius * this.fovRadius;
    }

    private fovLook()
    {
        var objectsInCells: Array<SpaceGameObject> = [];
        const world = this.scene.world;

        objectsInCells = this.scene.world.getObjectsInBox(
            this.x - this.fovRadius,
            this.y - this.fovRadius,
            this.x + this.fovRadius,
            this.y + this.fovRadius
        ) as Array<SpaceGameObject>;

        // const minCoor = this.scene.world.cameraGrid.getCoordinates(
        //     Math.floor(this.x - this.fovRadius),
        //     Math.floor(this.y - this.fovRadius)
        // ); 
        // const maxCoor = this.scene.world.cameraGrid.getCoordinates(
        //     Math.floor(this.x + this.fovRadius),
        //     Math.floor(this.y + this.fovRadius)
        // );

        // world.cameraGrid.loopThroughCells(
        //     minCoor.col, minCoor.row,
        //     maxCoor.col, maxCoor.row,
        //     function(cell: Array<any>, col: number, row: number)
        //     {
        //         for(var i in cell)
        //         {
        //             var object = world.get.gameObject(cell[i].arrayName, cell[i].id);
        //             if(object !== undefined)
        //             {
        //                 objectsInCells.push(object);
        //             }
        //         }
        //     }
        // );

        this.visibleObjects.length = 0;

        this.canSeeSomething = false;

        // var minAngle = this.angle + 90 - this.fovAngle / 2;
        // var maxAngle = this.angle + 90 + this.fovAngle / 2;
        var minAngle = this.angle - this.halfFovAngle;
        var maxAngle = this.angle + this.halfFovAngle;

        // minAngle = minAngle - 90;
        if(minAngle < 0)
        {
            minAngle = minAngle + 360;
        }
        // maxAngle = maxAngle - 90;
        if(maxAngle < 0)
        {
            maxAngle = maxAngle + 360;
        }

        // original
        // var minAngle = this.angle - this.fovAngle / 2;
        // var maxAngle = this.angle + this.fovAngle / 2;

        for(var i = 0; i < objectsInCells.length; i++)
        {
            // if(objectsInCells[i]._arrayName === "playerShip")
            // {   
            var object = objectsInCells[i];
            
            if(Phaser.Math.Distance.BetweenPointsSquared(object, this) > this.fovRadiusSquared)
            {
                continue;
            }

            var angleBetween = Phaser.Math.Angle.BetweenPoints(object, this) * Phaser.Math.RAD_TO_DEG;
            angleBetween = angleBetween - 90;
            if(angleBetween < 0)
            {
                angleBetween = angleBetween + 360;
            }

            if(angleBetween > minAngle && angleBetween < maxAngle)
            {
                this.canSeeSomething = true;
                this.visibleObjects.push({
                    gameObject: object,
                    angleBetween: angleBetween
                });
            }

            // }
        }
    }

    protected visibleObjects: Array<object> = [];
    protected canSeeSomething: boolean = false;

    public debugFov(graphics: Phaser.GameObjects.Graphics)
    {
        graphics.lineStyle(10, 0x0FAB23);
        // graphics.strokeCircle(this.x, this.y, this.fovRadius);

        graphics.fillStyle(0xBB0012, 0.4);
        graphics.beginPath();
        graphics.arc(this.x, this.y, this.fovRadius, (this.angle - 90 - this.fovAngle / 2) * Phaser.Math.DEG_TO_RAD, (this.angle - 90 + this.fovAngle / 2) * Phaser.Math.DEG_TO_RAD);
        // graphics.closePath();
        graphics.strokePath();

        if(this.canSeeSomething)
        {
            graphics.fillPath();
        }
    }
    
    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);

        this.lookTimer.update();
    }

    protected onKill()
    {
        this.dropXP();
        this.dropCrests();
    }

    protected xpDropAmt: number = 3;

    private dropXP()
    {
        const spaceLogicScene = (this.scene.scene.get("spaceLogic") as SpaceLogicScene);

        for(var i = 0; i < this.xpDropAmt; i++)
        {
            if(Phaser.Math.RND.frac() < 0.5)
            {
                spaceLogicScene.addXPStar(this.x, this.y);
            }
            else
            {
                spaceLogicScene.addSmallXPStar(this.x, this.y);
            }
        }
    }

    protected crestDropAmt: number = Phaser.Math.RND.between(3, 6);

    private dropCrests()
    {
        const spaceLogicScene = (this.scene.scene.get("spaceLogic") as SpaceLogicScene);

        for(var i = 0; i < this.crestDropAmt; i++)
        {
            spaceLogicScene.addCrests(this.x, this.y);
        }
    }
}