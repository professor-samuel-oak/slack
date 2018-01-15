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

        this.damageModifiers = [];
        type.damageModifiers.map((damageModifier) => {
            this.damageModifiers.push(new DamageModifier(damageModifier));
        });
    }

    public getDamageModifiers (): DamageModifier[] {
        return this.damageModifiers;
    }

    public getDamageModifierAgainstTypeByID (id: number): DamageModifier {
        let match = null;
        this.damageModifiers.map ((damageModifier) => {
            if (damageModifier.typeId === id)
                match = damageModifier;
        });
        return match;
    }

    public getDamageModifierAgainstTypeByName (name: string): DamageModifier {
        let match = null;
        let typeId = TypeService.getTypeByName(name).id;
        this.damageModifiers.map ((damageModifier) => {
            if (damageModifier.typeId === typeId)
                match = damageModifier;
        });
        return match;
    }
}