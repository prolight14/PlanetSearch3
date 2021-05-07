import EntryScene from "../src/scenes/EntryScene";

var Phaser = require("../node_modules/phaser/dist/phaser.js");
/**
 * 
 * Dependency injectiom
 * ioc containers
 */


// // Space scenes
// import SpaceScene from "../src/scenes/space/SpaceScene";
// import SpaceCameraControllerScene from "../src/scenes/space/SpaceCameraControllerScene";
// import SpaceDebugScene from "../src/scenes/space/SpaceDebugScene";
// import SpaceUIDebugScene from "../src/scenes/space/SpaceUIDebugScene";

// // Planet scene(s)
// import PlanetScene from "../src/scenes/planet/PlanetScene";

describe("EntryScene", () =>
{
    it("Should only implement space and planet scene groups", () =>
    {
        let config = {
            type: Phaser.WEBGL,
            width: 800,
            height: 450,
            pixelArt: true,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            disableContextMenu: true,
            scene: [
                EntryScene,

                // // Space scenes
                // SpaceScene, SpaceCameraControllerScene, SpaceDebugScene, SpaceUIDebugScene,

                // // Planet scene(s)
                // PlanetScene
            ],
        };

        var game = new Phaser.Game(config);

        console.log(game);

        var scene: EntryScene = game.scene.getScene("entry") as EntryScene;

        expect(scene.currentSceneGroup).toBe("space");
    });
});
