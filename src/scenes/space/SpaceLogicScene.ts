import SpaceScene from "./SpaceScene";
import SpaceGameObject from "../../gameObjects/space/SpaceGameObject";
import EntryScene from "../EntryScene";
import PlayerShip from "../../gameObjects/space/PlayerShip";
import Planet from "../../gameObjects/space/Planet";

export default class SpaceLogicScene extends Phaser.Scene
{
    constructor()
    {
        super("spaceLogic");
    }

    spaceScene: SpaceScene;
    playerShip: PlayerShip;

    public addObjectsToSpace()
    {
        this.spaceScene = this.scene.get("space") as SpaceScene;

        var world: any = this.spaceScene.csp.world;

        var planets = world.add.gameObjectArray(Planet);

        planets.add(this.spaceScene, 69000, 60000, "IcyDwarfPlanet").setScale(13, 13);
        planets.add(this.spaceScene, 56000, 70000, "RedDustPlanet").setScale(13, 13);

        this.playerShip = world.add.gameObjectArray(PlayerShip).add(this.spaceScene, 56000, 70000 + 1000, "playerShip");

        this.spaceScene.setCameraTarget(this.playerShip);
    }

    public update()
    {
        this.updatePlanets();
    }

    private updatePlanets()
    {
        let playerShip = this.playerShip;

        this.sys.displayList.list.forEach((object: SpaceGameObject) =>
        {
            if(object._arrayName === "planet")
            {
                var planet = object;

                var dx = planet.x - playerShip.x;
                var dy = planet.y - playerShip.y;

                if(dx * dx + dy * dy < Math.pow(planet.displayWidth / 2, 2))
                {
                    this.gotoPlanetSceneGroup();
                }
            }
        });
    }

    private gotoPlanetSceneGroup()
    {
        var entryScene: EntryScene = this.scene.get("entry") as EntryScene;

        entryScene.sleepSceneGroup("space");
        entryScene.runSceneGroup("planet");
    }
}