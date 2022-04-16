class trig
{
    public static cos(angle: number): number
    {
        return Math.cos(angle * Phaser.Math.DEG_TO_RAD);
    }
    public static sin(angle: number): number
    {
        return Math.sin(angle * Phaser.Math.DEG_TO_RAD);
    }
    public static tan(angle: number): number
    {
        return Math.sin(angle * Phaser.Math.DEG_TO_RAD);
    }
    public static atan2(y: number, x: number): number
    {
        return Math.atan2(x, y) * Phaser.Math.RAD_TO_DEG;
    }
    public static random(min: number, max: number)
    {
        return Phaser.Math.RND.frac() * (max - min) + min;
    }
}

export default trig;