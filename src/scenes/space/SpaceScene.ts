import Planet from "../../gameObjects/space/Planet";
import PlayerShip from "../../gameObjects/space/PlayerShip";
import EntryScene from "../EntryScene";
import ISceneGroupHead from "../ISceneGroupHead";
import PlanetScene from "../planet/PlanetScene";
import SpaceLogicScene from "./SpaceLogicScene";

export default class SpaceScene extends Phaser.Scene implements ISceneGroupHead
{
    constructor()
    {
        super({
            key: "space",
            physics: {
                default: "matter",
                matter: {
                    gravity: false,
                    // debug: true
                }
            }
        });
    }

    public preload()
    {
        this.load.image("helixShip", "./assets/Space/Ships/helixShip.png");
        this.load.image("helixShipParticle", "./assets/Space/Ships/helixShipParticle.png");
        this.load.json("helixShipShape", "./assets/Space/Ships/helixShipShape.json");
        this.load.image("hyperBeamerSTypeGreen", "./assets/Space/Ships/hyperBeamerSTypeGreen.png");
        this.load.image("hyperBeamerSTypeGreenParticle", "./assets/Space/Ships/hyperBeamerSTypeGreenParticle.png");
        
        this.load.image("asteroid1", "./assets/Space/Asteroids/Asteroid.png")
        this.load.image("IcyDwarfPlanet", "./assets/Space/Planets/IcyDwarfPlanet.png");
        this.load.image("RedDustPlanet", "./assets/Space/Planets/RedDustPlanet.png");
        this.load.image("grayNebula", "./assets/Space/nebula/grayNebula.png");

        this.load.scenePlugin({
            key: "CartesianSystemPlugin",
            url: "./libraries/CartesianSystemPlugin.js",
            sceneKey: 'csp'
        });
    }

    public cspConfig: any;
    public loaded: boolean = false;

    public create()
    {
        this.cspConfig = {
            window: {
                width: this.game.config.width,
                height: this.game.config.height
            },
            grid: {
                cols: 200,
                rows: 200,
                cellWidth: 800,
                cellHeight: 800
            }
        };
        
        this.csp.initWorld(this.cspConfig);
        (this.scene.get("spaceLogic") as SpaceLogicScene).addObjectsToSpace();
        this.csp.syncWithGrid();
        this.runScenes(false);
        this.loaded = true;
    }

    playerShip: PlayerShip;

    public runScenes(calledByEntryScene?: boolean)
    {
        this.scene.run("spaceBackground");
        this.scene.run("spaceLogic");
        this.scene.run("spaceCameraController");
        this.scene.run("starSceneController");
        this.runDebugScenes();

        if(calledByEntryScene)
        {
            var playerShip = (this.scene.get("spaceLogic") as SpaceLogicScene).playerShip;
            playerShip.y += 500;
            for(var i in playerShip.keys)
            {
                playerShip.keys[i].reset();
            }
        }

    }

    private runDebugScenes()
    {
        this.scene.run("spaceDebug");
        this.scene.run("spaceUIDebug");

        this.scene.sleep("spaceDebug");
 
        this.input.keyboard.on("keydown-U", () =>
        {
            if(this.scene.isSleeping("spaceUIDebug"))
            {
                this.scene.wake("spaceUIDebug");
            }
            else
            {
                this.scene.sleep("spaceUIDebug");
            }
        });
        this.input.keyboard.on("keydown-I", () =>
        {
            if(this.scene.isSleeping("spaceDebug"))
            {
                this.scene.wake("spaceDebug");
            }
            else
            {
                this.scene.sleep("spaceDebug");
            }
        });
    }

    public sleepScenes(calledByEntryScene?: boolean)
    {
        this.scene.sleep("spaceBackground");
        this.scene.sleep("spaceLogic");
        this.scene.sleep("spaceCameraController");
        this.scene.sleep("spaceDebug");
        this.scene.sleep("spaceUIDebug");
        this.scene.sleep("starSceneController");
    }

    public switchToPlanetSceneGroup(levelInfo: object)
    {
        var entryScene: EntryScene = this.scene.get("entry") as EntryScene;

        entryScene.switchSceneGroup("planet", (fromScene: SpaceScene, nextScene: PlanetScene) =>
        {
            nextScene.receiveInfo(levelInfo);
        });
    }

    private cameraTarget: { x: number; y: number; };

    public setCameraTarget(cameraTarget: object)
    {
        this.cameraTarget = cameraTarget as { x: number; y: number; };
        this.cameras.main.startFollow(this.cameraTarget);
    }

    public getCameraTarget()
    {
        return this.cameraTarget;
    }

    public csp: any;

    public update(time: number, delta: number)
    {
        var playerShip = (this.scene.get("spaceLogic") as SpaceLogicScene).playerShip;

        this.csp.setFollow(playerShip.x, playerShip.y);
        this.csp.updateWorld((csp?: any) =>
        {
            csp.systems.displayList.add(playerShip.particles);

            this.sys.displayList.list.forEach((object: any) =>
            {   
                if(object.particles)
                {
                    csp.systems.displayList.add(object.particles);
                }
            });
        });
    }
}