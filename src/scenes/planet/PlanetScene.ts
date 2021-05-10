// import Player from "../../gameObjects/planet/Player";

import EntryScene from "../EntryScene";
import ISceneGroupHead from "../ISceneGroupHead";

export default class PlanetScene extends Phaser.Scene implements ISceneGroupHead
{
    constructor()
    {
        super("planet");
    }

    spaceBar: Phaser.Input.Keyboard.Key

    
    public preload()
    {
        
    }
    
    public loaded: boolean = false;

    public create()
    {
        this.spaceBar = this.input.keyboard.addKey("Space");

        this.runScenes();
        this.loaded = true;
    }

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
    }
    public runScenes(calledByEntryScene?: boolean) 
    {
        this.scene.run("planetLogic");
    }

    public switchToSpaceSceneGroup()
    {
        var entryScene: EntryScene = this.scene.get("entry") as EntryScene;

        this.spaceBar.reset();
        entryScene.switchSceneGroup("space");
    }
}