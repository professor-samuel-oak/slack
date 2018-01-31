import DamageModifier from "Models/Pokemon/DamageModifier";
import TypeService from "Services/Type";
import TypeName from "Enums/TypeName";

export default class Type {

    protected damageModifiers: DamageModifier[];
    public id: number;
    public name: TypeName;

    constructor (type: any) {
        if (typeof type === "number") {
            type = TypeService.getTypeByID(type);
        }
        else if (typeof type === "string") {
            type = TypeService.getTypeByName(TypeName[type as string]);
        }
        else if (!("id" in type)) {
            type = TypeService.getTypeByName(type);
        }

        this.id = type.id;
        if (typeof type.name === "string") {
            this.name = TypeName[type.name as string];
        }
        else {
            this.name = type.name;
        }

        this.damageModifiers = type.damageModifiers.map((damageModifier) => {
            return new DamageModifier(damageModifier);
        });
    }

    /**
     * Get damage modifiers from this pokemon.
     * @returns Array of DamageModifier objects.
     */
    public getDamageModifiers (): DamageModifier[] {
        return this.damageModifiers;
    }

    /**
     * Get damage modifier against type by id from pokemon.
     * @param id Type id of damage modifier to search for.
     * @returns Damagemodifier object or null if not found.
     */
    public getDamageModifierAgainstTypeByID (id: number): DamageModifier {
        let value = this.damageModifiers.find((damageModifier) => damageModifier.typeId === id);
        return value === undefined ? null : value;
    }

    /**
     * Get damage modifier against type by name from pokemon.
     * @param name Type name of damage modifier to search for.
     * @returns Damagemodifier object or null if not found.
     */
    public getDamageModifierAgainstTypeByName (name: TypeName): DamageModifier {
        let typeId = TypeService.getTypeByName(name).id;
        let value = this.damageModifiers.find((damageModifier) => damageModifier.typeId === typeId);
        return value === undefined ? null : value;
    }
}