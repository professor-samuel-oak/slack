import * as Path from "path";
import * as fs from "fs";

export default class LoaderService {

    public static instance: LoaderService;

    constructor () {
        LoaderService.instance = this;
    }

    public static loadJSON<T>(fileName: string): T {
        let filePath = Path.join("resources", fileName) + ".json";
        let json = JSON.parse (fs.readFileSync(filePath).toString());
        return json;
    }
}