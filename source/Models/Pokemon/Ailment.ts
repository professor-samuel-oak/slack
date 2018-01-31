import AilmentName from "Enums/AilmentName";

export default class Ailment {

    public name: AilmentName;
    public remainingTurns: number;
    
    constructor (ailment: any) {
        if (typeof ailment.name === "string") {
            this.name = AilmentName[ailment.name as string];
        }
        else {
            this.name = ailment.name;
        }
        this.remainingTurns = ailment.remainingTurns;
    }
}