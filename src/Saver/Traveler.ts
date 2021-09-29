export default class Traveler
{
    constructor()
    {
        
    }
    
    private info: any;
    public containsInfo: boolean = false;

    public setInfo(data: any)
    {
        this.info = data;
        this.containsInfo = true;
    }

    public getInfo(): any
    {
        return this.info;
    }

    public saveInfo: any;
}