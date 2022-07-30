import SpaceLogicScene from "../../scenes/space/SpaceLogicScene";
import SpaceScene from "../../scenes/space/SpaceScene";
import timer from "../Utils/Timer";
import trig from "../Utils/trig";
import Ship from "./Ship";
import SpaceGameObject from "./SpaceGameObject";

export default class OLD_EnemyShip extends Ship
{
    public turnDir: string;
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
                return this.isMoving;
            },
            slowDown: () => false,
            shoot: () => 
            {
                return this.isShooting;
            }         
        };

        this.angleVel = 3;
        this.fovLookDelay = 50;

        this.lookTimer = timer(true, this.fovLookDelay, () =>
        {
            this.fovLook();

            this.lookTimer.reset(this.fovLookDelay);
        });

        this.fovSetup();
    }
    
    protected fovLookDelay: number;

    public scene: SpaceScene;
    public showHpBar: boolean = true;

    protected isMoving: boolean = true;
    protected isShooting: boolean = false;

    private lookTimer: { update: () => any; reset: (rtime: number) => any; };
    private fovRadius: number = 400;
    private fovRadiusSquared: number;
    private fovAngle: number = 60;
    private halfFovAngle: number;

    protected ignoreObjNames: Array<string> = [];

    protected setFovStats(fovRadius: number, fovAngle: number)
    {
        this.fovRadius = fovRadius;
        this.fovAngle = fovAngle;
        this.fovSetup();
    }

    private fovSetup()
    {
        this.halfFovAngle = this.fovAngle / 2;
        this.fovRadiusSquared = this.fovRadius * this.fovRadius;
    }

    private fovLook()
    {
        var objectsInCells: Array<SpaceGameObject> = [];

        objectsInCells = this.scene.world.getObjectsInBox(
            this.x - this.fovRadius,
            this.y - this.fovRadius,
            this.x + this.fovRadius,
            this.y + this.fovRadius
        ) as Array<SpaceGameObject>;

        this.visibleObjects.length = 0;
        this.canSeeSomething = false;

        for(var i = 0; i < objectsInCells.length; i++)
        { 
            var object = objectsInCells[i];

            if(this.ignoreObjNames.indexOf(object._arrayName) !== -1)
            {
                continue;
            }
            
            const distanceSquared = Phaser.Math.Distance.BetweenPointsSquared(object, this);
            if(distanceSquared > this.fovRadiusSquared)
            {
                continue;
            }

            const angleBetween = Phaser.Math.Angle.Reverse(Phaser.Math.Angle.BetweenPoints(object, this)) * Phaser.Math.RAD_TO_DEG;
            const angleDiff = Phaser.Math.Angle.ShortestBetween(this.angle - 90, angleBetween);

            if(Math.abs(angleDiff) < this.halfFovAngle)
            {
                this.canSeeSomething = true;
                this.visibleObjects.push({
                    gameObject: object,
                    _arrayName: object._arrayName,

                    angleDiff: angleDiff,
                    angleBetween: angleBetween,

                    distanceSquared: distanceSquared
                });
            }
        }
    }
    protected visibleObjects: Array<{ 
        gameObject: SpaceGameObject; 
        _arrayName: string; 

        angleBetween: number;
        angleDiff: number;

        distanceSquared: number;
    }> = [];

    protected canSeeSomething: boolean = false;

    public debugFov(graphics: Phaser.GameObjects.Graphics)
    {
        graphics.lineStyle(10, 0x0FAB23);
        // graphics.strokeCircle(this.x, this.y, this.fovRadius);

        graphics.fillStyle(0xBB0012, 0.4);
        graphics.beginPath();
        graphics.arc(
            this.x, 
            this.y, 
            this.fovRadius,
            (this.angle - 90 - this.halfFovAngle) * Phaser.Math.DEG_TO_RAD, 
            (this.angle - 90 + this.halfFovAngle) * Phaser.Math.DEG_TO_RAD
        );
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