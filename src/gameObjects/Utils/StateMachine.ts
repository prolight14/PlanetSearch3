class StateMachine
{
    constructor(states: any)
    {
        // var func = function(name: string)
        // {
        //     if(!state[name])
        //     {
        //         state[name] = function() {};
        //     }
        // };

        // for(var i in states)
        // {
        //     var state = states[i];
    
        //     // Loop through names of functions that should be in a state
        //     ["start", "update", "stop"].forEach(func);
        // }

        this.states = states;
    }

    public states: any;
    
    public start(...args: any[])
    {
        var _this = this;

        // Start all states in the arguments array
        Array.prototype.slice.call(arguments).forEach(function(stateName: string)
        {
            var state = _this.states[stateName];

            state.on = true;
            state.start(this);
        });
    }

    public emit(name: string, args: Array<any>)
    {
        for(var i in this.states)
        {
            var state = this.states[i];

            if(state.on)
            {
                state[name].apply(state, args);
            }
        }
    }

    public emitState(stateName: string, name: string, args: Array<any>)
    {
        var state = this.states[stateName];

        if(state.on)
        {
            state[name].apply(state, args);
        }
    }    

    public stop(...args: any[])
    {
        var _this = this;

        // Stop all states in the arguments array
        Array.prototype.slice.call(arguments).forEach(function(stateName: string)
        {
            var state = _this.states[stateName];

            state.on = false;
            state.stop(this);
        });
    };
}

export default StateMachine;