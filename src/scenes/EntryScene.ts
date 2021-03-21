import SpaceScene from "./space/SpaceScene";

// The entry scene / entry scene point will handle save data and switching between scenes
export default class EntryScene extends Phaser.Scene
{
    constructor()
    {
        super("entry");
    }

    currentSceneGroup: string;
    
    public preload()
    {
        var whichSceneGroup = "space";

        this.currentSceneGroup = whichSceneGroup;
    }

    public create()
    {   
        this.scene.run(this.currentSceneGroup);
    }

    public sleepSceneGroup(sceneGroup: string)
    {
        (this.scene.get(sceneGroup) as SpaceScene).sleepScenes();
    }

    public runSceneGroup(sceneGroup: string)
    {
        // Todo: change to unit test
        // if(["planet", "space"].indexOf(sceneGroup) === -1 || sceneGroup !== this.currentSceneGroup)
        // {
        //     return;
        // }
        
        this.scene.sleep(this.currentSceneGroup);
        
        this.currentSceneGroup = sceneGroup;

        this.scene.run(sceneGroup);
    }
}