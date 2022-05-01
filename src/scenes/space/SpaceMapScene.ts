import ExplorationTracker from "../../mapSystem/space/ExplorationTracker";
import MapExplorer from "../../mapSystem/space/MapExplorer";
import MiniMapSystem from "../../mapSystem/space/MiniMapSystem";
import StarSceneControllerScene from "./StarSceneControllerScene";

export default class SpaceMapScene extends Phaser.Scene
{
    constructor()
    {
        super("spaceMap");
    }

    private spaceSceneCam: Phaser.Cameras.Scene2D.Camera;
    private starScene: StarSceneControllerScene;
    private miniMap: MiniMapSystem;

    private mapExplorer: MapExplorer;
    private tracker: ExplorationTracker;

    create ()
    {
        this.starScene = (this.scene.get("starSceneController") as StarSceneControllerScene);
        this.spaceSceneCam = this.scene.get("space").cameras.main;
        this.miniMap = new MiniMapSystem();

        const mapWidth = 250 * 1.2;
        const mapHeight = 150 * 1.0;
        this.miniMap.createMap(this, this.spaceSceneCam.width - mapWidth, this.spaceSceneCam.height - mapHeight, mapWidth, mapHeight);

        this.mapExplorer = new MapExplorer(this);

        this.updateScenesStates(this.mapExplorer.open);

        this.input.keyboard.on("keyup-M", () =>
        {
            this.mapExplorer.open = !this.mapExplorer.open;

            this.updateScenesStates(this.mapExplorer.open);
        });

        this.tracker = new ExplorationTracker(this);
        this.mapExplorer.setCanRender(this.tracker.hasBeenUncovered, this.tracker);

        this.miniMapZoom = 0.1;
    }

    private miniMapZoom: number = 1;

    private updateScenesStates(open: boolean)
    {
        if(open)
        {
            this.scene.sleep("space");
            this.scene.sleep("spaceLogic");
            this.scene.sleep("spaceUI");
            this.scene.sleep("spaceCameraController");
        }
        else
        {
            this.scene.run("space");
            this.scene.run("spaceLogic");
            this.scene.run("spaceUI");
            this.scene.run("spaceCameraController");
        }
    }

    update ()
    {
        
        if(!this.scene.isActive("starSceneController"))
        {
            return;
        }
        
        this.mapExplorer.update();
        this.mapExplorer.render();
        this.mapExplorer.renderTracker(this.tracker);

        this.runMiniMap();

        this.tracker.update();
    }

    private runMiniMap()
    {
        const starScene = this.starScene;
        const zoom = this.miniMapZoom;

        this.miniMap.updateMap(zoom, this.spaceSceneCam, (...args: any[]) =>
        {
            starScene.updateToRenderTexture.apply(starScene, args);
        });
        
        const { width, height} = this.miniMap.getViewportSize();
        this.tracker.setDiscoverViewport(0, 0, width / zoom, height / zoom);
    }
}