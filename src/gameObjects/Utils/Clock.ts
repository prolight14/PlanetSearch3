
class Clock
{
    private duration: number = 500;
    private running: boolean = false;
    private startTime: number = 0;

    constructor(duration?: number, start?: boolean)
    {
        if(start)
        {
            this.reset(duration);
            return;
        }

        if(duration !== undefined)
        {
            this.duration = duration;
        }
    }

    private getMilliseconds()
    {
        return performance.now();
    }

    /**
     * 
     * @param duration The new duration until the clock finishes.
     */
    public reset(duration?: number)
    {
        if(duration === undefined) { duration = this.duration; }

        this.duration = duration;
        this.running = true;
        this.startTime = this.getMilliseconds();
    }

    /**
     * 
     * @returns Is the clock finished?
     */
    public isFinished()
    {
        if(this.running && this.getMilliseconds() - this.startTime > this.duration)
        {
            this.running = false;
        }

        return !this.running;
    }
}


export default Clock;