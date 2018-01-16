import Pokemon from "Models/Pokemon/Pokemon";
import Ailment from "Models/Pokemon/Ailment";
import Stat from "Models/Pokemon/Stat";

export default class PartyPokemon extends Pokemon {

    private ailments: Ailment[];
    private statChanges: Stat[];
    public hasIncreasedCritRate: boolean;
    public level: number;
    public experience: number;

    constructor (partyPokemon: any) {
        super(partyPokemon);
        
        this.hasIncreasedCritRate = partyPokemon.hasIncreasedCritRate;
        this.level = partyPokemon.level;
        this.experience = partyPokemon.experience;

        this.ailments = partyPokemon.ailments.map((ailment) => {
            return new Ailment(ailment); });

        this.statChanges = partyPokemon.statChanges.map((statChange) => {
            return new Stat(statChange); });
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
}