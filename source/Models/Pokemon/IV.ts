import IVName from "Enums/IVName";

export default class IV {

    public name: IVName;
    public value: number;

    constructor (iv: any) {
        if (typeof iv.name === "string") {
            this.name = IVName[iv.name as string];
        }
        else {
            this.name = iv.name;
        }
        this.value = iv.value;
    }
}