(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("CartesianSystemPlugin", [], factory);
	else if(typeof exports === 'object')
		exports["CartesianSystemPlugin"] = factory();
	else
		root["CartesianSystemPlugin"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./CartesianSystemPlugin.js":
/*!**********************************!*\
  !*** ./CartesianSystemPlugin.js ***!
  \**********************************/
/***/ ((module) => {

function NOOP() {}

var CartesianSystemPlugin = function (scene)
{
    this.scene = scene;

    this.systems = scene.sys;

    if (!scene.sys.settings.isBooted)
    {
        scene.sys.events.once('boot', this.boot, this);
    }
};

CartesianSystemPlugin.register = function (PluginManager)
{
    PluginManager.register('CartesianSystemPlugin', CartesianSystemPlugin, 'base');
};

CartesianSystemPlugin.prototype = {
    boot: function()
    {
        var eventEmitter = this.systems.events;

        eventEmitter.on('shutdown', this.shutdown, this);
        eventEmitter.on('destroy', this.destroy, this);
    },

    initWorld: function(config)
    {
        this.world = (new CartesianSystem.World(config)).init();
        this.followX = 0;
        this.followY = 0;

        var bounds = this.world.bounds;
        this.scene.cameras.main.setBounds(
            bounds.minX, 
            bounds.minY, 
            bounds.maxX - bounds.minX, 
            bounds.maxY - bounds.minY
        );
    },

    integrate: function(callback)
    {
        var world = this.world;
        var sys = this.systems;

        sys.displayList.removeAll();
        sys.updateList.removeAll();

        sys.updateList.update();

        world.loopProcessList(function(object)
        {
            sys.displayList.add(object);
            sys.updateList.add(object);
        });
        
        callback(this);

        sys.displayList.queueDepthSort();
    },

    setFollow: function(x, y)
    {
        this.followX = x;
        this.followY = y;
    },

    updateWorld: function(callback)
    {
        if(callback === undefined) { callback = NOOP; }

        var world = this.world;

        world.update(this.followX, this.followY);

        world.updateProcessList();
        this.integrate(callback);
        world.resetProcessList();
    },

    initGameObject: function(gameObject)
    {
        var world = this.world;

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
            gameObject.body = {};
        }

        gameObject.on("destroy", function()
        {
            gameObject.bodyConf.destroy();
        });
    },

    removeGameObject: function(gameObject)
    {
        gameObject.bodyConf.updateBoundingBox();
        this.world.cameraGrid.removeReference(gameObject);
        gameObject.bodyConf.updateBoundingBox();
        gameObject.destroy();
    },
   
    removeAllGameObjects: function(callback)
    {
        if(callback === undefined) { callback = function() {}; }

        var world = this.world;

        var gameObjectArrays = world.get.allGameObjects();

        for(var arrayName in gameObjectArrays)
        {
            var gameObjects = gameObjectArrays[arrayName];

            for(var objName in gameObjects)
            {
                var object = gameObjects[objName];

                if(object.ignoreDestroy)
                {
                    this.removeGameObject(object);
                    callback(object);
                }
            }
        }
    },

    shutdown: function()
    {
        this.world = undefined;
    },

    destroy: function()
    {
        this.shutdown();

        this.scene = undefined;
        this.systems = undefined;
    }
};

CartesianSystemPlugin.prototype.constructor = CartesianSystemPlugin;

module.exports = CartesianSystemPlugin;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./CartesianSystemPlugin.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=CartesianSystemPlugin.js.map