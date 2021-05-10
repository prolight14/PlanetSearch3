export default interface ISceneGroupHead
{
    sleepScenes(calledByEntryScene?: boolean): void;
    runScenes(calledByEntryScene?: boolean): void;
}