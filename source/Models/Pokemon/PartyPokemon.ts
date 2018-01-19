import Pokemon from "Models/Pokemon/Pokemon";
import Ailment from "Models/Pokemon/Ailment";
import Stat from "Models/Pokemon/Stat";
import IV from "Models/Pokemon/IV";

export default class PartyPokemon extends Pokemon {

    protected ailments: Ailment[];
    protected ivs: IV[];
    protected statChanges: Stat[];
    public hasIncreasedCritRate: boolean;
    public level: number;
    public experience: number;

    constructor (partyPokemon: any) {
        super(partyPokemon);
        
        if (partyPokemon instanceof Pokemon) {
            this.hasIncreasedCritRate = false;
            this.level = 1;
            this.experience = 0;
    
            this.ailments = [];
    
            this.statChanges = [];
        }
        else {
            this.hasIncreasedCritRate = partyPokemon.hasIncreasedCritRate;
            this.level = partyPokemon.level;
            this.experience = partyPokemon.experience;
    
            this.ailments = partyPokemon.ailments.map((ailment) => {
                return new Ailment(ailment); });
    
            this.statChanges = partyPokemon.statChanges.map((statChange) => {
                return new Stat(statChange); });
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

    public getAilments (): Ailment[] {
        return this.ailments;
    }

    public getAilmentByName (name: string): Ailment {
        let value = this.ailments.find((ailment) => ailment.name === name);
        return value === undefined ? null : value;
    }

    public AddAilment (ailment: Ailment): void {
        let value = this.ailments.find((curAilment) => curAilment.name === ailment.name);
        if (value !== undefined)
            return;
        this.ailments.push(ailment);
    }

    public RemoveAilmentByName (name: string): void {
        this.ailments.forEach((curAilment, index) => {
            if (curAilment.name === name) {
                this.ailments.splice(index, 1);
            }
        });
    }

    public getStatChanges (): Stat[] {
        return this.statChanges;
    }

    public getStatChangeByName (name: string): Stat {
        let value = this.statChanges.find((stat) => stat.name === name);
        return value === undefined ? null : value;
    }

    public AddStatChange (statChange: Stat): void {
        let found = false;
        this.statChanges.forEach((curStatChange) => {
            if (curStatChange.name === statChange.name) {
                curStatChange.value = statChange.value;
                found = true;
            }
        });

        if (!found)
            this.statChanges.push(statChange);
    }

    public RemoveStatChangeByName (name: string): void {
        this.statChanges.forEach((curStatChange, index) => {
            if (curStatChange.name === name) {
                this.statChanges.splice(index, 1);
            }
        });
    }

    public getIVs (): IV[] {
        return this.ivs;
    }

    public getIVByName (name: string): IV {
        if (name.includes("special")) {
            name = "special";
        }

        let value = this.ivs.find((iv) => iv.name === name);
        return value === undefined ? null : value;
    }

    public getBaseStats (): Stat[] {
        return this.stats;
    }

    public getBaseStatByName (name: string): Stat {
        let value = this.stats.find((stat) => stat.name === name);
        return value === undefined ? null : value;
    }

    public getStats (): Stat[] {
        return this.stats.map((stat) => {
            stat.value = this.calculateStat(stat);
            return stat;
        });
    }

    public getStatByName (name: string): Stat {
        let value = this.stats.find((stat) => stat.name === name);
        if (value === undefined)
            return null;
        
        value.value = this.calculateStat(value);
        return value;
    }

    private calculateStat(stat: Stat): number {
        let value = Math.floor((stat.value + this.getIVByName(stat.name).value) * 2 * this.level / 100);
        value += stat.name === "hp" ? this.level + 10 : 5;

        let statChange = this.getStatChangeByName(stat.name);
        if (statChange !== null) {
            value += statChange.value;
        }

        return value;
    }
}