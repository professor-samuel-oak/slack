export default class Evolution {

    public pokemonId: number;
    public requiredLevel: number;
    
    constructor (evolution: any) {
        this.pokemonId = evolution.pokemonId;
        this.requiredLevel = evolution.requiredLevel;
    }
}