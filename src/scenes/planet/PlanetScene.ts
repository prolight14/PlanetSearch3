import EntryScene from "../EntryScene";
import ISceneGroupHead from "../ISceneGroupHead";
import PlanetLogicScene from "./PlanetLogicScene";

export default class PlanetScene extends Phaser.Scene implements ISceneGroupHead
{
    constructor()
    {
        super("planet");
    }
    
    public loaded: boolean = false;
    
    public receiveInfo(levelInfo: object)
    {
        (this.scene.get("planetLogic") as PlanetLogicScene).receiveLevelInfo(levelInfo);
    }

    public create()
    {
        this.spaceBar = this.input.keyboard.addKey("Space");
        
        this.runScenes();
        this.loaded = true;
    }
    
    spaceBar: Phaser.Input.Keyboard.Key;

    public update()
    {
        if(this.spaceBar.isDown)
        {
            this.switchToSpaceSceneGroup();
        }
    }

    public sleepScenes(calledByEntryScene?: boolean) 
    {
        this.scene.sleep("planetLogic");
        this.scene.sleep("planetEffects");
        this.scene.sleep("planetBack");
        this.scene.sleep("planetUI");
    }
    public runScenes(calledByEntryScene?: boolean) 
    {
        this.scene.run("planetBack");
        this.scene.run("planetLogic");
        this.scene.run("planetUI");
        this.scene.run("planetEffects");
    }

    public switchToSpaceSceneGroup()
    {
        var entryScene: EntryScene = this.scene.get("entry") as EntryScene;

        this.spaceBar.reset();
        entryScene.switchSceneGroup("space");
    }
}