// interface StateIndex
// {
//     [key: string]: any;
//     start?: () => void;
//     stop?: () => void;
// }

export default class State
{
    // constructor(methods: StateIndex)
    // {
    //     for(var i in methods)
    //     {
    //         (this as StateIndex)[i] = methods[i];
    //     }
    // }

    public start(...args: Array<any>): any
    {

    }

    public stop(...args: Array<any>): any
    {

    }
}