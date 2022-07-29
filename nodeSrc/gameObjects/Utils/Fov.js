"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fov = (function () {
    function Fov(scene, ship) {
        this.scene = scene;
        this.ship = ship;
    }
    Fov.prototype.look = function (viewAngle, viewRange, fov) {
        var _this = this;
        var objectsInRange = this.getObjectsInRange(viewRange);
        var filteredObjects = [];
        var viewRangeSquared = viewRange * viewRange;
        objectsInRange.forEach(function (gameObject) {
            var dx = gameObject.x - _this.ship.x;
            var dy = gameObject.y - _this.ship.y;
            if (dx * dx + dy * dy < viewRangeSquared) {
                var angleBetween = Phaser.Math.Angle.Reverse(Phaser.Math.Angle.BetweenPoints(gameObject, _this.ship)) * Phaser.Math.RAD_TO_DEG;
                var angleDiff = Phaser.Math.Angle.ShortestBetween(viewAngle, angleBetween);
                if (Math.abs(angleDiff) < fov) {
                    filteredObjects.push({
                        object: gameObject,
                        angleDiff: angleDiff,
                        angleBetween: angleBetween,
                    });
                }
            }
        });
        return filteredObjects;
    };
    Fov.prototype.getObjectsInRange = function (viewRange) {
        var ship = this.ship;
        return this.scene.world.getObjectsInBox(ship.x - viewRange, ship.y - viewRange, ship.x + viewRange, ship.y + viewRange);
    };
    return Fov;
}());
exports.default = Fov;
//# sourceMappingURL=Fov.js.map