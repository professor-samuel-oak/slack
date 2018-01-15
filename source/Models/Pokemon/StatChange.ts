export default class StatChange {

    public statName: string;
    public change: number;
    
    constructor (statChange: any) {
        this.statName = statChange.statName;
        this.change = statChange.change;
    }
}