import Type from "Models/Pokemon/Type";
import LoaderService from "Services/Loader";
import TypeName from "Enums/TypeName";

export default class TypeService {

    private static types: Type[];

    constructor () {
        TypeService.types = [];
        let rawTypes = LoaderService.loadJSON<Object[]>("types");
        rawTypes.map((rawType) => {
            let type = new Type(rawType);
            TypeService.types.push(type);
        });
    }

    public static getTypes (): Type[] {
        return this.types;
    }

    public static getTypeByID (id: number): Type {
        let type = this.types[id - 1];
        if (typeof type !== "undefined")
            return type;
        return null;
    }

    public static getTypeByName (name: TypeName): Type {
        let value = this.types.find((type) => type.name === name);
        return value === undefined ? null : value;
    }
}