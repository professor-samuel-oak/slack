import StatName from "Enums/StatName";
import Stat from "Models/Pokemon/Stat";

export default class StatHelper {

    public static calculateStat (stat: Stat, stage: number, level: number, IV: number): number {
        let value = Math.floor((stat.value + IV) * 2 * level / 100);
        value += stat.name === StatName.HP ? level + 10 : 5;

        if (stage !== null && stage !== 0) {
            value *= StatHelper.getStageModifier(stat.name, stage);
        }

        return value;
    }

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