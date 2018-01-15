export default class DamageModifier {

    public typeId: number;
    public modifier: number;

    constructor (damageModifier: any) {
        this.typeId = damageModifier.typeId;
        this.modifier = damageModifier.modifier;
    }
}