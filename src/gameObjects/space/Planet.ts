import SpaceScene from "../../scenes/space/SpaceScene";
import SpaceGameObject from "./SpaceGameObject";

export default class Planet extends SpaceGameObject
{
    constructor(scene: SpaceScene, x: number, y: number, texture: string)
    {
        super(scene, x, y, texture);

        this.setScale(3);
        this.setStatic(true);
        this.body.collisionFilter = {
            'group': -1,
            'category': 2,
            'mask': 0,
        };
    }

    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);
        this.bodyConf.update();
    }

    public onCollide(object: SpaceGameObject)
    {
        if(object._arrayName === "playerShip")
        {
            (this.scene.scene.get("spaceScene") as SpaceScene).switchToPlanetSceneGroup({
                type: "planet",
                from: this
            });
        }
    }
}