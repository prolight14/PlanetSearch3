import EntryScene from "../scenes/EntryScene";
import PlanetScene from "../scenes/planet/PlanetScene";
import SpaceCameraControllerScene from "../scenes/space/SpaceCameraControllerScene";
import SpaceDebugScene from "../scenes/space/SpaceDebugScene";
import SpaceLogicScene from "../scenes/space/SpaceLogicScene";
import SpaceScene from "../scenes/space/SpaceScene";
import SpaceUIDebugScene from "../scenes/space/SpaceUIDebugScene";
import StarSceneControllerScene from "../scenes/space/StarSceneControllerScene";
import SceneTest from "../testHelpers/SceneTest"

function testSpace(game2: Phaser.Game)
{
    let sceneTest1 = new SceneTest(game2.scene.scenes[0].scene.get("space"));

    if(typeof(sceneTest1.runUpdate()) !== "undefined")
    {
        throw "Update should return void!";
    }
}
function testEntry(game2: Phaser.Game)
{
    let sceneTest1 = new SceneTest(game2.scene.scenes[0].scene.get("entry"));


}

export default function Test(game2: Phaser.Game)
{
    // let config = {
    //     type: Phaser.WEBGL,
    //     width: 0,
    //     height: 0,
    //     scene: [
    //         // Entry scene 
    //         EntryScene,
    
    //         // Space scenes
    //         SpaceScene, SpaceCameraControllerScene, SpaceDebugScene, 
    //         SpaceUIDebugScene, StarSceneControllerScene, SpaceLogicScene,
    
    //         // Planet scene(s)
    //         PlanetScene
    //     ],
    // }

    // var game2: Phaser.Game = new Phaser.Game(config);

    testSpace(game2);
    testEntry(game2);

}
