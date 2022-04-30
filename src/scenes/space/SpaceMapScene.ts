import MapSystem from "../../mapSystem/space/MapSystem";
import StarSceneControllerScene from "./StarSceneControllerScene";

export default class SpaceMapScene extends Phaser.Scene
{
    constructor()
    {
        super("spaceMap");
    }

    private spaceSceneCam: Phaser.Cameras.Scene2D.Camera;
    private starScene: StarSceneControllerScene;
    private map: MapSystem;

    preload ()
    {
    
    }

    create ()
    {
        this.starScene = (this.scene.get("starSceneController") as StarSceneControllerScene);
        this.spaceSceneCam = this.scene.get("space").cameras.main;
        this.map = new MapSystem();

        const mapWidth = 250 * 1.2;
        const mapHeight = 150 * 1.0;
        this.map.createMap(this, this.spaceSceneCam.width - mapWidth, this.spaceSceneCam.height - mapHeight, mapWidth, mapHeight);
    }

    update ()
    {
        if(!this.scene.isActive("starSceneController"))
        {
            return;
        }

        const starScene = this.starScene;

        this.map.updateMap(0.1, this.spaceSceneCam, (...args: any[]) =>
        {
            starScene.updateToRenderTexture.apply(starScene, args);
        });
    }
}