import Beaker from "./Beaker";

export default class GreenBeaker extends Beaker
{
    constructor(scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y, "GreenBeaker", 0);

        this.anims.create({
            key: "left",
            frames: [{ key: "GreenBeaker", frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: "right",
            frames: [{ key: "GreenBeaker", frame: 1 }],
            frameRate: 20
        });
        this.anims.create({
            key: "idle",
            frames: [{ key: "GreenBeaker", frame: 2 }],
            frameRate: 20
        });
        this.anims.create({
            key: "leftSmall",
            frames: [{ key: "GreenBeaker", frame: 3 }],
            frameRate: 20
        });
        this.anims.create({
            key: "rightSmall",
            frames: [{ key: "GreenBeaker", frame: 4 }],
            frameRate: 20
        });
        this.anims.create({
            key: "idleSmall",
            frames: [{ key: "GreenBeaker", frame: 5 }],
            frameRate: 20
        });
    }

    public preUpdate(time: number, delta: number)
    {
        super.preUpdate(time, delta);

        if(this.hp < 2)
        {
            this.setScale(1, 0.5);
            this.displayHeight *= 2;

            if(this.controls.left())
            {
                this.anims.play("leftSmall");
            }
            if(this.controls.right())
            {
                this.anims.play("rightSmall");
            }
            if(!this.controls.left() && !this.controls.right())
            {
                this.anims.play("idleSmall");
            }
        }
        else
        {
            if(this.controls.left())
            {
                this.anims.play("left");
            }
            if(this.controls.right())
            {
                this.anims.play("right");
            }
            if(!this.controls.left() && !this.controls.right())
            {
                this.anims.play("idle");
            }
        }
    }
}