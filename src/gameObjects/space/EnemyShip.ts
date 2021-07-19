import SpaceScene from "../../scenes/space/SpaceScene";
import Ship from "./Ship";

var timer = function(start: boolean, interval: number, func: Function, scope?: object, args?: Array<any>)
{
    var startTime = performance.now();
    var called = !start;

    var update = function()
    {
        // When time is up is call the method
        if(!called && performance.now() - startTime > interval)
        {
            called = true;
            return func.apply(scope, args);
        }
    };

    var reset = function()
    {
        startTime = performance.now();
        called = false;
    };

    return {
        update: update,
        reset: reset
    };
};

export default class EnemyShip extends Ship
{
    private turnDir: string;
    private turnTimer: {
        update: Function;
        reset: Function;
    };

    constructor(scene: SpaceScene, x: number, y: number)
    {
        super(scene, x, y, "enemyShip");

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
            goForward: () => true,
            shoot: () => false         
        };

        // this.setScale(0.5, 0.5);
        this.angleVel = 3;
        this.speed = 4.5;

        this.turnTimer = timer(true, 1000, function()
        {
            switch(true)
            {
                case Math.random() <= 0.33:
                    this.turnDir = "left";
                    break;

                case Math.random() < 0.67:
                    this.turnDir = "right";
                    break;

                 case Math.random() <= 1.0:
                    this.turnDir = "";
                    break;
            }

            this.turnTimer.reset();
        }, this);
    }

    public preUpdate()
    {
        Ship.prototype.preUpdate.apply(this, arguments);

        this.turnTimer.update();
    }
}