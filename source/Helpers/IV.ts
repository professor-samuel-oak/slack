import IVName from "Enums/IVName";
import StatName from "Enums/StatName";

export default class IVHelper {

    /**
     * Converts a statistic name to it's matching IV name.
     * @param statName Stat name to convert.
     * @returns Converted IV name.
     */
    public static statNameToIVName (statName: StatName): IVName {
        switch (statName) {
            case StatName.ATTACK: return IVName.ATTACK;
            case StatName.DEFENSE: return IVName.DEFENSE;
            case StatName.HP: return IVName.HP;
            case StatName.SPEED: return IVName.SPEED;
            case StatName.SPECIAL_ATTACK: // OR
            case StatName.SPECIAL_DEFENSE: return IVName.DEFENSE;
            default: return null;
        }
    }
}