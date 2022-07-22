import Planet from "../gameObjects/space/Planet";
import SpaceGameObject from "../gameObjects/space/SpaceGameObject";
import Star from "../gameObjects/space/Sun";
import trig from "../gameObjects/Utils/trig";

export default class SolarSystem 
{
    constructor(name: string)
    {
        this.name = name;
    }

    public name: string;

    public update()
    {
        const star: Star = this.stars[0];

        for(var i = 0; i < this.planets.length; i++)
        {
            const planet = this.planets[i].object;
            const path = this.planets[i].path;

            // const theta = trig.atan2(star.y - planet.y, star.x - planet.x);

            // planet.x += 7;//trig.cos(theta) * path.r;
            // planet.y += 5;//trig.sin(theta) * path.r;
            path.theta += path.thetaSpeed;

            const theta = path.theta;
            
            planet.x = star.x + trig.cos(theta) * path.radius;
            planet.y = star.y + trig.sin(theta) * path.radius;

            planet.bodyConf.update();
        }
    }

    private stars: Star[] = [];

    public addStars(stars: Star[])
    {
       this.stars = this.stars.concat(stars);
    }

    private planets: { object: Planet, path: any }[] = [];

    public addPlanet(planet: Planet, path?: any)
    {
        if(path === undefined) 
        {
            path = {
                radius: 6000,
            };
        }

        if(path.radius === undefined)
        {
            path.radius = 6000;
        }

        path.theta = 0;

        if(path.thetaSpeed === undefined)
        {
            path.thetaSpeed = 0.0015;
        }

        this.planets.push({
            object: planet,
            path: path,
        });
    }

    public destroy()
    {

    }
}