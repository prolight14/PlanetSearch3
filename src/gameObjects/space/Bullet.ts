import SpaceScene from "../../scenes/space/SpaceScene";
import timer from "../Utils/timer";
import trig from "../Utils/trig";
import SpaceGameObject from "./SpaceGameObject";

export default class Bullet extends SpaceGameObject
{
    constructor(scene: SpaceScene, x: number, y: number, texture: string, shootAngle: number, life: number, onCollide: (gameObject: SpaceGameObject) => boolean, onCollideContext: any)
    {
        super(scene, x, y, texture);
        this.shootAngle = shootAngle;
        this.speed = 12;

        this.rangeSquared = this.range * this.range;
        var diff = this.range - 100;
        this.startFadeSquared = diff * diff;

        this.setDepth(0);

        this.killTimer = timer(true, life, () =>
        {
            this.kill();
        });

        this.setOnCollide((colData: Phaser.Types.Physics.Matter.MatterCollisionData) =>
        {
            if(colData.bodyA.gameObject)
            {
                const hit = onCollide.call(onCollideContext, colData.bodyA.gameObject);

                if(hit)
                {
                    this.kill();
                    (colData.bodyA.gameObject as SpaceGameObject).onCollide(this);
                }
            }
        });
    }

    public getType: () => string = () => 
    {
        return "Projectile";
    };

    private compareX: number = 0;
    private compareY: number = 0;

    public setComparePosition(x: number, y: number)
    {
        this.compareX = x;
        this.compareY = y;
    }

    public scene: SpaceScene;
    
    private shootAngle: number;
    public speed: number;

    private fading: boolean = false;

    private killTimer: {
        update: () => void;
    };

    private range: number = 500;
    private rangeSquared: number = 0;
    private startFadeSquared: number = 0;

    protected preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);

        this.killTimer.update();
        
        this.x += trig.cos(this.shootAngle) * this.speed;
        this.y += trig.sin(this.shootAngle) * this.speed;

        if(this.compareX !== 0 && this.compareY !== 0)
        {
            // Will not work for bullets that change direction
            const dx = this.x - this.compareX;    
            const dy = this.y - this.compareY;   
            const diffSquared = dx * dx + dy * dy;
            
            if(diffSquared > this.startFadeSquared)
            {
                this.fading = true;
            }

            if(this.fading)
            {
                this.alpha *= 0.7;
            }

            if(this.alpha < 0.001 && diffSquared > this.rangeSquared)
            {
                this.destroy();
                this.kill();
            }
        }
    }
}