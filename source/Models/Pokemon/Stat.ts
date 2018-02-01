import StatName from "Enums/StatName";

export default class Stat {

    public name: StatName;
    public value: number;

    constructor (stat: any) {
        if (typeof stat.name === "string") {
            this.name = StatName[stat.name as string];
        }
        else {
            this.name = stat.name;
        }
        this.value = stat.value;
    }
}