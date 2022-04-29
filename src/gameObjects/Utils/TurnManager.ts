export default class TurnManager
{
    private followObject: any;
    private targetAngle: number = 0;
    private callback: () => void;
    private turning: boolean = false;

    constructor(followObject: any)
    {
        this.followObject = followObject;
    }

    public startTurning(angle: number, callback?: () => void)
    {
        this.targetAngle = Phaser.Math.Wrap(angle, -180, 180);

        this.callback = callback || function() {};

        // if(this.targetAngle === this.followObject.angle)
        // {
        //     this.followObject.turnDir = "";
        //     this.turning = false;
        //     this.callback();
        //     return;
        // }

        this.turning = true;
    }

    public isTurning()
    {
        return this.turning;
    }

    public update()
    {
        if(!this.turning)
        {
            return;
        }

        const followObject = this.followObject;

        var angleDiff = Phaser.Math.Wrap(this.targetAngle - followObject.angle, 0, 360);

        if(Math.abs(angleDiff) <= followObject.angleVel || followObject.angle === this.targetAngle)
        {
            followObject.angle = this.targetAngle;
            followObject.turnDir = "";
            this.turning = false;
            this.callback();
            return;
        }

        followObject.turnDir = (angleDiff > 180) ? "left" : "right";
    }
}
