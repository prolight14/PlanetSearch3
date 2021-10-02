"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Player_1 = require("../../gameObjects/planet/Player");
var logger_1 = require("../../logger");
var Traveler_1 = require("../../Saver/Traveler");
var PlanetLoaderScene = (function (_super) {
    __extends(PlanetLoaderScene, _super);
    function PlanetLoaderScene() {
        var _this = _super.call(this, "planetLoader") || this;
        _this.traveler = new Traveler_1.default();
        return _this;
    }
    PlanetLoaderScene.prototype.setTravelerSaveInfo = function (info) {
        if (info !== undefined) {
            this.traveler.saveInfo = info;
        }
    };
    PlanetLoaderScene.prototype.loadPlayer = function (inputData, tilemap, doorGroup, checkpointGroup, currentLevel, defaultLevel) {
        var spawnPoint = tilemap.findObject("Objects", function (obj) {
            return obj.name === "Player Spawn Point";
        });
        if (!spawnPoint) {
            spawnPoint = {
                x: 0,
                y: 0
            };
        }
        this.handleDoors(tilemap, doorGroup);
        this.handleCheckpoints(checkpointGroup, currentLevel);
        if (inputData.loadType === "door") {
            spawnPoint = this.getDoorEntryPoint(tilemap, doorGroup, inputData.doorGoto);
        }
        else if (inputData.loadType === "checkpoint") {
            spawnPoint = this.getCheckpointPlace(checkpointGroup, inputData.checkpointGoto);
        }
        var player = new Player_1.default(this.scene.get("planetLogic"), spawnPoint.x, spawnPoint.y);
        player.startLevel = defaultLevel;
        if (inputData.loadType === "checkpoint" &&
            this.traveler.saveInfo !== undefined &&
            this.traveler.saveInfo.playerStats !== undefined) {
            player.setStats(this.traveler.saveInfo.playerStats);
        }
        if (this.traveler.containsInfo) {
            var info = this.traveler.getInfo();
            player.setCurrentState(info.player);
        }
        this.player = player;
        return player;
    };
    PlanetLoaderScene.prototype.getDoorEntryPoint = function (tilemap, doorGroup, doorGoto) {
        var objects = tilemap.getObjectLayer("Objects").objects;
        for (var i = 0; i < objects.length; i++) {
            var obj = objects[i];
            if (obj.name !== "Door") {
                continue;
            }
            for (var j in obj.properties) {
                var prop = obj.properties[j];
                if (prop.name === "door" && prop.value === doorGoto.door) {
                    var doors = doorGroup.children.getArray();
                    for (var i = 0; i < doors.length; i++) {
                        var door = doors[i];
                        var doorBounds = door.getBounds();
                        if (doorBounds.contains(obj.x, obj.y)) {
                            return {
                                x: door.x,
                                y: door.y
                            };
                        }
                    }
                }
            }
        }
        logger_1.default.warn("Couldn't find door at door symbol '" + doorGoto.door + "'");
        return {
            x: 0,
            y: 0
        };
    };
    PlanetLoaderScene.prototype.handleDoors = function (tilemap, doorGroup, spawnPoint, doorGoto) {
        var objects = tilemap.getObjectLayer("Objects").objects;
        var _loop_1 = function () {
            var obj = objects[i];
            if (obj.name === "Door") {
                if (spawnPoint !== undefined && doorGoto !== undefined) {
                    for (var j in obj.properties) {
                        var prop = obj.properties[j];
                        if (prop.name === "door" && prop.value === doorGoto.door) {
                            doorGroup.getChildren().forEach(function (door) {
                                var doorBounds = door.getBounds();
                                if (doorBounds.contains(obj.x, obj.y)) {
                                    spawnPoint.x = door.x;
                                    spawnPoint.y = door.y;
                                }
                            });
                        }
                    }
                }
                doorGroup.getChildren().forEach(function (door) {
                    if (door.getBounds().contains(obj.x, obj.y)) {
                        var gotoLevel, gotoDoor;
                        for (var j in obj.properties) {
                            var prop = obj.properties[j];
                            if (prop.name === "gotoLevel") {
                                gotoLevel = prop.value;
                            }
                            else if (prop.name === "gotoDoor") {
                                gotoDoor = prop.value;
                            }
                        }
                        if (gotoLevel && gotoDoor) {
                            door.setGoto({
                                level: gotoLevel,
                                door: gotoDoor
                            });
                        }
                    }
                });
            }
        };
        for (var i = 0; i < objects.length; i++) {
            _loop_1();
        }
    };
    PlanetLoaderScene.prototype.getCheckpointPlace = function (checkpointGroup, goto) {
        var checkpoints = checkpointGroup.getChildren();
        for (var i = 0; i < checkpoints.length; i++) {
            if (checkpoints[i].goto.index === goto.index) {
                return {
                    x: checkpoints[i].x + checkpoints[i].body.halfWidth,
                    y: checkpoints[i].y
                };
            }
        }
        logger_1.default.warn("Couldn't load from checkpoint index '" + goto.index + "'");
        return {
            x: 0,
            y: 0
        };
    };
    PlanetLoaderScene.prototype.handleCheckpoints = function (checkpointGroup, currentLevel) {
        checkpointGroup.getChildren().forEach(function (checkpoint, index) {
            checkpoint.goto = {
                level: currentLevel,
                index: index
            };
        });
    };
    PlanetLoaderScene.prototype.update = function () {
    };
    PlanetLoaderScene.prototype.restart = function (inputData) {
        var _this = this;
        if (this.loading) {
            return;
        }
        this.loading = true;
        this.scene.pause("planetLogic");
        if (["restart", "death"].indexOf(inputData.reason) === -1) {
            this.traveler.setInfo({
                player: this.player.getCurrentState()
            });
        }
        var effectsScene = this.scene.get("planetEffects");
        effectsScene.fadeOut(500, 0, 0, 0);
        effectsScene.cameras.main.once("camerafadeoutcomplete", function () {
            _this.scene.run("planetLogic");
            var planetLogicScene = _this.scene.get("planetLogic");
            var loadData = planetLogicScene.loadData;
            if (inputData.loadType === "door") {
                loadData.currentLevel = inputData.doorGoto.level;
            }
            else if (inputData.loadType === "checkpoint") {
                loadData.currentLevel = inputData.checkpointGoto.level;
            }
            else if (inputData.loadType === "start") {
                loadData.currentLevel = inputData.startGoto.level;
            }
            planetLogicScene.scene.restart(inputData);
            _this.loading = false;
        });
    };
    return PlanetLoaderScene;
}(Phaser.Scene));
exports.default = PlanetLoaderScene;
//# sourceMappingURL=PlanetLoaderScene.js.map