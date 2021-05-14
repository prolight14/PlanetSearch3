import SpaceScene from "../../scenes/space/SpaceScene";
import Ship from "./Ship";

export default class PlayerShip extends Ship
{
    constructor (scene: SpaceScene, x: number, y: number)
    {
        super(scene, x, y, "playerShip");

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
            },
            shoot: () => false         
        };

        this.setScale(2, 2);
        this.angleVel = 3;
        this.speed = 6;
    }

    public keys: any;
   
    public preUpdate()
    {
        Ship.prototype.preUpdate.apply(this, arguments);
    }
}