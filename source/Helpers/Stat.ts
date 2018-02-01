import StatName from "Enums/StatName";
import Stat from "Models/Pokemon/Stat";

export default class StatHelper {

    /**
     * Calculates the statistic's actual value.
     * @param stat Statistic to calculate.
     * @param stage Stage of statistic.
     * @param level Level of pokemon.
     * @param IV IV value of statistic.
     * @returns Statistic's actual value.
     */
    public static calculateStat (stat: Stat, stage: number, level: number, IV: number): number {
        let value = Math.floor((stat.value + IV) * 2 * level / 100);
        value += stat.name === StatName.HP ? level + 10 : 5;

        if (stage !== null && stage !== 0) {
            value *= StatHelper.getStageModifier(stat.name, stage);
        }

        return value;
    }

    /**
     * Get the statistic's stage modifier.
     * @param statName Statistic's name.
     * @param stage Statistic's stage.
     * @returns Statistic's stage modifier.
     */
    public static getStageModifier (statName: StatName, stage: number): number {
        let base = 2;
        if (statName === StatName.ACCURACY || statName === StatName.EVASION) {
            base = 3;
        }
        
        if (stage < 0) {
            return base / (base + Math.abs(stage));
        }
        return (base + stage) / base;
    }
}