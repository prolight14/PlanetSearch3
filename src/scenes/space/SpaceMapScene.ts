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

    private fpsText: Phaser.GameObjects.Text;

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

        this.miniMapZoom = 0.1;
        
        this.tracker = new ExplorationTracker(this);
        this.setTrackerView();

        this.input.keyboard.on("keyup-M", () =>
        {
            this.mapExplorer.open = !this.mapExplorer.open;

            this.updateScenesStates(this.mapExplorer.open);
        });

        this.fpsText = this.add.text(40, 20, "");
    }

    private setMapExplorerMask(mask: Phaser.Display.Masks.GeometryMask)
    {
        this.mapExplorer.setMask(mask);
    }

    private miniMapZoom: number = 1;

    private setTrackerView()
    {
        const { width, height } = this.miniMap.getViewportSize();
        this.tracker.setDiscoverViewport(width, height);
    }

    private updateScenesStates(open: boolean)
    {
        if(open)
        {
            this.scene.sleep("space");
            this.scene.sleep("spaceLogic");
            this.scene.sleep("spaceUI");
            this.scene.sleep("spaceCameraController");
            this.scene.sleep("spaceUIDebug");
        }
        else
        {
            this.scene.wake("space");
            this.scene.wake("spaceLogic");
            this.scene.wake("spaceUI");
            this.scene.wake("spaceCameraController");
            this.scene.wake("spaceUIDebug");
        }
    }

    private renderTracker: boolean = false;

    public update (time: number, delta: number)
    {
        this.fpsText.setText("Fps: " + (1000 / delta).toFixed(0)).setVisible(this.mapExplorer.open);

        if(!this.scene.isActive("starSceneController"))
        {
            return;
        }
        
        this.mapExplorer.update();
        this.mapExplorer.render();

        this.runMiniMap();

        if(this.renderTracker)
        {
            this.mapExplorer.renderTracker(this.tracker);
        }   

        var setMask: boolean = false; 
        this.tracker.update(() =>
        {
            this.setMapExplorerMask(this.tracker.createMask(this.mapExplorer.getCamera()));
            setMask = true;
        });

        if(this.mapExplorer.open && !setMask && this.tracker.outMask !== undefined)
        {
            this.setMapExplorerMask(this.tracker.createMask(this.mapExplorer.getCamera()));
        } 
    }

    private runMiniMap()
    {
        const starScene = this.starScene;
        const zoom = this.miniMapZoom;

        this.miniMap.updateMap(zoom, this.spaceSceneCam, (...args: any[]) =>
        {
            starScene.updateToRenderTexture.apply(starScene, args);
        });
        
        this.setTrackerView();
    }
}