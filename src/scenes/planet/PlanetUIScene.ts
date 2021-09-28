import Player from "../../gameObjects/planet/Player";
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

        this.time.delayedCall(100, () =>
        {
            this.infoBar.init();
        });
    }

    public update()
    {
        if(this.scene.isActive("planetLogic"))
        {
            this.infoBar.update();
        }
    }
}