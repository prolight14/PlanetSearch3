import IDamage from "./IDamage";

export default class ILifeform
{
    public isLifeform: boolean = true;
    public inWater: boolean;
    public hp: integer;
    public maxHp: integer;
    public damage: integer;
    public takeDamage(object: ILifeform | IDamage, blink?: boolean): any
    {
        
    }
}