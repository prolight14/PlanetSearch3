import Ship from "../../gameObjects/space/Ship";

export default class CameraTargetTracker
{
    private trackedObject: any;
    public x: number;
    public y: number;

    constructor(object?: any)
    {
        if(object)
        {
            this.trackedObject = object;
            this.x = object.x;
            this.y = object.y;
        }
    }

    public setTrackedObject(object: any)
    {
        this.trackedObject = object;
        this.x = object.x;
        this.y = object.y;
    }

    public update()
    {
        if(this.trackedObject && (this.trackedObject as Ship).body && (this.trackedObject as Ship).body.position)
        {
            this.x = this.trackedObject.x;
            this.y = this.trackedObject.y;
        }
    }
}