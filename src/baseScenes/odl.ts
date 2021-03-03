import SpaceStarScene from "./SpaceStarScene";

export default class SpaceStarLayer1Scene extends Phaser.Scene
{
    constructor()
    {
        // super("spaceStarLayer1", 200, 2, 1);
        // this.spaceStarScene = new SpaceStarScene("spaceStarLayer1", 200, 2, 1);

        super("spaceStarLayer1");
    }

    private _stars: Phaser.GameObjects.Graphics;

    public create()
    {
        this.input.once('pointerdown', function() 
        {
        
            this.scene.add('spaceStarScene', SpaceStarScene, true, { x: 400, y: 300 });

        }, this);

        // this._stars = this.add.graphics();

        // this.createWorld();
    }

    public update()
    {
        // this.updateWorld();

        // this.sys.displayList.add(this._stars);
        // this.renderStars(this._stars);
    }
}