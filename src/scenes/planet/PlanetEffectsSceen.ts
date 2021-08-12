export default class PlanetEffectsScene extends Phaser.Scene
{
    constructor()
    {
        super("planetEffects");
    }    

    create()
    {
        
    }

    public fadeOut(...args: any[])
    {
        this.cameras.main.fadeOut.apply(this.cameras.main, arguments);
    }

    public fadeIn(...args: any[])
    {
        this.cameras.main.fadeIn.apply(this.cameras.main, arguments);
    }
}