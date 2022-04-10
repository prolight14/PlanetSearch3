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

        this.load.spritesheet("transitionTile", "./assets/Loading/TransitionTile.png", 
        { 
            frameWidth: 64, 
            frameHeight: 64 
        });
    }

    private effect: Phaser.GameObjects.TileSprite;
    private effectFrame: number;
    private effectDirection: number;
    private effectDelay: number;
    private effectTimer: { update: () => any, reset: (newInterval?: number | undefined, _args?: any[] | undefined) => void; }
    private effectRunning: boolean = false;
    private effectCallback: Function;
    private effectCallbackScope: any;

    private createEffect()
    {
        const cam = this.cameras.main;
        this.effect = this.add.tileSprite(cam.x, cam.y, cam.width * 2, cam.height * 2, "transitionTile");//.setVisible(false);

        this.effectFrame = 0;
        this.effectDirection = 1;
        this.effectDelay = 5;

        var first = false;

        this.effectTimer = timer(true, this.effectDelay, () =>
        {
            if(!first)
            {
                first = true;
                return;
            }

            if(this.effectFrame < 0)
            {
                this.effectRunning = false;
                return;
            }
            else if(this.effectFrame > 27)
            {
                this.effectDirection = -this.effectDirection;

                this.effectCallback.apply(this.effectCallbackScope);
            } 

            this.effectFrame += this.effectDirection;

            this.effect.setFrame(this.effectFrame);

            this.effectTimer.reset();
        });
    }

    private startEffect(callback: Function, scope?: any)
    {
        if(scope === undefined) { scope = this; }

        this.effectFrame = 0;
        this.effectDirection = 1;
        this.effectDelay = 50;
        this.effectRunning = true;
        this.effect.setVisible(true);

        this.effectCallback = callback;
        this.effectCallbackScope = scope;
    }

    private updateEffect()
    {
        if(this.effectRunning)
        {
            this.effectTimer.update();
        }

        this.effect.setVisible(this.effectRunning);
    }

    public create()
    {   
        this.scene.run(this.currentSceneGroup);
        this.scene.bringToTop();

        this.createEffect();
    }

    public update(time: number, delta: number) 
    {
        this.updateEffect();
    }

    public newSwitchSceneGroup(sceneGroup: string, callback?: Function, callbackScope?: object)
    {
        this.startEffect(() =>
        {
            this.switchSceneGroup(sceneGroup, callback, callbackScope);
        });
    }

    // public newSwitchSceneGroup(sceneGroup: string, callback?: Function, callbackScope?: object)
    // {
    //     const curFXCam = (this.scene.get(this.currentSceneGroup) as (PlanetScene | SpaceScene)).cameras.main;


    //     // switch(this.currentSceneGroup)
    //     // {
    //     //     case "space":
    //     //         this.scene.bringToTop("spaceEffects");
    //     //         break;

    //     //     case "planet":
    //     //         this.scene.bringToTop("planetEffects");
    //     //         break;
    //     // }

    //     if(curFXCam.fadeEffect.isRunning)
    //     {
    //         return;
    //     }

    //     curFXCam.fadeOut(500, 0, 0, 0);

    //     curFXCam.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () =>
    //     {
    //         this.switchSceneGroup(sceneGroup, callback, callbackScope);
    //         curFXCam.fadeIn(0);

    //         (this.scene.get(this.currentSceneGroup) as (PlanetScene | SpaceScene)).getEffectsScene().cameras.main.fadeIn(500, 0, 0, 0);
    //     });
    // }

    private switchSceneGroup(sceneGroup: string, callback?: Function, callbackScope?: object)
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