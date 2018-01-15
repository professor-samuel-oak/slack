export default class Stat {

    public name: string;
    public value: number;

    constructor (stat: any) {
        this.name = stat.name;
        this.value = stat.value;
    }
}