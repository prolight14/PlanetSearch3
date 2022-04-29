import SpaceGameObject from "../../gameObjects/space/SpaceGameObject";
import SpaceImg from "../../gameObjects/space/SpaceImg";

type GridConfig = {
    window: {
        width: number;
        height:  number;
    },
    grid: {
        cols: number;
        rows: number;
        cellWidth: number;
        cellHeight: number;
    },
    seed: number | string
};

export default class SpaceGrid
{
    constructor(systems: Phaser.Scenes.Systems, config: GridConfig)
    {
        this.systems = systems;
        this.config = config;
        this.seed = config.seed;

        // @ts-ignore
        this.world = new CartesianSystem.World(this.config);
    }

    private systems: Phaser.Scenes.Systems;
    private config: GridConfig | undefined;
    private seed: number | string;
    // @ts-ignore
    private world: CartesianSystem.World;

    public buildSpace(newConfig?: GridConfig)
    {
        if(newConfig !== undefined)
        {
            this.config = newConfig;
        }

        Phaser.Math.RND.init([this.seed.toString()]);

        // @ts-ignore
        const world = this.world;

        var bounds = this.world.bounds;
        this.systems.cameras.main.setBounds(
            bounds.minX, 
            bounds.minY, 
            bounds.maxX - bounds.minX, 
            bounds.maxY - bounds.minY
        );

        // Testing:

        // var s_obj_array = this.world.add.array(SpaceGameObject, "spaceGameObject");
        // var s_obj_array2 = this.world.add.array(SpaceGameObject, "spaceGameObject233");
        // var s_obj_array3 = this.world.add.array(SpaceGameObject, "reference232test");

        // console.log("sobj 0", s_obj_array.add(this.scene, 0, 0, "playerShip"));

        // console.log("gameObjects", this.world.gameObjectHandler.gameObjects);
        // console.log("sobj array", s_obj_array);

        // this.world.remove.array("spaceGameObject233");

        // console.log("gameObjects", this.world.gameObjectHandler.gameObjects);

        this.add = {
            gameObjectArray: function(object: object, arrayName: string | number) 
            {
                return world.add.array(object, arrayName);
            }
        };
        this.get = {
            gameObjectArray: function(arrayName: string | number) 
            {
                return world.get.array(arrayName);
            },
            gameObject: function(arrayName: string | number, id: number)
            {
                return world.get.array(arrayName)[id];
            }
        };
        this.remove = {
            gameObjectArray: function(arrayName: string | number) 
            {
                return world.remove.array(arrayName);
            }
        };

        this.camera = {
            setWindow: function(x: number, y: number, width: number, height: number)
            {
                world.camera.setWindow(x, y, width, height);
            }
        };
    }

    public add: {
        gameObjectArray: (object: object, arrayName: string | number) => any,
    }
    public get: {
        gameObjectArray: (arrayName: string | number) => any,
        gameObject: (arrayName: string | number, id: number) => any
    }
    public remove: {
        gameObjectArray: (arrayName: string | number) => any,
    }

    public camera: {
        setWindow: (x: number, y: number, width: number, height: number) => void 
    }


    private scrollX: number = -1;
    private scrollY: number = -1;
    private lastScrollX: number = -1;
    private lastScrollY: number = -1;
    private sleeping: boolean = false;
    private sleepingEnabled: boolean = true;

    // Note: Make it so that if the cameras is not moving,
    // don't update the cartesian system

    public updateScroll(x: number, y: number)
    {
        this.scrollX = x;
        this.scrollY = y;
    }

    public updateSpace()
    {
        const world = this.world;

        world.camera.updateScroll(this.scrollX, this.scrollY, world.bounds);

        // if(this.sleepingEnabled)
        // {
        //     this.sleeping = (this.lastScrollX === world.camera.scrollX && this.lastScrollY === world.camera.scrollY);

        //     this.lastScrollX = world.camera.scrollX;
        //     this.lastScrollY = world.camera.scrollY;

        //     if(this.sleeping)
        //     {
        //         return;
        //     }
        // }
        
        world.resetProcessList();
        world.updateProcessList();

        this.integrate(this.systems);
    }

    private integrate(sys: Phaser.Scenes.Systems)
    {
        sys.displayList.removeAll();
        sys.updateList.removeAll();

        sys.updateList.update();

        this.world.loopProcessList(function(object: Phaser.GameObjects.GameObject)
        {
            sys.displayList.add(object);
            sys.updateList.add(object);
        });
        
        const checkDestroy = (gameObject: SpaceGameObject | SpaceImg) =>
        {
            if(gameObject.destroyQueued)
            {
                gameObject.destroy();
                gameObject.destroyQueued = false;
            }
        };
        
        sys.displayList.list.forEach(checkDestroy);
        sys.updateList.getActive().forEach(checkDestroy);

        sys.displayList.queueDepthSort();
    }

    public initGameObject(gameObject: SpaceGameObject | SpaceImg)
    {
        const world = this.world;
        const worldGameObjects = world.gameObjectHandler.gameObjects;

        gameObject.bodyConf = {
            moves: true,
            boundingBox: {},
            update: function() {},
            destroy: function() {},
            updateBoundingBox: function() {},
        };

        gameObject.bodyConf.updateBoundingBox = function()
        {
            this.boundingBox.minX = gameObject.x - gameObject.displayWidth / 2;
            this.boundingBox.minY = gameObject.y - gameObject.displayHeight / 2;
            this.boundingBox.maxX = gameObject.x + gameObject.displayWidth / 2;
            this.boundingBox.maxY = gameObject.y + gameObject.displayHeight / 2;
        };

        gameObject.bodyConf.updateBoundingBox();

        // update     
        gameObject.bodyConf.update = function()
        {
            gameObject.bodyConf.updateBoundingBox();
            world.cameraGrid.removeReference(gameObject);
            world.cameraGrid.addReference(gameObject);
        };

        // destroy
        gameObject.bodyConf.destroy = function()
        {
            gameObject.bodyConf.updateBoundingBox();
            world.cameraGrid.removeReference(gameObject);
        };

        // Hack for automating removing the reference of the `gameObject` from the `world` `cameraGrid`
        if(!gameObject.body)
        {
            //  @ts-ignore
            gameObject.body = {};
        }

        gameObject.on("destroy", function()
        {
            gameObject.bodyConf.destroy();
            worldGameObjects[worldGameObjects.references[this._arrayName]].remove(this._id);
        });
    }

    public clearSpace()
    {
        const world = this.world;

        world.cameraGrid.reset();

        const gameObjects = world.gameObjectHandler.gameObjects;

        for(var i in gameObjects)
        {
            for(var j in gameObjects[i])
            {
                if(gameObjects[i][j].ignoreDestroy)
                {
                    gameObjects[i][j].destroyQueued = false;
                    continue;
                }

                gameObjects[i][j].destroy();
            }

            if(!gameObjects[i].ignoreDestroy)
            {
                gameObjects.removeObject(gameObjects[i]._name);
            }
        }

        Phaser.Math.RND.init([this.seed.toString()]);
    }

    // After calling this you will to add the objects back into space
    public resetSpace()
    {
        this.clearSpace();
        this.buildSpace();
    }
    // public destroySpace()
    // {
    //     this.clearSpace();
    //     this.world.destroy();
    //     delete this.world;
    //     delete this.seed;
    //     delete this.config;
    // }

    public getObjectsInBox(minX: number, minY: number, maxX: number, maxY: number): Array<Phaser.GameObjects.GameObject>
    {
        const world = this.world;
        const cameraGrid = world.cameraGrid;
        const gameObjects = world.gameObjectHandler.gameObjects;

        const minCoordinate = cameraGrid.getCoordinates(minX | 0, minY | 0); 
        const maxCoordinate = cameraGrid.getCoordinates(maxX | 0, maxY | 0);

        const objectsInCells: Array<Phaser.GameObjects.GameObject> = [];

        cameraGrid.loopThroughCells(
            minCoordinate.col, minCoordinate.row,
            maxCoordinate.col, maxCoordinate.row,
            function(cell: Array<any>, col: number, row: number)
            {
                var i, object;

                for(i in cell)
                {
                    object = gameObjects[gameObjects.references[cell[i].arrayName]][cell[i].id];

                    if(object !== undefined)
                    {
                        objectsInCells.push(object);
                    }
                }
            }
        );

        return objectsInCells;
    }

    public logWorld()
    {
        console.log(this.world.gameObjectHandler);   
    }

    public UIDebugGrid(graphics: Phaser.GameObjects.Graphics)
    {
        let cellWidth: number = this.world.cameraGrid.cellWidth;
        let cellHeight: number = this.world.cameraGrid.cellHeight;

        this.world.loopThroughVisibleCells((cell: object, col: number, row: number) =>
        {
            graphics.strokeRect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
        });
    }

    public getCellInfoText(x: number, y: number)
    {
        const world = this.world;
        
        var coordinates: { col: number, row: number } = world.cameraGrid.getCoordinates(x, y);

        var cell: any = world.cameraGrid.grid[coordinates.col][coordinates.row];

        var cellText: string = "";
        for(var i in cell)
        {
            cellText += i + "\n";
        }

        return {
            cellText: cellText,
            cellCoordinateText: `(${coordinates.col}, ${coordinates.row})`
        };
    }
}