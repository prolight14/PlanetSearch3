(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory(require("phaser"));
    else if (typeof define === 'function' && define.amd)
        define(["phaser"], factory);
    else if (typeof exports === 'object')
        exports["PhaserMatterCollisionPlugin"] = factory(require("phaser"));
    else
        root["PhaserMatterCollisionPlugin"] = factory(root["Phaser"]);
})(window, function (__WEBPACK_EXTERNAL_MODULE__0__) {
    return (function (modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) {
                return installedModules[moduleId].exports;
            }
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: false,
                exports: {}
            };
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.l = true;
            return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.d = function (exports, name, getter) {
            if (!__webpack_require__.o(exports, name)) {
                Object.defineProperty(exports, name, { enumerable: true, get: getter });
            }
        };
        __webpack_require__.r = function (exports) {
            if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            }
            Object.defineProperty(exports, '__esModule', { value: true });
        };
        __webpack_require__.t = function (value, mode) {
            if (mode & 1)
                value = __webpack_require__(value);
            if (mode & 8)
                return value;
            if ((mode & 4) && typeof value === 'object' && value && value.__esModule)
                return value;
            var ns = Object.create(null);
            __webpack_require__.r(ns);
            Object.defineProperty(ns, 'default', { enumerable: true, value: value });
            if (mode & 2 && typeof value != 'string')
                for (var key in value)
                    __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
            return ns;
        };
        __webpack_require__.n = function (module) {
            var getter = module && module.__esModule ?
                function getDefault() { return module['default']; } :
                function getModuleExports() { return module; };
            __webpack_require__.d(getter, 'a', getter);
            return getter;
        };
        __webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
        __webpack_require__.p = "";
        return __webpack_require__(__webpack_require__.s = 1);
    })([
        (function (module, exports) {
            module.exports = __WEBPACK_EXTERNAL_MODULE__0__;
        }),
        (function (module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            var external_root_Phaser_commonjs_phaser_commonjs2_phaser_amd_phaser_ = __webpack_require__(0);
            var external_root_Phaser_commonjs_phaser_commonjs2_phaser_amd_phaser_default = __webpack_require__.n(external_root_Phaser_commonjs_phaser_commonjs2_phaser_amd_phaser_);
            var logger = ({
                log: console.log,
                warn: console.warn,
                error: console.error
            });
            function getRootBody(body) {
                while (body.parent !== body) {
                    body = body.parent;
                }
                return body;
            }
            function isMatterBody(obj) {
                return obj.hasOwnProperty("collisionFilter") && obj.hasOwnProperty("parts") && obj.hasOwnProperty("slop");
            }
            function isPhysicsObject(obj) {
                return isMatterBody(obj) || obj.body || obj instanceof external_root_Phaser_commonjs_phaser_commonjs2_phaser_amd_phaser_default.a.Tilemaps.Tile;
            }
            function warnInvalidObject(obj) {
                logger.warn("Expected a Matter body, Tile or an object with a body property, but instead, recieved: " + obj);
            }
            var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor)
                    descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            } } return function (Constructor, protoProps, staticProps) { if (protoProps)
                defineProperties(Constructor.prototype, protoProps); if (staticProps)
                defineProperties(Constructor, staticProps); return Constructor; }; }();
            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            } }
            function _possibleConstructorReturn(self, call) { if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
            function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass)
                Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
            var phaser_matter_collision_plugin_MatterCollisionPlugin = function (_Phaser$Plugins$Scene) {
                _inherits(MatterCollisionPlugin, _Phaser$Plugins$Scene);
                function MatterCollisionPlugin(scene, pluginManager) {
                    _classCallCheck(this, MatterCollisionPlugin);
                    var _this = _possibleConstructorReturn(this, (MatterCollisionPlugin.__proto__ || Object.getPrototypeOf(MatterCollisionPlugin)).call(this, scene, pluginManager));
                    _this.scene = scene;
                    _this.events = new external_root_Phaser_commonjs_phaser_commonjs2_phaser_amd_phaser_default.a.Events.EventEmitter();
                    _this.collisionStartListeners = new Map();
                    _this.collisionEndListeners = new Map();
                    _this.collisionActiveListeners = new Map();
                    _this.onCollisionStart = _this.onCollisionEvent.bind(_this, _this.collisionStartListeners, "collisionstart");
                    _this.onCollisionEnd = _this.onCollisionEvent.bind(_this, _this.collisionEndListeners, "collisionend");
                    _this.onCollisionActive = _this.onCollisionEvent.bind(_this, _this.collisionActiveListeners, "collisionactive");
                    _this.scene.events.once("start", _this.start, _this);
                    _this.scene.events.once("destroy", _this.destroy, _this);
                    return _this;
                }
                _createClass(MatterCollisionPlugin, [{
                        key: "addOnCollideStart",
                        value: function addOnCollideStart() {
                            var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}, objectA = _ref.objectA, objectB = _ref.objectB, callback = _ref.callback, context = _ref.context;
                            this.addOnCollide(this.collisionStartListeners, objectA, objectB, callback, context);
                            return this.removeOnCollideStart.bind(this, { objectA: objectA, objectB: objectB, callback: callback, context: context });
                        }
                    }, {
                        key: "addOnCollideEnd",
                        value: function addOnCollideEnd() {
                            var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}, objectA = _ref2.objectA, objectB = _ref2.objectB, callback = _ref2.callback, context = _ref2.context;
                            this.addOnCollide(this.collisionEndListeners, objectA, objectB, callback, context);
                            return this.removeOnCollideEnd.bind(this, { objectA: objectA, objectB: objectB, callback: callback, context: context });
                        }
                    }, {
                        key: "addOnCollideActive",
                        value: function addOnCollideActive() {
                            var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}, objectA = _ref3.objectA, objectB = _ref3.objectB, callback = _ref3.callback, context = _ref3.context;
                            this.addOnCollide(this.collisionActiveListeners, objectA, objectB, callback, context);
                            return this.removeOnCollideActive.bind(this, { objectA: objectA, objectB: objectB, callback: callback, context: context });
                        }
                    }, {
                        key: "removeOnCollideStart",
                        value: function removeOnCollideStart() {
                            var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}, objectA = _ref4.objectA, objectB = _ref4.objectB, callback = _ref4.callback, context = _ref4.context;
                            this.removeOnCollide(this.collisionStartListeners, objectA, objectB, callback, context);
                        }
                    }, {
                        key: "removeOnCollideEnd",
                        value: function removeOnCollideEnd() {
                            var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}, objectA = _ref5.objectA, objectB = _ref5.objectB, callback = _ref5.callback, context = _ref5.context;
                            this.removeOnCollide(this.collisionEndListeners, objectA, objectB, callback, context);
                        }
                    }, {
                        key: "removeOnCollideActive",
                        value: function removeOnCollideActive() {
                            var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}, objectA = _ref6.objectA, objectB = _ref6.objectB, callback = _ref6.callback, context = _ref6.context;
                            this.removeOnCollide(this.collisionActiveListeners, objectA, objectB, callback, context);
                        }
                    }, {
                        key: "removeAllCollideStartListeners",
                        value: function removeAllCollideStartListeners() {
                            this.collisionStartListeners.clear();
                        }
                    }, {
                        key: "removeAllCollideActiveListeners",
                        value: function removeAllCollideActiveListeners() {
                            this.collisionActiveListeners.clear();
                        }
                    }, {
                        key: "removeAllCollideEndListeners",
                        value: function removeAllCollideEndListeners() {
                            this.collisionEndListeners.clear();
                        }
                    }, {
                        key: "removeAllCollideListeners",
                        value: function removeAllCollideListeners() {
                            this.removeAllCollideStartListeners();
                            this.removeAllCollideActiveListeners();
                            this.removeAllCollideEndListeners();
                        }
                    }, {
                        key: "addOnCollide",
                        value: function addOnCollide(map, objectA, objectB, callback, context) {
                            var _this2 = this;
                            if (!callback || typeof callback !== "function") {
                                logger.warn("No valid callback specified. Received: " + callback);
                                return;
                            }
                            var objectsA = Array.isArray(objectA) ? objectA : [objectA];
                            var objectsB = Array.isArray(objectB) ? objectB : [objectB];
                            objectsA.forEach(function (a) {
                                objectsB.forEach(function (b) {
                                    _this2.addOnCollideObjectVsObject(map, a, b, callback, context);
                                });
                            });
                        }
                    }, {
                        key: "removeOnCollide",
                        value: function removeOnCollide(map, objectA, objectB, callback, context) {
                            var objectsA = Array.isArray(objectA) ? objectA : [objectA];
                            var objectsB = Array.isArray(objectB) ? objectB : [objectB];
                            objectsA.forEach(function (a) {
                                if (!objectB) {
                                    map.delete(a);
                                }
                                else {
                                    var callbacks = map.get(a) || [];
                                    var remainingCallbacks = callbacks.filter(function (cb) {
                                        return !(objectsB.includes(cb.target) && (!callback || cb.callback === callback) && (!context || cb.context === context));
                                    });
                                    if (remainingCallbacks.length > 0)
                                        map.set(a, remainingCallbacks);
                                    else
                                        map.delete(a);
                                }
                            });
                        }
                    }, {
                        key: "addOnCollideObjectVsObject",
                        value: function addOnCollideObjectVsObject(map, objectA, objectB, callback, context) {
                            if (!objectA || !isPhysicsObject(objectA)) {
                                warnInvalidObject(objectA);
                                return;
                            }
                            if (objectB && !isPhysicsObject(objectB)) {
                                warnInvalidObject(objectA);
                                return;
                            }
                            var callbacks = map.get(objectA) || [];
                            callbacks.push({ target: objectB, callback: callback, context: context });
                            map.set(objectA, callbacks);
                        }
                    }, {
                        key: "onCollisionEvent",
                        value: function onCollisionEvent(listenerMap, eventName, event) {
                            var _this3 = this;
                            var pairs = event.pairs;
                            var pairEventName = "pair" + eventName;
                            var eventData = {};
                            var eventDataReversed = { isReversed: true };
                            pairs.map(function (pair, i) {
                                var bodyA = pair.bodyA, bodyB = pair.bodyB;
                                var gameObjectA = getRootBody(bodyA).gameObject;
                                var gameObjectB = getRootBody(bodyB).gameObject;
                                if (gameObjectA && gameObjectA.tile)
                                    gameObjectA = gameObjectA.tile;
                                if (gameObjectB && gameObjectB.tile)
                                    gameObjectB = gameObjectB.tile;
                                pairs[i].gameObjectA = gameObjectA;
                                pairs[i].gameObjectB = gameObjectB;
                                eventData.bodyA = bodyA;
                                eventData.bodyB = bodyB;
                                eventData.gameObjectA = gameObjectA;
                                eventData.gameObjectB = gameObjectB;
                                eventData.pair = pair;
                                _this3.events.emit(pairEventName, eventData);
                                if (listenerMap.size) {
                                    eventDataReversed.bodyB = bodyA;
                                    eventDataReversed.bodyA = bodyB;
                                    eventDataReversed.gameObjectB = gameObjectA;
                                    eventDataReversed.gameObjectA = gameObjectB;
                                    eventDataReversed.pair = pair;
                                    _this3.checkPairAndEmit(listenerMap, bodyA, bodyB, gameObjectB, eventData);
                                    _this3.checkPairAndEmit(listenerMap, bodyB, bodyA, gameObjectA, eventDataReversed);
                                    if (gameObjectA) {
                                        _this3.checkPairAndEmit(listenerMap, gameObjectA, bodyB, gameObjectB, eventData);
                                    }
                                    if (gameObjectB) {
                                        _this3.checkPairAndEmit(listenerMap, gameObjectB, bodyA, gameObjectA, eventDataReversed);
                                    }
                                }
                            });
                            this.events.emit(eventName, event);
                        }
                    }, {
                        key: "checkPairAndEmit",
                        value: function checkPairAndEmit(map, objectA, bodyB, gameObjectB, eventData) {
                            var callbacks = map.get(objectA);
                            if (callbacks) {
                                callbacks.forEach(function (_ref7) {
                                    var target = _ref7.target, callback = _ref7.callback, context = _ref7.context;
                                    if (!target || target === bodyB || target === gameObjectB) {
                                        callback.call(context, eventData);
                                    }
                                });
                            }
                        }
                    }, {
                        key: "subscribeMatterEvents",
                        value: function subscribeMatterEvents() {
                            var matter = this.scene.matter;
                            if (!matter || !matter.world) {
                                logger.warn("Plugin requires matter!");
                                return;
                            }
                            matter.world.on("collisionstart", this.onCollisionStart);
                            matter.world.on("collisionactive", this.onCollisionActive);
                            matter.world.on("collisionend", this.onCollisionEnd);
                        }
                    }, {
                        key: "unsubscribeMatterEvents",
                        value: function unsubscribeMatterEvents() {
                            var matter = this.scene.matter;
                            if (!matter || !matter.world)
                                return;
                            matter.world.off("collisionstart", this.onCollisionStart);
                            matter.world.off("collisionactive", this.onCollisionActive);
                            matter.world.off("collisionend", this.onCollisionEnd);
                        }
                    }, {
                        key: "start",
                        value: function start() {
                            this.scene.events.off("shutdown", this.shutdown, this);
                            this.scene.events.on("shutdown", this.shutdown, this);
                            this.subscribeMatterEvents();
                        }
                    }, {
                        key: "shutdown",
                        value: function shutdown() {
                            this.removeAllCollideListeners();
                            this.unsubscribeMatterEvents();
                            this.scene.events.once("start", this.start, this);
                        }
                    }, {
                        key: "destroy",
                        value: function destroy() {
                            this.scene.events.off("start", this.start, this);
                            this.scene.events.off("shutdown", this.shutdown, this);
                            this.removeAllCollideListeners();
                            this.unsubscribeMatterEvents();
                            this.scene = undefined;
                        }
                    }]);
                return MatterCollisionPlugin;
            }(external_root_Phaser_commonjs_phaser_commonjs2_phaser_amd_phaser_default.a.Plugins.ScenePlugin);
            var phaser_matter_collision_plugin = (phaser_matter_collision_plugin_MatterCollisionPlugin);
            var index = __webpack_exports__["default"] = (phaser_matter_collision_plugin);
        })
    ])["default"];
});
//# sourceMappingURL=phaser-matter-collision-plugin.js.map