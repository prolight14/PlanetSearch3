"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpaceGrid = (function () {
    function SpaceGrid(systems, config) {
        this.scrollX = -1;
        this.scrollY = -1;
        this.lastScrollX = -1;
        this.lastScrollY = -1;
        this.sleeping = false;
        this.sleepingEnabled = true;
        this.systems = systems;
        this.config = config;
        this.seed = config.seed;
        this.world = new CartesianSystem.World(this.config);
    }
    SpaceGrid.prototype.buildSpace = function (newConfig) {
        if (newConfig !== undefined) {
            this.config = newConfig;
        }
        Phaser.Math.RND.init([this.seed.toString()]);
        var world = this.world;
        var bounds = this.world.bounds;
        this.systems.cameras.main.setBounds(bounds.minX, bounds.minY, bounds.maxX - bounds.minX, bounds.maxY - bounds.minY);
        this.add = {
            gameObjectArray: function (object, arrayName) {
                return world.add.array(object, arrayName);
            }
        };
        this.get = {
            gameObjectArray: function (arrayName) {
                return world.get.array(arrayName);
            },
            gameObject: function (arrayName, id) {
                return world.get.array(arrayName)[id];
            }
        };
        this.remove = {
            gameObjectArray: function (arrayName) {
                return world.remove.array(arrayName);
            }
        };
        this.camera = {
            setWindow: function (x, y, width, height) {
                world.camera.setWindow(x, y, width, height);
            }
        };
    };
    SpaceGrid.prototype.updateScroll = function (x, y) {
        this.scrollX = x;
        this.scrollY = y;
    };
    SpaceGrid.prototype.updateSpace = function () {
        var world = this.world;
        world.camera.updateScroll(this.scrollX, this.scrollY, world.bounds);
        if (this.sleepingEnabled) {
            this.sleeping = (this.lastScrollX === world.camera.scrollX && this.lastScrollY === world.camera.scrollY);
            this.lastScrollX = world.camera.scrollX;
            this.lastScrollY = world.camera.scrollY;
            if (this.sleeping) {
                return;
            }
        }
        world.resetProcessList();
        world.updateProcessList();
        this.integrate(this.systems);
    };
    SpaceGrid.prototype.integrate = function (sys) {
        sys.displayList.removeAll();
        sys.updateList.removeAll();
        sys.updateList.update();
        this.world.loopProcessList(function (object) {
            sys.displayList.add(object);
            sys.updateList.add(object);
        });
        var checkDestroy = function (gameObject) {
            if (gameObject.destroyQueued) {
                gameObject.destroy();
                gameObject.destroyQueued = false;
            }
        };
        sys.displayList.list.forEach(checkDestroy);
        sys.updateList.getActive().forEach(checkDestroy);
        sys.displayList.queueDepthSort();
    };
    SpaceGrid.prototype.initGameObject = function (gameObject) {
        var world = this.world;
        var worldGameObjects = world.gameObjectHandler.gameObjects;
        gameObject.bodyConf = {
            moves: true,
            boundingBox: {},
            update: function () { },
            destroy: function () { },
            updateBoundingBox: function () { },
        };
        gameObject.bodyConf.updateBoundingBox = function () {
            this.boundingBox.minX = gameObject.x - gameObject.displayWidth / 2;
            this.boundingBox.minY = gameObject.y - gameObject.displayHeight / 2;
            this.boundingBox.maxX = gameObject.x + gameObject.displayWidth / 2;
            this.boundingBox.maxY = gameObject.y + gameObject.displayHeight / 2;
        };
        gameObject.bodyConf.updateBoundingBox();
        gameObject.bodyConf.update = function () {
            gameObject.bodyConf.updateBoundingBox();
            world.cameraGrid.removeReference(gameObject);
            world.cameraGrid.addReference(gameObject);
        };
        gameObject.bodyConf.destroy = function () {
            gameObject.bodyConf.updateBoundingBox();
            world.cameraGrid.removeReference(gameObject);
        };
        if (!gameObject.body) {
            gameObject.body = {};
        }
        gameObject.on("destroy", function () {
            gameObject.bodyConf.destroy();
            worldGameObjects[worldGameObjects.references[this._arrayName]].remove(this._id);
        });
    };
    SpaceGrid.prototype.clearSpace = function () {
        var world = this.world;
        world.cameraGrid.reset();
        var gameObjects = world.gameObjectHandler.gameObjects;
        for (var i in gameObjects) {
            for (var j in gameObjects[i]) {
                if (gameObjects[i][j].ignoreDestroy) {
                    gameObjects[i][j].destroyQueued = false;
                    continue;
                }
                gameObjects[i][j].destroy();
            }
            if (!gameObjects[i].ignoreDestroy) {
                gameObjects.removeObject(gameObjects[i]._name);
            }
        }
        Phaser.Math.RND.init([this.seed.toString()]);
    };
    SpaceGrid.prototype.resetSpace = function () {
        this.clearSpace();
        this.buildSpace();
    };
    SpaceGrid.prototype.getObjectsInBox = function (minX, minY, maxX, maxY) {
        var world = this.world;
        var cameraGrid = world.cameraGrid;
        var gameObjects = world.gameObjectHandler.gameObjects;
        var minCoordinate = cameraGrid.getCoordinates(minX | 0, minY | 0);
        var maxCoordinate = cameraGrid.getCoordinates(maxX | 0, maxY | 0);
        var objectsInCells = [];
        cameraGrid.loopThroughCells(minCoordinate.col, minCoordinate.row, maxCoordinate.col, maxCoordinate.row, function (cell, col, row) {
            var i, object;
            for (i in cell) {
                object = gameObjects[gameObjects.references[cell[i].arrayName]][cell[i].id];
                if (object !== undefined) {
                    objectsInCells.push(object);
                }
            }
        });
        return objectsInCells;
    };
    SpaceGrid.prototype.logWorld = function () {
        console.log(this.world.gameObjectHandler);
    };
    SpaceGrid.prototype.UIDebugGrid = function (graphics) {
        var cellWidth = this.world.cameraGrid.cellWidth;
        var cellHeight = this.world.cameraGrid.cellHeight;
        this.world.loopThroughVisibleCells(function (cell, col, row) {
            graphics.strokeRect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
        });
    };
    SpaceGrid.prototype.getCellInfoText = function (x, y) {
        var world = this.world;
        var coordinates = world.cameraGrid.getCoordinates(x, y);
        var cell = world.cameraGrid.grid[coordinates.col][coordinates.row];
        var cellText = "";
        for (var i in cell) {
            cellText += i + "\n";
        }
        return {
            cellText: cellText,
            cellCoordinateText: "(" + coordinates.col + ", " + coordinates.row + ")"
        };
    };
    return SpaceGrid;
}());
exports.default = SpaceGrid;
//# sourceMappingURL=SpaceGrid.js.map