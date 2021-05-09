import SpaceScene from "./space/SpaceScene";

// The entry scene / entry scene point will handle save data and switching between scenes
export default class EntryScene extends Phaser.Scene
{
    constructor()
    {
        super("entry");
    }

    currentHeadScene: string;
    
    public preload()
    {
        var whichSceneGroup = "space";

        this.currentHeadScene = whichSceneGroup;
    }

    public create()
    {   
        this.scene.run(this.currentHeadScene);
    }

    public sleepSceneGroup(sceneGroup: string)
    {
        (this.scene.get(sceneGroup) as SpaceScene).sleepScenes();
    }

    public runSceneGroup(sceneGroup: string)
    {
        this.scene.sleep(this.currentHeadScene);
        
        this.currentHeadScene = sceneGroup;

        this.scene.run(sceneGroup);
    }
}