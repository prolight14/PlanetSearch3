(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define("CartesianSystemPlugin", [], factory);
    else if (typeof exports === 'object')
        exports["CartesianSystemPlugin"] = factory();
    else
        root["CartesianSystemPlugin"] = factory();
})(self, function () {
    return (function () {
        var __webpack_modules__ = ({
            "./CartesianSystemPlugin.js": (function (module) {
                function NOOP() { }
                var CartesianSystemPlugin = function (scene) {
                    this.scene = scene;
                    this.systems = scene.sys;
                    if (!scene.sys.settings.isBooted) {
                        scene.sys.events.once('boot', this.boot, this);
                    }
                };
                CartesianSystemPlugin.register = function (PluginManager) {
                    PluginManager.register('CartesianSystemPlugin', CartesianSystemPlugin, 'base');
                };
                CartesianSystemPlugin.prototype = {
                    boot: function () {
                        var eventEmitter = this.systems.events;
                        eventEmitter.on('shutdown', this.shutdown, this);
                        eventEmitter.on('destroy', this.destroy, this);
                    },
                    initWorld: function (config) {
                        this.world = (new CartesianSystem.World(config)).init();
                        this.followX = 0;
                        this.followY = 0;
                        var bounds = this.world.bounds;
                        this.scene.cameras.main.setBounds(bounds.minX, bounds.minY, bounds.maxX - bounds.minX, bounds.maxY - bounds.minY);
                    },
                    integrate: function (callback) {
                        var world = this.world;
                        var sys = this.systems;
                        sys.displayList.removeAll();
                        sys.updateList.removeAll();
                        sys.updateList.update();
                        world.loopProcessList(function (object) {
                            sys.displayList.add(object);
                            sys.updateList.add(object);
                        });
                        callback(this);
                        sys.displayList.queueDepthSort();
                    },
                    setFollow: function (x, y) {
                        this.followX = x;
                        this.followY = y;
                    },
                    updateWorld: function (callback) {
                        if (callback === undefined) {
                            callback = NOOP;
                        }
                        var world = this.world;
                        world.update(this.followX, this.followY);
                        world.updateProcessList();
                        this.integrate(callback);
                        world.resetProcessList();
                    },
                    initGameObject: function (gameObject) {
                        var world = this.world;
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
                        });
                    },
                    removeGameObject: function (gameObject) {
                        gameObject.bodyConf.updateBoundingBox();
                        this.world.cameraGrid.removeReference(gameObject);
                        gameObject.bodyConf.updateBoundingBox();
                        gameObject.destroy();
                    },
                    removeAllGameObjects: function (callback) {
                        if (callback === undefined) {
                            callback = function () { };
                        }
                        var world = this.world;
                        var gameObjectArrays = world.get.allGameObjects();
                        for (var arrayName in gameObjectArrays) {
                            var gameObjects = gameObjectArrays[arrayName];
                            for (var objName in gameObjects) {
                                var object = gameObjects[objName];
                                if (object.ignoreDestroy) {
                                    this.removeGameObject(object);
                                    callback(object);
                                }
                            }
                        }
                    },
                    shutdown: function () {
                        this.world = undefined;
                    },
                    destroy: function () {
                        this.shutdown();
                        this.scene = undefined;
                        this.systems = undefined;
                    }
                };
                CartesianSystemPlugin.prototype.constructor = CartesianSystemPlugin;
                module.exports = CartesianSystemPlugin;
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
        var __webpack_exports__ = __webpack_require__("./CartesianSystemPlugin.js");
        return __webpack_exports__;
    })();
});
//# sourceMappingURL=CartesianSystemPlugin%20copy.js.map