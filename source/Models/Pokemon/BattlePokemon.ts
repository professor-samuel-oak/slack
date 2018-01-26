import Ailment from "Models/Pokemon/Ailment";
import Stat from "Models/Pokemon/Stat";
import PartyPokemon from "Models/Pokemon/PartyPokemon";
import Pokemon from "Models/Pokemon/Pokemon";

export default class BattlePokemon extends PartyPokemon {

    protected ailments: Ailment[];
    protected statChanges: Stat[];
    public hasIncreasedCritRate: boolean;
    public statusEffect: string;

    constructor (battlePokemon: any) {
        super(battlePokemon);
        
        if (battlePokemon instanceof PartyPokemon || battlePokemon instanceof Pokemon) {
            this.hasIncreasedCritRate = false;
            this.statusEffect = "";
    
            this.ailments = [];
            this.statChanges = [];
        }
        else {
            this.hasIncreasedCritRate = battlePokemon.hasIncreasedCritRate;
            this.statusEffect = battlePokemon.statusEffect;
    
            this.ailments = battlePokemon.ailments.map((ailment) => {
                return new Ailment(ailment); });
    
            this.statChanges = battlePokemon.statChanges.map((statChange) => {
                return new Stat(statChange); });
        }
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