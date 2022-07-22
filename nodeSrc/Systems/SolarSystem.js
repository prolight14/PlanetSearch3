"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var trig_1 = require("../gameObjects/Utils/trig");
var SolarSystem = (function () {
    function SolarSystem(name) {
        this.stars = [];
        this.planets = [];
        this.name = name;
    }
    SolarSystem.prototype.update = function () {
        var star = this.stars[0];
        for (var i = 0; i < this.planets.length; i++) {
            var planet = this.planets[i].object;
            var path = this.planets[i].path;
            path.theta += path.thetaSpeed;
            var theta = path.theta;
            planet.x = star.x + trig_1.default.cos(theta) * path.radius;
            planet.y = star.y + trig_1.default.sin(theta) * path.radius;
            planet.bodyConf.update();
        }
    };
    SolarSystem.prototype.addStars = function (stars) {
        this.stars = this.stars.concat(stars);
    };
    SolarSystem.prototype.addPlanet = function (planet, path) {
        if (path === undefined) {
            path = {
                radius: 6000,
            };
        }
        if (path.radius === undefined) {
            path.radius = 6000;
        }
        path.theta = 0;
        if (path.thetaSpeed === undefined) {
            path.thetaSpeed = 0.0015;
        }
        this.planets.push({
            object: planet,
            path: path,
        });
    };
    SolarSystem.prototype.destroy = function () {
    };
    return SolarSystem;
}());
exports.default = SolarSystem;
//# sourceMappingURL=SolarSystem.js.map