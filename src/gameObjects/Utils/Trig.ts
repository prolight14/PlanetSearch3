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
}

export default trig;