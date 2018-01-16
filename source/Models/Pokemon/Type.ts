import DamageModifier from "Models/Pokemon/DamageModifier";
import TypeService from "Services/Type";

export default class Type {

    private damageModifiers: DamageModifier[];
    public id: number;
    public name: string;

    constructor (type: any) {
        if (typeof type === "number") {
            type = TypeService.getTypeByID(type);
        }
        else if (typeof type === "string") {
            type = TypeService.getTypeByName(type);
        }

        this.id = type.id;
        this.name = type.name;

        this.damageModifiers = type.damageModifiers.map((damageModifier) => {
            return new DamageModifier(damageModifier);
        });
    }

    public getDamageModifiers (): DamageModifier[] {
        return this.damageModifiers;
    }

    public getDamageModifierAgainstTypeByID (id: number): DamageModifier {
        let value = this.damageModifiers.find((damageModifier) => damageModifier.typeId === id);
        return value === undefined ? null : value;
    }

    public getDamageModifierAgainstTypeByName (name: string): DamageModifier {
        let typeId = TypeService.getTypeByName(name).id;
        let value = this.damageModifiers.find((damageModifier) => damageModifier.typeId === typeId);
        return value === undefined ? null : value;
    }
}