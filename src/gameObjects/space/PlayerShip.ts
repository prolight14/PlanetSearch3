import SpaceScene from "../../scenes/space/SpaceScene";
import SpaceGameObject from "./SpaceGameObject";

export default class PlayerShip extends SpaceGameObject
{
    constructor (scene: SpaceScene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture);

        this.keys = {
            a: scene.input.keyboard.addKey('a'), 
            d: scene.input.keyboard.addKey('d'),
            w: scene.input.keyboard.addKey('w'),
            s: scene.input.keyboard.addKey('s')
        };

        this.controls = {
            turnLeft: () =>
            {
                return this.keys.a.isDown;
            },
            turnRight: () =>
            {
                return this.keys.d.isDown;
            },
            goForward: () =>
            {
                return this.keys.w.isDown;
            }            
        };

        this.setScale(2, 2);
        this.angleVel = 3;
        this.speed = 6;
    }

    angleVel: number;
    speed: number;
    keys: any;
    controls: any;

    public preUpdate()
    {
        if(this.controls.turnLeft())
        {
            this.setAngle(this.angle - this.angleVel);
        }     
        if(this.controls.turnRight())
        {
            this.setAngle(this.angle + this.angleVel);
        }

        if(this.controls.goForward())
        {
            let angle = Phaser.Math.DEG_TO_RAD * (this.angle - 90);
            this.x += Math.cos(angle) * this.speed;
            this.y += Math.sin(angle) * this.speed;
        }

        this.bodyConf.update();
    }
}