type CSPConfig = {
    window: {
        width: number;
        height:  number;
    },
    grid: {
        cols: number;
        rows: number;
        cellWidth: number;
        cellHeight: number;
    },
    seed: number | string
};

export default class SpaceHandler
{
    constructor(config: CSPConfig)
    {
        this.seed = config.seed;
    }

    private seed: number | string;

    public buildSpace()
    {

    }

    
}
