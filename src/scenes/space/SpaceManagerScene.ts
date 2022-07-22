import Star from "../../gameObjects/space/Sun";
import SolarSystem from "../../Systems/SolarSystem";

export default class spaceManagerScene extends Phaser.Scene
{
    constructor()
    {
        super("spaceManager");
    }

    preload()
    {

    }

    private solarSystems: any[] = [];

    create()
    {
        this.scene.setVisible(false);

        // const world = (this.scene.get("space") as SpaceScene).world;

        // const suns = world.get.gameObjectArray("sun");
        // const planets = world.get.gameObjectArray("planet");

        // this.addSystem(suns[0], planets);

        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () =>
        {
            this.destroySolarSystems();
        });
    }

    public addSystem(name: string, stars: Star[] | Star): SolarSystem
    {     
        const system = new SolarSystem(name);

        if(!Array.isArray(stars))
        {
            stars = [stars];
        }

        system.addStars(stars);

        this.solarSystems.push(system); 

        return system;
    }

    update(time: number, delta: number)
    {
        for(var i = 0; i < this.solarSystems.length; i++)
        {
            const system = this.solarSystems[0];

            system.update();
        }
    }

    public destroySolarSystems()
    {
        for(var i = 0; i < this.solarSystems.length; i++)
        {
            const system = this.solarSystems[0];

            system.destroy();

            this.solarSystems.shift();
        }
    }
} 

