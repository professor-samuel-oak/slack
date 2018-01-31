import Stat from "Models/Pokemon/Stat";

export default class Move {

    protected statChanges: Stat[];
    public id: number;
    public name: string;
    public typeId: number;
    public accuracy: number;
    public effectChance: number;
    public pp: number;
    public priority: number;
    public power: number;
    public damageClass: string;
    public target: string;
    public effect: string;
    public ailment: string;
    public minHits: number;
    public maxHits: number;
    public minTurns: number;
    public maxTurns: number;
    public drain: number;
    public healing: number;
    public increasedCritRate: boolean;
    public increasesCritRate: boolean;
    public flinchChance: number;
    public chargeTime: number;

    constructor (move: any) {
        this.id = move.id;
        this.name = move.name;
        this.typeId = move.typeId;
        this.accuracy = move.accuracy;
        this.effectChance = move.effectChance;
        this.pp = move.pp;
        this.priority = move.priority;
        this.power = move.power;
        this.damageClass = move.damageClass;
        this.target = move.target;
        this.effect = move.effect;
        this.ailment = move.ailment;
        this.minHits = move.minHits;
        this.maxHits = move.maxHits;
        this.minTurns = move.minTurns;
        this.maxTurns = move.maxTurns;
        this.drain = move.drain;
        this.healing = move.healing;
        this.increasedCritRate = move.increasedCritRate;
        this.increasesCritRate = move.increasesCritRate;
        this.flinchChance = move.flinchChance;
        this.chargeTime = move.chargeTime;

        this.statChanges = move.statChanges.map((statChange) => {
            return new Stat(statChange); });
    }

    /**
     * Get statistic changes caused to target by this move.
     * @returns Array of Stat objects.
     */
    public getStatChanges (): Stat[] {
        return this.statChanges;
    }
}