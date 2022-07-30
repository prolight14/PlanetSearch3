import SpaceScene from "../../scenes/space/SpaceScene";
import PlayerShip from "./PlayerShip";
import Ship from "./Ship";
import SpaceGameObject from "./SpaceGameObject";

export default class Star extends SpaceGameObject
{
    constructor(scene: SpaceScene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture);

        // this.setVisible(false);

        // this.setScale(3);
        this.setStatic(true);

        this.body.collisionFilter = {
            'group': -1,
            'category': 2,
            'mask': 0,
        };
    } 

    public getType: () => string = () => 
    {
        return "body";
    };

    private radius: number = 600;

    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);
        this.bodyConf.update();
    }

    private damageSpeed: number = 0.005;

    public getDamage(object: SpaceGameObject): number
    {
        const dx = this.x - object.x;
        const dy = this.y - object.y;
        const radius = this.displayWidth * 0.5;
        return (1 - (dx * dx + dy * dy) / (radius * radius)) * (1 - this.damageSpeed);
    }

    public onCollide(object: Ship)
    {
        if(object.isShip)
        {
            object.takeDamage(this);
        }
    }
}