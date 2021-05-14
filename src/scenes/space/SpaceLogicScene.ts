import SpaceScene from "./SpaceScene";
import SpaceGameObject from "../../gameObjects/space/SpaceGameObject";
import PlayerShip from "../../gameObjects/space/PlayerShip";
import Planet from "../../gameObjects/space/Planet";
import EnemyShip from "../../gameObjects/space/EnemyShip";
import Nebula from "../../gameObjects/space/Nebula";

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

        
        var nebulae = world.add.gameObjectArray(Nebula);

        var gridConfig = this.spaceScene.cspConfig.grid;
        var placeWidth = gridConfig.cols * gridConfig.cellWidth;
        var placeHeight = gridConfig.rows * gridConfig.cellHeight;
                                                                
        var nebulaeAmt = Math.floor((placeWidth * placeHeight) / 12000000);
        
        var rng = new Phaser.Math.RandomDataGenerator("rand1");

        for(var i = 0; i < nebulaeAmt; i++)
        {
            nebulae.add(this.spaceScene, placeWidth * rng.frac(), placeHeight * rng.frac(), "grayNebula").setScale(13, 13);
        }
        
        var planets = world.add.gameObjectArray(Planet);
        planets.add(this.spaceScene, 69000, 60000, "IcyDwarfPlanet").setScale(13, 13);
        planets.add(this.spaceScene, 56000, 70000, "RedDustPlanet").setScale(13, 13);

        var enemyShips = world.add.gameObjectArray(EnemyShip);
        enemyShips.add(this.spaceScene, 67000, 60000);
        enemyShips.add(this.spaceScene, 70000, 60000);

        this.playerShip = world.add.gameObjectArray(PlayerShip).add(this.spaceScene, 69000, 60000 + 1000);
        this.spaceScene.setCameraTarget(this.playerShip);
    }

    public update()
    {
        this.updatePlanets();
    }

    private updatePlanets()
    {
        let playerShip = this.playerShip;

        this.spaceScene.sys.displayList.list.forEach((object: SpaceGameObject) =>
        {
            if(object._arrayName === "planet")
            {
                var planet = object;

                var dx = planet.x - playerShip.x;
                var dy = planet.y - playerShip.y;

                if(dx * dx + dy * dy < Math.pow(planet.displayWidth / 2, 2))
                {
                    this.spaceScene.switchToPlanetSceneGroup({
                        type: "planet",
                        from: planet
                    });
                }
            }
        });
    }
}