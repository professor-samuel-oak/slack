import IVName from "Enums/IVName";
import StatName from "Enums/StatName";

export default class IVService {

    public static StatNameToIVName (statName: StatName): IVName {
        switch (statName) {
            case StatName.ATTACK: return IVName.ATTACK;
            case StatName.DEFENSE: return IVName.DEFENSE;
            case StatName.HP: return IVName.HP;
            case StatName.SPEED: return IVName.SPEED;
            case StatName.SPECIAL: return IVName.SPECIAL;
            default: return null;
        }
    }
}