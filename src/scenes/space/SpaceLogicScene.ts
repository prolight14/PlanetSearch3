import SpaceScene from "./SpaceScene";
import SpaceGameObject from "../../gameObjects/space/SpaceGameObject";
import PlayerShip from "../../gameObjects/space/PlayerShip";
import Planet from "../../gameObjects/space/Planet";
import Nebula from "../../gameObjects/space/Nebula";
import HyperBeamerSType from "../../gameObjects/space/HyperBeamerSType";
import Shrapnel from "../../gameObjects/space/Shrapnel";
import XPStar from "../../gameObjects/space/XPStar";
import Crest from "../../gameObjects/space/Crest";
export default class SpaceLogicScene extends Phaser.Scene
{
    constructor()
    {
        super("spaceLogic");
    }

    private spaceScene: SpaceScene;
    public playerShip: PlayerShip;
    
    public create()
    {
        
    }
    
    public addObjectsToSpace()
    {
        this.spaceScene = this.scene.get("space") as SpaceScene;
        
        var world: any = this.spaceScene.csp.world;
        
        var random = function(min: number, max: number)
        {
            return Phaser.Math.RND.frac() * (max - min) + min;
        };
        
        var nebulae = world.add.gameObjectArray(Nebula, "nebula");
        var gridConfig = this.spaceScene.cspConfig.grid;
        var placeWidth = gridConfig.cols * gridConfig.cellWidth;
        var placeHeight = gridConfig.rows * gridConfig.cellHeight;                                                
        var nebulaeAmt = Math.floor((placeWidth * placeHeight) / 12000000);
        
        for(var i = 0; i < nebulaeAmt; i++)
        {
            nebulae.add(this.spaceScene, placeWidth * Phaser.Math.RND.frac(), placeHeight * Phaser.Math.RND.frac(), "grayNebula");
        }
        
        var planets = world.add.gameObjectArray(Planet, "planet");
        planets.add(this.spaceScene, 69000, 60000, "IcyDwarfPlanet");
        planets.add(this.spaceScene, 56000, 70000, "RedDustPlanet");

        world.add.gameObjectArray(XPStar, "xpStar");
        world.add.gameObjectArray(Crest, "crest");
        
        // var asteroids = world.add.gameObjectArray(Asteroid, "asteroid");
        // asteroids.add(this.spaceScene, 69300, 61000);
        
        var shrapnels = world.add.gameObjectArray(Shrapnel, "shrapnel");
        
        var shrapnelClustAmt = Math.floor((placeWidth * placeHeight) / 100000000);
        
        for(var i = 0; i < shrapnelClustAmt; i++)
        {  
            var shrapnelClusterX = random(500, placeWidth - 500);
            var shrapnelClusterY = random(500, placeHeight - 500);

            for(var j = 0; j < random(4, 6); j++)
            {
                shrapnels.add(this.spaceScene, shrapnelClusterX + random(-200, 200), shrapnelClusterY + random(-200, 200), "shrapnel" + Math.floor(random(1, 5)));
            }
        }
        
        shrapnels.add(this.spaceScene, 69000, 62000, "shrapnel1");
        shrapnels.add(this.spaceScene, 69000, 62200, "shrapnel2");
        shrapnels.add(this.spaceScene, 69130, 62200, "shrapnel3");
        shrapnels.add(this.spaceScene, 69170, 62100, "shrapnel4");
        shrapnels.add(this.spaceScene, 69190, 62000, "shrapnel3");
        
        // this.playerShip = world.add.gameObjectArray(PlayerShip, "playerShip").add(this.spaceScene, 56000, 70000 + 1000);
        this.playerShip = world.add.gameObjectArray(PlayerShip, "playerShip").add(this.spaceScene, 69000, 61000 + 500);
        this.spaceScene.setCameraTarget(this.playerShip);
        
        var hyperBeamerSTypes = world.add.gameObjectArray(HyperBeamerSType, "hyperBeamerSType");
        hyperBeamerSTypes.add(this.spaceScene, 69000, 61000 + 500);
        for(var i = 0; i < 100; i++)
        {
            hyperBeamerSTypes.add(this.spaceScene, 69200 + random(-7000, 7000), 61000 + random(-7000, 7000)) as HyperBeamerSType;
        }
    }
    
    public addXPStar(x: number, y: number)
    {
        var xpStars = this.spaceScene.csp.world.get.gameObjectArray("xpStar");

        xpStars.add(this.spaceScene, x + Phaser.Math.RND.between(-50, 50), y + Phaser.Math.RND.between(-50, 50), "xpStar");
    }

    public addSmallXPStar(x: number, y: number)
    {
        var smallXPStars = this.spaceScene.csp.world.get.gameObjectArray("xpStar");

        smallXPStars.add(this.spaceScene, x + Phaser.Math.RND.between(-50, 50), y + Phaser.Math.RND.between(-50, 50), "smallXPStar");
    }

    public addCrests(x: number, y: number)
    {
        var crests = this.spaceScene.csp.world.get.gameObjectArray("crest");

        crests.add(this.spaceScene, x + Phaser.Math.RND.between(-50, 50), y + Phaser.Math.RND.between(-50, 50), "crest");
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