import Ailment from "Models/Pokemon/Ailment";
import Stat from "Models/Pokemon/Stat";
import PartyPokemon from "Models/Pokemon/PartyPokemon";
import Pokemon from "Models/Pokemon/Pokemon";
import AilmentName from "Enums/AilmentName";
import StatName from "Enums/StatName";
import IVHelper from "Helpers/IV";
import StatHelper from "Helpers/Stat";

/**
 * Pokemon containing battle-specific statistics.
 */
export default class BattlePokemon extends PartyPokemon {

    protected ailments: Ailment[];
    protected statStage: Stat[];
    public hasIncreasedCritRate: boolean;
    public statusEffect: AilmentName;

    constructor (battlePokemon: any) {
        super(battlePokemon);
        
        if (battlePokemon instanceof PartyPokemon || battlePokemon instanceof Pokemon) {
            this.hasIncreasedCritRate = false;
            this.statusEffect = AilmentName.NONE;
    
            this.ailments = [];
            this.statStage = [];

            this.stats.push(new Stat({ name: StatName.EVASION, value: 100 }));
            this.stats.push(new Stat({ name: StatName.ACCURACY, value: 100 }));
        }
        else {
            this.hasIncreasedCritRate = battlePokemon.hasIncreasedCritRate;
            if (typeof battlePokemon.statusEffect === "string") {
                this.statusEffect = AilmentName[battlePokemon.statusEffect as string];
            }
            else {
                this.statusEffect = battlePokemon.statusEffect;
            }
    
            this.ailments = battlePokemon.ailments.map((ailment) => {
                return new Ailment(ailment); });
    
            this.statStage = battlePokemon.statChanges.map((statChange) => {
                return new Stat(statChange); });
        }
    }

    /**
     * Get all ailments from this pokemon.
     * @returns Array of Ailment objects.
     */
    public getAilments (): Ailment[] {
        return this.ailments;
    }

    /**
     * Get ailment from this pokemon by name.
     * @param name Name of ailment to search for.
     * @returns Ailment object or null if not found.
     */
    public getAilmentByName (name: AilmentName): Ailment {
        let value = this.ailments.find((ailment) => ailment.name === name);
        return value === undefined ? null : value;
    }

    /**
     * Add ailment to pokemon.
     * @param ailment Ailment to add.
     */
    public AddAilment (ailment: Ailment): void {
        let value = this.ailments.find((curAilment) => curAilment.name === ailment.name);
        if (value !== undefined)
            return;
        this.ailments.push(ailment);
    }

    /**
     * Remove ailment from pokemon.
     * @param name Ailment's name to remove.
     */
    public RemoveAilmentByName (name: AilmentName): void {
        this.ailments.forEach((curAilment, index) => {
            if (curAilment.name === name) {
                this.ailments.splice(index, 1);
            }
        });
    }

    /**
     * Get statistic stages from this pokemon.
     * @returns Array of Stat objects.
     */
    public getStatStages (): Stat[] {
        return this.statStage;
    }

    /**
     * Get statistic stage by name from pokemon.
     * @param name Name of statistic to search for.
     * @returns Stat object or null if not found.
     */
    public getStatStageByName (name: StatName): Stat {
        let value = this.statStage.find((stat) => stat.name === name);
        return value === undefined ? null : value;
    }

    /**
     * Add Statistic stage to pokemon or modify existing.
     * @param statChange Statistic to add.
     */
    public AddStatStage (statChange: Stat): void {
        let found = false;
        this.statStage.forEach((curStatChange) => {
            if (curStatChange.name === statChange.name) {
                curStatChange.value = statChange.value;
                found = true;
            }
        });

        if (!found)
            this.statStage.push(statChange);
    }

    /**
     * Remove statistic stage from pokemon.
     * @param name Statistic's name to remove.
     */
    public RemoveStatStageByName (name: StatName): void {
        this.statStage.forEach((curStatChange, index) => {
            if (curStatChange.name === name) {
                this.statStage.splice(index, 1);
            }
        });
    }

    /**
     * Get base statistics from this pokemon.
     * @returns Array of Stat objects.
     */
    public getBaseStats (): Stat[] {
        return this.stats;
    }

    /**
     * Get base statistic by name from pokemon.
     * @param name Name of Statistic to search for.
     * @returns Stat object or null if not found.
     */
    public getBaseStatByName (name: StatName): Stat {
        let value = this.stats.find((stat) => stat.name === name);
        return value === undefined ? null : value;
    }

    /**
     * Get calculated statistics from this pokemon.
     * @returns Array of Stat objects.
     */
    public getStats (): Stat[] {
        return this.stats.map((stat) => {
            stat.value = this.calculateStat(stat);
            return stat;
        });
    }

    /**
     * Get calculated statistic by name from pokemon.
     * @param name Name of Statistic to search for.
     * @returns Stat object or null if not found.
     */
    public getStatByName (name: StatName): Stat {
        let value = this.stats.find((stat) => stat.name === name);
        if (value === undefined)
            return null;
        
        value.value = this.calculateStat(value);
        return value;
    }

    private calculateStat (stat: Stat): number {
        let stageValue = 0;
        let stage = this.getStatStageByName(stat.name);
        if (stage !== null) {
            stageValue = stage.value;
        }
        return StatHelper.calculateStat(stat, stageValue, this.level, this.getIVByName(IVHelper.statNameToIVName(stat.name)).value);
    }
}