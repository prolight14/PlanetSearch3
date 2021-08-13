import InfoBar from "../../UI/planet/InfoBar";

export default class PlanetUIScene extends Phaser.Scene
{
    constructor()
    {
        super("planetUI");
    }    

    private infoBar: InfoBar;

    public create()
    {
        this.infoBar = new InfoBar(this);
    }

    public update()
    {
        this.infoBar.update();
    }
}