export default class Effectiveness {

    public typeId: number;
    public effectiveness: number;
    
    constructor (effectiveness: any) {
        this.typeId = effectiveness.typeId;
        this.effectiveness = effectiveness.effectiveness;
    }
}