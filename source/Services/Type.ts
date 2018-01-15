import Type from "Models/Pokemon/Type";
import LoaderService from "Services/Loader";

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

    public static getTypeByName (name: string): Type {
        this.types.map((type) => {
            if (type.name === name) {
                return type;
            }
        });
        return null;
    }
}