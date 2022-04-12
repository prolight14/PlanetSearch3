import timer from "../gameObjects/Utils/timer";
import trig from "../gameObjects/Utils/trig";
import PlanetScene from "./planet/PlanetScene";
import SpaceScene from "./space/SpaceScene";

// The entry scene / entry scene point will handle save data and switching between scenes
export default class EntryScene extends Phaser.Scene
{
    constructor()
    {
        super("entry");
    }

    private currentSceneGroup: string;
    
    public preload()
    {
        this.currentSceneGroup = "space"; // "space" or "planet"
    }

    public create()
    {   
        this.scene.run(this.currentSceneGroup);
    }

    public switchSceneGroup(sceneGroup: string, callback?: Function, callbackScope?: object)
    {
        if(sceneGroup === this.currentSceneGroup)
        {
            throw `You are already in "${sceneGroup}" scene group`;
        }

        this.scene.sleep(this.currentSceneGroup);
        (this.scene.get(this.currentSceneGroup) as (PlanetScene | SpaceScene)).sleepScenes(true);

        if(callback !== undefined)
        {
            callback.apply(callbackScope, [this.scene.get(this.currentSceneGroup), this.scene.get(sceneGroup)]);
        }

        this.scene.run(sceneGroup);

        var nextScene = (this.scene.get(sceneGroup) as (PlanetScene | SpaceScene));
        if(nextScene.loaded)
        {
            nextScene.runScenes(true);
        }
        
        this.currentSceneGroup = sceneGroup;
    }
}