import SpaceScene from "../../scenes/space/SpaceScene";

export default class SpaceImg extends Phaser.GameObjects.Image
{
    constructor (scene: SpaceScene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture);

        scene.add.existing(this);
        // Todo: move to SpaceGrid
        scene.world.initGameObject(this);
    }

    public body: any;
    public bodyConf: any;
    public _id: number;
    public _arrayName: string;
    public _name: string;
    public destroyQueued: boolean = false;
}