import State from "./State";

class StateMachine
{
    constructor(states: any)
    {
        this.states = states;
    }

    public states: any;
    
    public startMultiple(...args: any[])
    {
        Array.prototype.slice.call(arguments).forEach((key: string) =>
        {
            this.start(key);
        }); 
    }

    public start(key: string, args?: Array<any>)
    {
        var state = this.states[key];

        state.on = true;
        state.start.apply(state, args);
    };

    public emit(name: string, args: Array<any>)
    {
        for(var i in this.states)
        {
            var state = this.states[i];

            if(state.on && state[name] !== undefined)
            {
                state[name].apply(state, args);
            }
        }
    }

    public emitState(stateName: string, name: string, args: Array<any>)
    {
        var state = this.states[stateName];

        if(state.on && state[name] !== undefined)
        {
            state[name].apply(state, args);
        }
    }    

    public getState(key: string): State
    {
        return this.states[key];
    }

    public stopAll()
    {
        for(var i in this.states)
        {
            const state = this.states[i];
            state.on = false;
            state.stop();
        };
    }

    public stopMultiple(...args: any[])
    {
        Array.prototype.slice.call(arguments).forEach((key: string) =>
        {
            this.stop(key);
        }); 
    }

    public stop(key: string, args?: Array<any>)
    {
        var state = this.states[key];

        state.on = false;
        state.stop.call(state, args);
    };
}

export default StateMachine;