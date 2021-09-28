var logger = {
    warn: function(...args: Array<any>)
    {
        console.warn.apply(console, arguments);
    }
};

export default logger;