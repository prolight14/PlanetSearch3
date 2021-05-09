import IScene from "./IScene";

export default class SceneTest
{
    scene: IScene;

    constructor(scene: IScene)
    {
        this.scene = scene;
    }

    runUpdate(): any
    {
        return this.scene.update();
    }
}