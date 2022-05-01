import SpaceGameObject from "../../gameObjects/space/SpaceGameObject";
import timer from "../../gameObjects/Utils/timer";
import SpaceScene from "../../scenes/space/SpaceScene";

export default class ExplorationTracker 
{
    constructor(scene: Phaser.Scene)
    {
        this.scene = scene;
        this.spaceScene = scene.scene.get("space") as SpaceScene;

        this.reset();

        this.graphics = scene.add.graphics();
    }

    private graphics: Phaser.GameObjects.Graphics;

    private updateTrackTimer: {
        update: () => void;
        reset: (time?: number) => void;
    }

    private scene: Phaser.Scene;
    private spaceScene: SpaceScene;

    private track: Array<Phaser.Math.Vector2>;
    private path: Phaser.Curves.Path;

    public active: boolean = true;

    public reset()
    {
        this.track = [];

        this.updateTrackTimer = timer(true, 100, () =>
        {
            this.updateTrack();

            this.updateTrackTimer.reset();
        });

        this.path = new Phaser.Curves.Path();
        const world = this.spaceScene.world;
        const trackingObj = world.get.gameObject("playerShip", 0) as SpaceGameObject;
        this.path.moveTo(trackingObj.body.position.x, trackingObj.body.position.y);

        this.active = true;
    }

    public update()
    {
        if(!this.active)
        {
            return;
        }

        this.updateTrackTimer.update();
    }

    public render(rt: Phaser.GameObjects.RenderTexture)
    {
        if(!this.active)
        {
            return;
        }

        this.renderTracks(rt);
    }

    private renderTracks(rt: Phaser.GameObjects.RenderTexture)
    {
        const graphics = this.graphics;
        const path = this.path;

        graphics.clear();
        graphics.lineStyle(2, 0x00FFFF, 10.0);
        path.draw(graphics);

        rt.draw(graphics);
    }

    private updateTrack()
    {
        const world = this.spaceScene.world;
        const trackingObj = world.get.gameObject("playerShip", 0) as SpaceGameObject;

        this.addToTrack(trackingObj.x, trackingObj.y);
    }    

    private addToTrack(x: number, y: number)
    {
        x |= 0;
        y |= 0;

        if(this.track.length !== 0)
        {
            const trackEnd = this.track[this.track.length - 1];

            if(trackEnd.x === x && trackEnd.y === y)
            {
                return;
            }
        }

        this.track.push(new Phaser.Math.Vector2(x, y));

        this.path.lineTo(x, y);
    }
}