import Pokemon from "Models/Pokemon/Pokemon";
import Ailment from "Models/Pokemon/Ailment";
import Stat from "Models/Pokemon/Stat";
import IV from "Models/Pokemon/IV";

export default class PartyPokemon extends Pokemon {

    protected ivs: IV[];
    public level: number;
    public experience: number;

    constructor (partyPokemon: any) {
        super(partyPokemon);
        
        if (partyPokemon instanceof Pokemon) {
            this.level = 1;
            this.experience = 0;
        }
        else {
            this.level = partyPokemon.level;
            this.experience = partyPokemon.experience;
        }

        let attackIV = Math.floor(Math.random() * 16);
        let defenseIV = Math.floor(Math.random() * 16);
        let speedIV = Math.floor(Math.random() * 16);
        let specialIV = Math.floor(Math.random() * 16);
        let healthIV = (attackIV << 3 & 8) +
                       (defenseIV << 2 & 4) +
                       (speedIV << 1 & 2) +
                       (specialIV & 1);

        this.ivs = [];
        this.ivs.push(new IV({name: "attack", value: attackIV}));
        this.ivs.push(new IV({name: "defense", value: defenseIV}));
        this.ivs.push(new IV({name: "speed", value: speedIV}));
        this.ivs.push(new IV({name: "special", value: specialIV}));
        this.ivs.push(new IV({name: "hp", value: healthIV}));
    }

    /**
     * Get IVs from this pokemon.
     * @returns Array of IV objects.
     */
    public getIVs (): IV[] {
        return this.ivs;
    }

    /**
     * Get IV by name from pokemon.
     * @param name Name of IV to search for.
     * @returns IV object or null if not found.
     */
    public getIVByName (name: string): IV {
        if (name.includes("special")) {
            name = "special";
        }

        let value = this.ivs.find((iv) => iv.name === name);
        return value === undefined ? null : value;
    }
}