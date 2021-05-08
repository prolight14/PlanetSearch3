(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define("CartesianSystem", [], factory);
    else if (typeof exports === 'object')
        exports["CartesianSystem"] = factory();
    else
        root["CartesianSystem"] = factory();
})(self, function () {
    return (function () {
        var __webpack_modules__ = ({
            "./Camera.js": (function (module) {
                function Camera(x, y, width, height) {
                    this.x = x;
                    this.y = y;
                    this.width = width;
                    this.height = height;
                    this.halfWidth = width / 2;
                    this.halfHeight = height / 2;
                    this.scrollX = x + this.halfWidth;
                    this.scrollY = y + this.halfHeight;
                    this.boundingBox = {
                        minX: this.scrollX - this.halfWidth,
                        minY: this.scrollY - this.halfHeight,
                        maxX: this.scrollX + this.halfWidth,
                        maxY: this.scrollY + this.halfHeight
                    };
                    this.updateScroll = function (x, y, bounds) {
                        this.scrollX = Math.min(Math.max(x, bounds.minX + this.halfWidth), bounds.maxX - this.halfWidth);
                        this.scrollY = Math.min(Math.max(y, bounds.minY + this.halfHeight), bounds.maxY - this.halfHeight);
                        this.boundingBox.minX = this.scrollX - this.halfWidth;
                        this.boundingBox.minY = this.scrollY - this.halfHeight;
                        this.boundingBox.maxX = this.scrollX + this.halfWidth;
                        this.boundingBox.maxY = this.scrollY + this.halfHeight;
                    };
                    this.setWindow = function (x, y, width, height) {
                        this.x = x;
                        this.y = y;
                        this.width = width;
                        this.height = height;
                        this.halfWidth = width / 2;
                        this.halfHeight = height / 2;
                    };
                    this.getTranslation = function () {
                        return {
                            x: this.x + this.halfWidth - this.scrollX,
                            y: this.y + this.halfHeight - this.scrollY
                        };
                    };
                }
                module.exports = Camera;
            }),
            "./CameraGrid.js": (function (module) {
                function CameraGrid(cols, rows, cellWidth, cellHeight) {
                    this.cols = cols;
                    this.rows = rows;
                    this.cellWidth = cellWidth;
                    this.cellHeight = cellHeight;
                    this.halfCellWidth = cellWidth / 2;
                    this.halfCellHeight = cellHeight / 2;
                    this.grid = [];
                    var round = Math.round;
                    var min = Math.min;
                    var max = Math.max;
                    this.reset = function () {
                        this.grid.length = 0;
                        var cols = this.cols;
                        var rows = this.rows;
                        var i, j;
                        for (i = 0; i < cols; i++) {
                            this.grid.push([]);
                            for (j = 0; j < rows; j++) {
                                this.grid[i][j] = Object.create(null);
                            }
                        }
                        this.minCol = 0;
                        this.minRow = 0;
                        this.maxCol = this.grid.length - 1;
                        this.maxRow = this.grid[0].length - 1;
                    };
                    this.getCoordinates = function (x, y) {
                        return {
                            col: max(min(round((x - this.halfCellWidth) / this.cellWidth), this.maxCol), this.minCol),
                            row: max(min(round((y - this.halfCellHeight) / this.cellHeight), this.maxRow), this.minRow)
                        };
                    };
                    this.addReference = function (object) {
                        var key = object._arrayName + object._id;
                        var toSet = {
                            arrayName: object._arrayName,
                            id: object._id
                        };
                        var box = object.bodyConf.boundingBox;
                        var minCol = max(min(round((box.minX - this.halfCellWidth) / this.cellWidth), this.maxCol), this.minCol), minRow = max(min(round((box.minY - this.halfCellHeight) / this.cellHeight), this.maxRow), this.minRow), maxCol = max(min(round((box.maxX - this.halfCellWidth) / this.cellWidth), this.maxCol), this.minCol), maxRow = max(min(round((box.maxY - this.halfCellHeight) / this.cellHeight), this.maxRow), this.minRow);
                        var col, row;
                        for (col = minCol; col <= maxCol; col++) {
                            for (row = minRow; row <= maxRow; row++) {
                                this.grid[col][row][key] = toSet;
                            }
                        }
                        object._minCol = minCol;
                        object._minRow = minRow;
                        object._maxCol = maxCol;
                        object._maxRow = maxRow;
                    };
                    this.removeReference = function (object) {
                        var key = object._arrayName + object._id;
                        var minCol = object._minCol, minRow = object._minRow, maxCol = object._maxCol, maxRow = object._maxRow;
                        var col, row;
                        for (col = minCol; col <= maxCol; col++) {
                            for (row = minRow; row <= maxRow; row++) {
                                delete this.grid[col][row][key];
                            }
                        }
                    };
                    this.loopThroughCells = function (minCol, minRow, maxCol, maxRow, callback) {
                        var col, row;
                        for (col = minCol; col <= maxCol; col++) {
                            for (row = minRow; row <= maxRow; row++) {
                                callback(this.grid[col][row], col, row);
                            }
                        }
                    };
                    this.removeAll = function (arrayToRemove) {
                        var col, row, cell, i;
                        for (col = this.minCol; col <= this.maxCol; col++) {
                            for (row = this.minRow; row <= this.maxRow; row++) {
                                cell = this.grid[col][row];
                                for (i in cell) {
                                    if (cell[i].arrayName === arrayToRemove) {
                                        delete cell[i];
                                    }
                                }
                            }
                        }
                    };
                }
                module.exports = CameraGrid;
            }),
            "./CreateAA.js": (function (module) {
                function CreateAA(object, keypairs, arrayName) {
                    if (typeof keypairs !== "object") {
                        keypairs = Object.create(null);
                    }
                    if (typeof arrayName === "undefined") {
                        arrayName = object.name.charAt(0).toLowerCase() + object.name.slice(1);
                    }
                    var system = {
                        cache: {
                            lowest: undefined,
                            highest: -1,
                        },
                        references: {},
                        length: 0,
                        _name: arrayName,
                        add: function () {
                            var id = this.cache.highest + 1;
                            if (this.cache.lowest !== undefined && !this.unique) {
                                id = this.cache.lowest;
                                this.cache.lowest = undefined;
                            }
                            if (id > this.cache.highest) {
                                this.cache.highest = id;
                            }
                            this.cache.tempId = id;
                            this.length++;
                            var item = new (Function.prototype.bind.apply(object, [null].concat(Array.prototype.slice.call(arguments))));
                            this[id] = item;
                            this[id]._name = this.cache.tempName === undefined ? this._name : this.cache.tempName;
                            this[id]._arrayName = this._name;
                            this[id]._id = id;
                            return item;
                        },
                        remove: function (id) {
                            if (this[id] === undefined) {
                                return false;
                            }
                            if (id === this.cache.highest) {
                                this.cache.highest--;
                            }
                            if (this.cache.lowest === undefined || id < this.cache.lowest) {
                                this.cache.lowest = id;
                            }
                            this.length--;
                            return delete this[id];
                        },
                        addObject: function (name) {
                            if (this.references[name] !== undefined) {
                                return;
                            }
                            var args = Array.prototype.slice.call(arguments);
                            this.cache.tempName = args.shift();
                            var item = this.add.apply(this, args);
                            this.references[name] = this.cache.tempId;
                            delete this.cache.tempId;
                            return item;
                        },
                        getObject: function (name) {
                            return this[this.references[name]] || delete this.references[name];
                        },
                        removeObject: function (name) {
                            var toRemove = this.references[name];
                            var success = delete this.references[name];
                            return this.remove(toRemove) && success;
                        },
                        forEach: function (callback) {
                            for (var i in this) {
                                callback(this[i], i, this);
                            }
                            return this;
                        },
                        define: function (key, prop) {
                            Object.defineProperty(this, key, {
                                enumerable: false,
                                writable: true,
                                configurable: true,
                                value: prop
                            });
                        }
                    };
                    if (object.apply === undefined) {
                        system.add = function () {
                            var id = this.cache.highest + 1;
                            if (this.cache.lowest !== undefined && !this.unique) {
                                id = this.cache.lowest;
                                this.cache.lowest = undefined;
                            }
                            if (id > this.cache.highest) {
                                this.cache.highest = id;
                            }
                            this.cache.tempId = id;
                            this.length++;
                            this[id] = arguments[0];
                            Object.defineProperty(this[id], "_name", {
                                enumerable: false,
                                writable: true,
                                configurable: true,
                                value: this.cache.tempName === undefined ? this._name : this.cache.tempName
                            });
                            Object.defineProperty(this[id], "_arrayName", {
                                enumerable: false,
                                writable: true,
                                configurable: true,
                                value: this._name
                            });
                            Object.defineProperty(this[id], "_id", {
                                enumerable: false,
                                writable: true,
                                configurable: true,
                                value: id
                            });
                            return this[id];
                        };
                    }
                    for (var i in system) {
                        Object.defineProperty(keypairs, i, {
                            enumerable: false,
                            writable: true,
                            configurable: true,
                            value: system[i]
                        });
                    }
                    return keypairs;
                }
                module.exports = CreateAA;
            }),
            "./GameObjectHandler.js": (function (module, __unused_webpack_exports, __webpack_require__) {
                var createAA = __webpack_require__("./CreateAA.js");
                function GameObjectHandler() {
                    var gameObjects = createAA([], undefined, "gameObjects");
                    var usedFL = {};
                    var used = {};
                    this.forEach = function (callback) {
                        return gameObjects.forEach(callback);
                    };
                    this.addArray = function (name, gameObjectArray) {
                        return gameObjects.addObject(name, gameObjectArray);
                    };
                    this.getArray = function (name) {
                        return gameObjects.getObject(name);
                    };
                    this.removeArray = function (name) {
                        return gameObjects.removeObject(name);
                    };
                    this.resetProcessList = function () {
                        usedFL = {};
                        used = {};
                    };
                    this.addToProcessList = function (cameraGrid, minCol, minRow, maxCol, maxRow) {
                        var grid = cameraGrid.grid;
                        var col, row, cell, i, object, id;
                        for (col = minCol; col <= maxCol; col++) {
                            for (row = minRow; row <= maxRow; row++) {
                                cell = grid[col][row];
                                for (i in cell) {
                                    if (usedFL[i]) {
                                        continue;
                                    }
                                    object = gameObjects[gameObjects.references[cell[i].arrayName]][cell[i].id];
                                    id = gameObjects.references[object._arrayName];
                                    used[id] = used[id] === undefined ? [] : used[id];
                                    used[id].push(object._id);
                                    usedFL[i] = true;
                                }
                            }
                        }
                        for (id in used) {
                            used[id].sort();
                        }
                    };
                    this.act = function (cameraGrid, key) {
                        var id, j, object;
                        for (id in used) {
                            for (j = 0; j < used[id].length; j++) {
                                object = gameObjects[id][used[id][j]];
                                object[key]();
                                if (object.bodyConf.moves) {
                                    cameraGrid.removeReference(object);
                                    cameraGrid.addReference(object);
                                }
                            }
                        }
                    };
                    this.loopProcessList = function (cameraGrid, callback) {
                        var i, j, object;
                        for (i in used) {
                            for (j = 0; j < used[i].length; j++) {
                                object = gameObjects[i][used[i][j]];
                                callback(object, gameObjects.references[i], used[i][j]);
                                if (object.bodyConf.moves) {
                                    cameraGrid.removeReference(object);
                                    cameraGrid.addReference(object);
                                }
                            }
                        }
                    };
                }
                module.exports = GameObjectHandler;
            }),
            "./index.js": (function (module, __unused_webpack_exports, __webpack_require__) {
                var CreateAA = __webpack_require__("./CreateAA.js");
                var CameraGrid = __webpack_require__("./CameraGrid.js");
                var Camera = __webpack_require__("./Camera.js");
                var GameObjectHandler = __webpack_require__("./GameObjectHandler.js");
                var CartesianSystem = {
                    World: function (config) {
                        this.camera = new Camera(config.window.x === undefined ? 0 : config.window.x, config.window.y === undefined ? 0 : config.window.y, config.window.width, config.window.height);
                        this.cameraGrid = new CameraGrid(config.grid.cols, config.grid.rows, config.grid.cellWidth, config.grid.cellHeight);
                        this.gameObjectHandler = new GameObjectHandler();
                        this.init = function () {
                            this.cameraGrid.reset();
                            return this;
                        };
                        var _this = this;
                        this.add = {};
                        this.add.gameObjectArray = function (object, arrayName) {
                            if (arrayName === undefined) {
                                arrayName = object.name.charAt(0).toLowerCase() + object.name.slice(1);
                            }
                            var array = _this.gameObjectHandler.addArray(arrayName, CreateAA(object, undefined, arrayName));
                            var lastAdd = array.add;
                            Object.defineProperty(array, "add", {
                                enumerable: false,
                                writable: true,
                                configurable: true,
                                value: function () {
                                    var gameObject = lastAdd.apply(this, arguments);
                                    _this.cameraGrid.addReference(gameObject);
                                    return gameObject;
                                }
                            });
                            var lastAddObject = array.addObject;
                            Object.defineProperty(array, "addObject", {
                                enumerable: false,
                                writable: true,
                                configurable: true,
                                value: function () {
                                    var gameObject = lastAddObject.apply(this, arguments);
                                    if (gameObject === undefined) {
                                        return;
                                    }
                                    _this.cameraGrid.addReference(gameObject);
                                    return gameObject;
                                }
                            });
                            var lastRemove = array.remove;
                            Object.defineProperty(array, "remove", {
                                enumerable: false,
                                writable: true,
                                configurable: true,
                                value: function (id) {
                                    _this.cameraGrid.removeReference(this[id]);
                                    return lastRemove.apply(this, arguments);
                                }
                            });
                            var lastRemoveObject = array.removeObject;
                            Object.defineProperty(array, "removeObject", {
                                enumerable: false,
                                writable: true,
                                configurable: true,
                                value: function (name) {
                                    _this.cameraGrid.removeReference(this[this.references[name]]);
                                    return lastRemoveObject.apply(this, arguments);
                                }
                            });
                            return array;
                        };
                        this.add.gameObject = function (arrayName) {
                            var gameObjectArray = _this.gameObjectHandler.getArray(arrayName);
                            var gameObject = gameObjectArray.add.apply(gameObjectArray, Array.prototype.slice.call(arguments, 1));
                            _this.cameraGrid.addReference(gameObject);
                            return gameObject;
                        };
                        this.get = {};
                        this.get.gameObjectArray = function (arrayName) {
                            return _this.gameObjectHandler.getArray(arrayName);
                        };
                        this.get.gameObject = function (arrayName, id) {
                            return _this.gameObjectHandler.getArray(arrayName)[id];
                        };
                        this.remove = {};
                        this.remove.gameObjectArray = function (arrayName) {
                            _this.cameraGrid.removeAll(arrayName);
                            gameObjectHandler.removeArray(arrayName);
                            return this;
                        };
                        this.remove.gameObject = function (arrayName, id) {
                            var gameObjectArray = _this.gameObjectHandler.getArray(arrayName);
                            _this.cameraGrid.removeReference(gameObjectArray[id]);
                            gameObjectArray.remove(id);
                            return this;
                        };
                        this.bounds = {
                            minX: 0,
                            minY: 0,
                            maxX: 0 + this.cameraGrid.cols * this.cameraGrid.cellWidth,
                            maxY: 0 + this.cameraGrid.rows * this.cameraGrid.cellHeight
                        };
                        this.loopThroughVisibleCells = function (callback) {
                            var minPos = this.minCamPos = this.cameraGrid.getCoordinates(this.camera.boundingBox.minX, this.camera.boundingBox.minY);
                            var maxPos = this.maxCamPos = this.cameraGrid.getCoordinates(this.camera.boundingBox.maxX, this.camera.boundingBox.maxY);
                            this.cameraGrid.loopThroughCells(minPos.col, minPos.row, maxPos.col, maxPos.row, callback);
                        };
                        this.updateProcessList = function () {
                            var minPos = this.minCamPos = this.cameraGrid.getCoordinates(this.camera.boundingBox.minX, this.camera.boundingBox.minY);
                            var maxPos = this.maxCamPos = this.cameraGrid.getCoordinates(this.camera.boundingBox.maxX, this.camera.boundingBox.maxY);
                            this.gameObjectHandler.addToProcessList(this.cameraGrid, minPos.col, minPos.row, maxPos.col, maxPos.row);
                        };
                        this.loopProcessList = function (callback) {
                            this.gameObjectHandler.loopProcessList(this.cameraGrid, callback);
                        };
                        this.resetProcessList = function () {
                            this.gameObjectHandler.resetProcessList();
                        };
                        this.update = function (x, y) {
                            this.camera.updateScroll(x, y, this.bounds);
                            var minPos = this.minCamPos = this.cameraGrid.getCoordinates(this.camera.boundingBox.minX, this.camera.boundingBox.minY);
                            var maxPos = this.maxCamPos = this.cameraGrid.getCoordinates(this.camera.boundingBox.maxX, this.camera.boundingBox.maxY);
                            if (arguments.length <= 2) {
                                return;
                            }
                            this.gameObjectHandler.addToProcessList(this.cameraGrid, minPos.col, minPos.row, maxPos.col, maxPos.row);
                            var inputArgs = Array.prototype.slice.call(arguments).slice(2);
                            for (var i = 0; i < inputArgs.length; i++) {
                                this.gameObjectHandler.act.apply(this.gameObjectHandler, [this.cameraGrid].concat(inputArgs[i]));
                            }
                            this.gameObjectHandler.resetProcessList();
                        };
                    },
                    CreateAA: CreateAA,
                    Camera: Camera,
                    CameraGrid: CameraGrid,
                    GameObjectHandler: GameObjectHandler
                };
                module.exports = CartesianSystem;
                __webpack_require__.g.CartesianSystem = CartesianSystem;
            })
        });
        var __webpack_module_cache__ = {};
        function __webpack_require__(moduleId) {
            if (__webpack_module_cache__[moduleId]) {
                return __webpack_module_cache__[moduleId].exports;
            }
            var module = __webpack_module_cache__[moduleId] = {
                exports: {}
            };
            __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
            return module.exports;
        }
        (function () {
            __webpack_require__.g = (function () {
                if (typeof globalThis === 'object')
                    return globalThis;
                try {
                    return this || new Function('return this')();
                }
                catch (e) {
                    if (typeof window === 'object')
                        return window;
                }
            })();
        })();
        var __webpack_exports__ = __webpack_require__("./index.js");
        return __webpack_exports__;
    })();
});
//# sourceMappingURL=CartesianSystem.js.map