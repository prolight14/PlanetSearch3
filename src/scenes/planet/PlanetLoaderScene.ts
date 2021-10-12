import Checkpoint from "../../gameObjects/planet/Checkpoint";
import Door from "../../gameObjects/planet/Door";
import Player from "../../gameObjects/planet/Player";
import logger from "../../logger";
import Traveler from "../../Saver/Traveler";
import PlanetEffectsScene from "./PlanetEffectsScene";
import PlanetLogicScene from "./PlanetLogicScene";

export default class PlanetLoaderScene extends Phaser.Scene
{
    constructor()
    {
        super("planetLoader");
    }

    private traveler: Traveler = new Traveler();

    public setTravelerSaveInfo(info: any)
    {
        if(info !== undefined)
        {
            this.traveler.saveInfo = info;
        }
    }

    public loadPlayer(
        inputData: any,
        tilemap: Phaser.Tilemaps.Tilemap, 
        doorGroup: Phaser.GameObjects.Group, 
        checkpointGroup: Phaser.GameObjects.Group,
        currentLevel: string,
        defaultLevel: string,
    )
    {
        let spawnPointObj = tilemap.findObject("Objects", obj => obj.name === "Player Spawn Point");

        var spawnPoint;

        if(!spawnPointObj)
        {
            spawnPoint = {
                x: 0,
                y: 0
            };
        }
        else
        {

            spawnPoint = {
               x: spawnPointObj.x,
               y: spawnPointObj.y
           };
        }

        this.handleDoors(tilemap, doorGroup);
        this.handleCheckpoints(checkpointGroup, currentLevel);

        if(inputData.loadType === "door")
        {
            spawnPoint = this.getDoorEntryPoint(tilemap, doorGroup, inputData.doorGoto);
        }
        else if(inputData.loadType === "checkpoint")
        {
            spawnPoint = this.getCheckpointPlace(checkpointGroup, inputData.checkpointGoto);
        }

        const player = new Player(this.scene.get("planetLogic"), spawnPoint.x as number, spawnPoint.y as number);
        
        player.startLevel = defaultLevel;

        if(inputData.loadType === "checkpoint" && 
            this.traveler.saveInfo !== undefined &&
            this.traveler.saveInfo.playerStats !== undefined)
        {
            player.setStats(this.traveler.saveInfo.playerStats);
        }

        if(this.traveler.containsInfo)
        {
            var info = this.traveler.getInfo();

            player.setCurrentState(info.player);
        }

        this.player = player;

        return player;
    }

    private getDoorEntryPoint(tilemap: Phaser.Tilemaps.Tilemap, doorGroup: Phaser.GameObjects.Group, doorGoto: { level: string, door: string }): { x: number, y: number }
    {
        const objects = tilemap.getObjectLayer("Objects").objects;

        for(var i = 0; i < objects.length; i++)
        {
            const obj = objects[i];
            
            if(obj.name !== "Door")
            {
                continue;
            }

            for(var j in obj.properties)
            {
                const prop = obj.properties[j];
                
                if(prop.name === "door" && prop.value === doorGoto.door)
                {
                    let doors = doorGroup.children.getArray();

                    for(var i = 0; i < doors.length; i++)
                    {
                        var door = doors[i] as Door;

                        const doorBounds = door.getBounds();

                        if(doorBounds.contains(obj.x as number, obj.y as number))
                        {
                            return {
                                x: door.x + door.body.halfWidth / 2,
                                y: door.y + door.body.halfHeight
                            };
                        }
                    }
                }
            }
        }

        logger.warn("Couldn't find door at door symbol '" + doorGoto.door + "'");

        return {
            x: 0,
            y: 0
        };
    }

    private handleDoors(tilemap: Phaser.Tilemaps.Tilemap, doorGroup: Phaser.GameObjects.Group, spawnPoint?: { x?: number, y?: number}, doorGoto?: { level: string, door: string })
    {
        const objects = tilemap.getObjectLayer("Objects").objects;
        
        for(var i = 0; i < objects.length; i++)
        {
            const obj = objects[i];
            
            if(obj.name === "Door")
            {
                if(spawnPoint !== undefined && doorGoto !== undefined)
                {
                    for(var j in obj.properties)
                    {
                        const prop = obj.properties[j];
                        
                        if(prop.name === "door" && prop.value === doorGoto.door)
                        {
                            doorGroup.getChildren().forEach((door: Door) =>
                            {
                                const doorBounds = door.getBounds();
    
                                if(doorBounds.contains(obj.x as number, obj.y as number))
                                {
                                    spawnPoint.x = door.x;
                                    spawnPoint.y = door.y;
                                }
                            });
                        }
                    }
                }
                
                doorGroup.getChildren().forEach((door: Door) =>
                {
                    if(door.getBounds().contains(obj.x as number, obj.y as number))
                    {
                        var gotoLevel, gotoDoor;

                        for(var j in obj.properties)
                        {
                            const prop = obj.properties[j];

                            if(prop.name === "gotoLevel")
                            {
                                gotoLevel = prop.value;
                            }
                            else if(prop.name === "gotoDoor")
                            {
                                gotoDoor = prop.value;
                            }
                        }

                        if(gotoLevel && gotoDoor)
                        {
                            door.setGoto({
                                level: gotoLevel,
                                door: gotoDoor
                            })
                        }
                    }
                });
            }
        }
    }

    private getCheckpointPlace(checkpointGroup: Phaser.GameObjects.Group, goto: { level: string, index: number}): { x: number, y: number }
    {
        var checkpoints = checkpointGroup.getChildren() as Array<Checkpoint>;

        for(var i = 0; i < checkpoints.length; i++)
        {
            if(checkpoints[i].goto.index === goto.index)
            {
                return {
                    x: checkpoints[i].x + checkpoints[i].body.halfWidth,
                    y: checkpoints[i].y
                };
            }
        }

        logger.warn("Couldn't load from checkpoint index '" + goto.index + "'")

        return {
            x: 0,
            y: 0
        };
    }

    private handleCheckpoints(checkpointGroup: Phaser.GameObjects.Group, currentLevel: string)
    {
        checkpointGroup.getChildren().forEach((checkpoint: Checkpoint, index: number) =>
        {
            checkpoint.goto = {
                level: currentLevel,
                index: index
            };
        });
    }

    public update()
    {

    }

    private player: Player;
    private loading: boolean;

    public restart(inputData: any)
    {
        if(this.loading)
        {
            return;
        }

        this.loading = true;

        this.scene.pause("planetLogic");

        if(["restart", "death"].indexOf(inputData.reason) === -1)
        {
            this.traveler.setInfo({
                player: this.player.getCurrentState()
            });
        }
       
        let effectsScene = this.scene.get("planetEffects") as PlanetEffectsScene;
        effectsScene.fadeOut(500, 0, 0, 0);

        effectsScene.cameras.main.once("camerafadeoutcomplete", () => 
        {
            this.scene.run("planetLogic");

            const planetLogicScene = (this.scene.get("planetLogic") as PlanetLogicScene);
            var loadData = planetLogicScene.loadData;

            if(inputData.loadType === "door")
            {
                loadData.currentLevel = inputData.doorGoto.level;
            }   
            else if(inputData.loadType === "checkpoint")
            {
                loadData.currentLevel = inputData.checkpointGoto.level;
            }
            else if(inputData.loadType === "start")
            {
                loadData.currentLevel = inputData.startGoto.level;
            }

            planetLogicScene.scene.restart(inputData);

            this.loading = false;
        });
    }
}