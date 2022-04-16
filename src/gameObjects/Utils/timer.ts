
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

    var reset = function(newInterval?: number, _args?: Array<any>)
    {
        if(newInterval !== undefined)
        {
            interval = newInterval;
        }

        if(_args !== undefined)
        {
            args = _args;
        }

        startTime = performance.now();
        called = false;
    };

    return {
        update: update,
        reset: reset
    };
};

export default timer;