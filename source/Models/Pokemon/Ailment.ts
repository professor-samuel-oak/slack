export default class Ailment {

    public name: string;
    public remainingTurns: number;
    
    constructor (ailment: any) {
        this.name = ailment.name;
        this.remainingTurns = ailment.remainingTurns;
    }
}