import SpaceScene from "./SpaceScene";
import SpaceGameObject from "../../gameObjects/space/SpaceGameObject";
import PlayerShip from "../../gameObjects/space/PlayerShip";
import Planet from "../../gameObjects/space/Planet";
import Nebula from "../../gameObjects/space/Nebula";
import Shrapnel from "../../gameObjects/space/Shrapnel";
import XPStar from "../../gameObjects/space/XPStar";
import Crest from "../../gameObjects/space/Crest";
import SpaceGrid from "./SpaceGrid";
import Star from "../../gameObjects/space/Sun";
import spaceManagerScene from "./SpaceManagerScene";
import HyperBeamerShip from "../../gameObjects/space/HyperBeamerShip";

export default class SpaceLogicScene extends Phaser.Scene
{
    constructor()
    {
        super("spaceLogic");
    }

    private spaceScene: SpaceScene;
    public playerShip: PlayerShip;

    public addObjectsToSpace()
    {
        this.spaceScene = this.scene.get("space") as SpaceScene;
        
         
        // var shader = this.add.shader("planetLighting", 0, 0, 128, 128);
        // // shader.setUniform("uMainSampler", this.spaceScene.textures.get("IcyDwarfPlanet").dataSource[0]);
        // shader.setSampler2D("iChannel0", "IcyDwarfPlanet");
        // shader.setRenderToTexture("IcyDwarfPlanet-shader");

        // this.add.image(69000, 60000, "IcyDwarfPlanet-shader"); 

        const RND = Phaser.Math.RND;

        var world: SpaceGrid = this.spaceScene.world;

        var nebulae = world.add.gameObjectArray(Nebula, "nebula");
        var gridConfig = this.spaceScene.cspConfig.grid;
        var placeWidth = gridConfig.cols * gridConfig.cellWidth;
        var placeHeight = gridConfig.rows * gridConfig.cellHeight;    
        
        
        var nebulaeAmt = Math.floor((placeWidth * placeHeight) / 10000000);
        
        for(var i = 0; i < 300; i++)
        {
            // nebulae.add(this.spaceScene, placeWidth * RND.frac(), placeHeight * RND.frac(), "grayNebula");
            nebulae.add(this.spaceScene, 69000 + 13000 * RND.frac(), 60500 + 13000 * RND.frac(), "purpleNebula");
        }
            
        var planets = world.add.gameObjectArray(Planet, "planet");
        // planets.add(this.spaceScene, 69000, 60000, "IcyDwarfPlanet");
        // // planets.add(this.spaceScene, 56000, 70000, "RedDustPlanet");
        // // planets.add(this.spaceScene, 62000, 70000, "RedDustPlanet");
        // planets.add(this.spaceScene, 69000, 60500, "RedDustPlanet");

        // planets.add(this.spaceScene, 66000, 60000, "sun").setScale(7); 
        // planets.add(this.spaceScene, 80000, 60000, "RedDustPlanet").setScale(4);
        // planets.add(this.spaceScene, 86500, 60000, "JunglePlanet");
        // planets.add(this.spaceScene, 97000, 60000, "IcyDwarfPlanet");

        const spaceManagerScene = (this.scene.get("spaceManager") as spaceManagerScene);

        const suns = world.add.gameObjectArray(Star, "sun");
        const betaSun = suns.add(this.spaceScene, 66000, 60000, "Sun").setScale(7);

        const betaSystem = spaceManagerScene.addSystem("beta", [betaSun]);
        betaSystem.addPlanet(
            planets.add(this.spaceScene, 80000, 60000, "RedDustPlanet").setScale(4),
            {
                radius: 14000
            }
        );
        betaSystem.addPlanet(
            planets.add(this.spaceScene, 86500, 60000, "JunglePlanet").setScale(4),
            {
                radius: 20500,
            }
        );
        betaSystem.addPlanet(
            planets.add(this.spaceScene, 97000, 60000,"IcyDwarfPlanet").setScale(4),
            {
                radius: 31000,
            }
        );

        // Todo: make this work
        // betaSystemOrbiter.addMoon();

    
        world.add.gameObjectArray(XPStar, "xpStar");
        world.add.gameObjectArray(Crest, "crest");
        
        // var asteroids = world.add.gameObjectArray(Asteroid, "asteroid");
        // asteroids.add(this.spaceScene, 69300, 61000);
        
        var shrapnels = world.add.gameObjectArray(Shrapnel, "shrapnel");
        
        var shrapnelClustAmt = Math.floor((placeWidth * placeHeight) / 100000000);

        for(var i = 0; i < shrapnelClustAmt; i++)
        {   
            var shrapnelClusterX = RND.integerInRange(500, placeWidth - 500);
            var shrapnelClusterY = RND.integerInRange(500, placeHeight - 500);

            for(var j = 0; j < RND.integerInRange(4, 6); j++)
            {
                shrapnels.add(this.spaceScene, shrapnelClusterX + RND.integerInRange(-200, 200), shrapnelClusterY + RND.integerInRange(-200, 200), "shrapnel" + Math.floor(RND.integerInRange(1, 5)));
            }
        }
        
        shrapnels.add(this.spaceScene, 69000, 62000, "shrapnel1");
        shrapnels.add(this.spaceScene, 69000, 62200, "shrapnel2");
        shrapnels.add(this.spaceScene, 69130, 62200, "shrapnel3");
        shrapnels.add(this.spaceScene, 69170, 62100, "shrapnel4");
        shrapnels.add(this.spaceScene, 69190, 62000, "shrapnel3");
        
        // this.playerShip = world.add.gameObjectArray(PlayerShip, "playerShip").add(this.spaceScene, 56000, 70000 + 1000);
        if(!world.get.gameObjectArray("playerShip"))
        {
            var playerShips = world.add.gameObjectArray(PlayerShip, "playerShip");
            playerShips.define("ignoreDestroy", true);
            this.playerShip = playerShips.add(this.spaceScene, 69000, 60200);
            // this.playerShip = playerShips.add(this.spaceScene, 86500, 60400);
        }
        else
        {
            this.playerShip.resetStats();
            this.playerShip.x = 69000;
            this.playerShip.y = 60200;
            this.playerShip.bodyConf.update();
            this.playerShip.setDepth(8);
            this.playerShip.particles.setDepth(20);
        }
        
        const hyperBeamerShips = world.add.gameObjectArray(HyperBeamerShip, "hyperBeamerShip");
        
        for(var i = 0; i < 54000; i++)
        {
            hyperBeamerShips.add(this.spaceScene, 69200 + RND.integerInRange(-28000, 28000), 61000 + RND.integerInRange(-28000, 28000)) as HyperBeamerShip;
        }

        this.hyperBeamerShipArray = [];

        hyperBeamerShips.forEach((ship: HyperBeamerShip) =>
        {
            this.hyperBeamerShipArray.push(ship);
        });

        // this.hyperBeamerShipArray.push(hyperBeamerShips.add(this.spaceScene, 69000, 60200));
       
        // var hyperBeamerSTypes = world.add.gameObjectArray(HyperBeamerSType, "hyperBeamerSType");
        // hyperBeamerSTypes.add(this.spaceScene, 69400, 60000 + 500);
        
        // hyperBeamerSTypes.add(this.spaceScene, 69200, 60000 + 500).setAngle(180);
        // hyperBeamerSTypes.add(this.spaceScene, 69200, 60000 + 500 + 80).setAngle(0);
        // for(var i = 0; i < 100; i++)
        // {
        //     hyperBeamerSTypes.add(this.spaceScene, 69200 + RND.integerInRange(-7000, 7000), 61000 + RND.integerInRange(-7000, 7000)) as HyperBeamerSType;
        // }

        // for(var i = 0; i < 2500; i++)
        // {
        //     hyperBeamerSTypes.add(this.spaceScene, 69200 + RND.integerInRange(-50000, 50000), 60600 + RND.integerInRange(-50000, 50000)) as HyperBeamerSType;
        // }



        // const sun_radius = 20;
        // const sun_diameter = sun_radius * 2;
        // const sun_graphics = this.add.graphics();
        // sun_graphics.x = 0;
        // sun_graphics.y = 0;
        // sun_graphics.fillStyle(0xD6FC00); 
        // sun_graphics.fillCircle(sun_radius, sun_radius, sun_radius);
        // sun_graphics.generateTexture("sun", sun_diameter, sun_diameter);
        // sun_graphics.setVisible(false);
        // const suns = world.add.gameObjectArray(Sun, "sun");
        // suns.add(this.spaceScene, 65000, 60200);

        // const crestBodies: Phaser.Types.Physics.Matter.MatterBody[] = [];
        // this.spaceScene.world.get.gameObjectArray("crest").forEach((crest: Crest, i: any, crests: any) => 
        // {
        //     crestBodies.push(crest.body);
        // });

        // this.spaceScene.matter.overlap(this.playerShip.body, crestBodies, (playerShipBody, crestBody) =>
        // {
        //     console.log("overlap!");
        // }, undefined, this);



        // this.spaceScene.matter.world.on(Phaser.Physics.Matter.Events.COLLISION_START, (event: any, bodyA: any, bodyB: any) =>
        // {
        //     if(bodyA.gameObject._arrayName === "playerShip" && bodyB.gameObject._arrayName === "crest")
        //     {
        //         const playerShip: PlayerShip = bodyA;
        //         const crest: Crest = bodyB;

        //         crest.onCollide(playerShip);
        //     }
        // }, this);
    }

    public hyperBeamerShipArray: Array<HyperBeamerShip>;

    public addXPStar(x: number, y: number)
    {
        var xpStars = this.spaceScene.world.get.gameObjectArray("xpStar");

        const star = xpStars.add(this.spaceScene, x + Phaser.Math.RND.between(-50, 50), y + Phaser.Math.RND.between(-50, 50), "xpStar") as XPStar;
        // xpStars.add(this.spaceScene, x + Phaser.Math.RND.between(-5, 5), y + Phaser.Math.RND.between(-5, 5), "xpStar");
        const angle = Phaser.Math.Angle.Between(star.x, star.y, x, y) * Phaser.Math.RAD_TO_DEG + 180 + Phaser.Math.RND.between(-30, 30);
        const speed = 0.5 + Phaser.Math.RND.frac() * 0.5;
        star.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
    }

    public addSmallXPStar(x: number, y: number)
    {
        var smallXPStars = this.spaceScene.world.get.gameObjectArray("xpStar");

        const star = smallXPStars.add(this.spaceScene, x + Phaser.Math.RND.between(-50, 50), y + Phaser.Math.RND.between(-50, 50), "smallXPStar") as XPStar;
        // smallXPStars.add(this.spaceScene, x + Phaser.Math.RND.between(-5, 5), y + Phaser.Math.RND.between(-5, 5), "smallXPStar");
        const angle = Phaser.Math.Angle.Between(star.x, star.y, x, y) * Phaser.Math.RAD_TO_DEG + 180 + Phaser.Math.RND.between(-30, 30);
        const speed = 0.5 + Phaser.Math.RND.frac() * 0.5;
        star.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
    }

    public addCrests(x: number, y: number)
    {
        const crest = this.spaceScene.world.get.gameObjectArray("crest").add(
            this.spaceScene, 
            x + Phaser.Math.RND.between(-50, 50), 
            y + Phaser.Math.RND.between(-50, 50), 
            "crest"
        );

        const angle = Phaser.Math.Angle.Between(crest.x, crest.y, x, y) * Phaser.Math.RAD_TO_DEG + 180 + Phaser.Math.RND.between(-30, 30);
        const speed = 0.5 + Phaser.Math.RND.frac() * 0.5;
        crest.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);

        // this.spaceScene.matter.overlap(
        //     this.playerShip.body, 
        //     this.spaceScene.world.get.gameObjectArray("crest").add(
        //         this.spaceScene, 
        //         x + Phaser.Math.RND.between(-50, 50), 
        //         y + Phaser.Math.RND.between(-50, 50), 
        //         "crest"
        //     ).body, 
        //     function(playerShipBody, crestBody)
        // {
        //     console.log("Hit!");
        //     //@ts-ignore
        //     crestBody.onCollide(playerShipBody);
        // });
        
        // this.spaceScene.matter.overlap(this.playerShip.body, crestBodies, (playerShipBody, crestBody) =>
        // {
        //     console.log("overlap!");
        // }, undefined, this);
    } 

    public update(time: number, delta: number)
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