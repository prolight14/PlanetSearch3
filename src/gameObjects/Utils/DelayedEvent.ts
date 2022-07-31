export default class DelayedEvent
{
    public active: boolean = false;
   
    public isCompletedArgs: Array<any> = [];
    public isCompleted: (...args: Array<any>) => boolean = ((...args: Array<any>) =>
    {
        return false;
    });
    public isCompletedContext: any = this;

    public onFinishArgs: Array<any> = [];
    public onFinish: (...args: Array<any>) => void = ((...args: Array<any>) => 
    {

    });
    public onFinishContext: any = this;

    public removeQueued: boolean = false;
    public removeOnInactive: boolean = false;

    public start(options: {
        removeOnInactive?: boolean;

        isCompletedArgs?: Array<any>;
        isCompleted?: (...args: Array<any>) => boolean;
        isCompletedContext?: any;

        onFinishArgs?: Array<any>;
        onFinish?: (...args: Array<any>) => any;
        onFinishContext?: any;
    })
    {
        if(options.removeOnInactive !== undefined)
        {
            this.removeOnInactive = options.removeOnInactive;
        }

        if(options.isCompletedArgs !== undefined)
        {
            this.isCompletedArgs = options.isCompletedArgs;
        }
        if(options.isCompleted !== undefined)
        {
            this.isCompleted = options.isCompleted;
        }
        if(options.isCompletedContext !== undefined)
        {
            this.isCompletedContext = options.isCompletedContext;
        }

        if(options.onFinishArgs !== undefined)
        {
            this.onFinishArgs = options.onFinishArgs;
        }
        if(options.onFinish !== undefined)
        {
            this.onFinish = options.onFinish;
        }
        if(options.onFinishContext !== undefined)
        {
            this.onFinishContext = options.onFinishContext;
        }

        this.active = true;
        return this;
    }

    public stop(finish?: boolean)
    {
        this.active = false;

        if(finish)
        {
            this.onFinish.apply(this.onFinishContext, this.onFinishArgs);
        }

        return this;
    }

    public destroy()
    {
        this.active = false;
        this.removeQueued = true;
    }

    public update()
    {
        if(this.active && this.isCompleted.apply(this.isCompletedContext, this.isCompletedArgs))
        {
            this.onFinish.apply(this.onFinishContext, this.onFinishArgs);
            this.active = false;
        }

        return this;
    }
}