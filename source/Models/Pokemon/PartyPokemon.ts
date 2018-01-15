import Pokemon from "Models/Pokemon/Pokemon";
import Ailment from "Models/Pokemon/Ailment";
import Stat from "Models/Pokemon/Stat";
import StatChange from "Models/Pokemon/StatChange";

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

        this.ailments = [];
        partyPokemon.ailments.map((ailment) => {
            this.ailments.push(new Ailment(ailment)); });

        this.statChanges = [];
        partyPokemon.statChanges.map((statChange) => {
            this.statChanges.push(new Stat(statChange)); });
    }

    public getAilments (): Ailment[] {
        return this.ailments;
    }

    public getAilmentByName (name: string): Ailment {
        this.ailments.map((ailment) => {
            if (ailment.name === name) {
                return ailment;
            }
        });
        return null;
    }

    public AddAilment (ailment: Ailment): void {
        this.ailments.map((curAilment) => {
            if (curAilment.name === ailment.name) {
                return;
            }
        });
        this.ailments.push(ailment);
    }

    public RemoveAilmentByName (name: string): void {
        this.ailments.map((curAilment) => {
            if (curAilment.name === name) {
                const index = this.ailments.indexOf(curAilment);
    
                if (index !== -1) {
                    this.ailments.splice(index, 1);
                }
                return;
            }
        });
    }

    public getStatChanges (): Stat[] {
        return this.statChanges;
    }

    public getStatChangeByName (name: string): Stat {
        this.statChanges.map((stat) => {
            if (stat.name === name) {
                return stat;
            }
        });
        return null;
    }

    public AddStatChange (statChange: Stat): void {
        this.statChanges.map((curStatChange) => {
            if (curStatChange.name === statChange.name) {
                curStatChange.value = statChange.value;
                return;
            }
        });
        this.statChanges.push(statChange);
    }

    public RemoveStatChangeByName (name: string): void {
        this.statChanges.map((curStatChange) => {
            if (curStatChange.name === name) {
                const index = this.statChanges.indexOf(curStatChange);
    
                if (index !== -1) {
                    this.statChanges.splice(index, 1);
                }
                return;
            }
        });
    }
}