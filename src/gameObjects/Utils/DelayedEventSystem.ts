import DelayedEvent from "./DelayedEvent";

export default class DelayedEventSystem
{
    constructor()
    {
        this.delayedEvents = [];   
    }

    private delayedEvents: Array<DelayedEvent>;

    public addEvent(removeOnInactive: boolean)
    {
        var d_event;
        // this.delayedEvents.push(d_event = new (Function.prototype.bind.apply(DelayedEvent, 
        // [null].concat(Array.prototype.slice.call(arguments)))));
        d_event = new DelayedEvent();
        this.delayedEvents.push(d_event);
        d_event.removeOnInactive = removeOnInactive;
        return d_event;
    }

    /**
     * Creates and starts a new event
     * @returns DelayedEvent
     */
    public startEvent(options: {
        removeOnInactive?: boolean;

        isCompletedArgs: Array<any>;
        isCompleted?: (...args: Array<any>) => boolean;
        isCompletedContext?: any;

        onFinishArgs?: Array<any>;
        onFinish?: (...args: Array<any>) => any;
        onFinishContext?: any;
    })
    {
        var d_event = new DelayedEvent();
        d_event.start(options);
        this.delayedEvents.push(d_event);
        return d_event;
    }

    public quickEvent(isCompletedArgs: Array<any>, isCompleted?: (...args: Array<any>) => boolean, onFinish?: (...args: Array<any>) => any)
    {
        return this.startEvent({
            removeOnInactive: true,
            isCompletedArgs: isCompletedArgs,
            isCompleted: isCompleted,
            onFinish: onFinish
        });
    }

    public updateEvents()
    {
        for(var i = this.delayedEvents.length - 1; i >= 0; i--)
        {
            const d_event = this.delayedEvents[i];
            d_event.update();

            if(d_event.removeQueued || d_event.removeOnInactive && !d_event.active)
            {
                this.delayedEvents.splice(i, 1);
            }
        }
    }
}