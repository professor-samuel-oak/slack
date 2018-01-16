import Ability from "Models/Pokemon/Ability";
import PokemonMove from "Models/Pokemon/PokemonMove";
import Type from "Models/Pokemon/Type";
import Stat from "Models/Pokemon/Stat";
import Evolution from "Models/Pokemon/Evolution";

export default class Pokemon {

    private abilities: Ability[];
    private moves: PokemonMove[];
    private stats: Stat[];
    private types: Type[];
    private evolutions: Evolution[];
    public id: number;
    public name: string;
    public baseExperience: number;

    constructor (pokemon: any) {
        this.id = pokemon.id;
        this.name = `${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}`;
        this.baseExperience = pokemon.baseExperience;

        this.abilities = pokemon.abilities.map((ability) => {
            return new Ability(ability); });

        this.moves = pokemon.moves.map ((move) => {
            return new PokemonMove (move); });

        this.stats = pokemon.stats.map ((stat) => {
            return new Stat (stat); });

        this.types = pokemon.types.map ((type) => {
            return new Type(type); });

        this.evolutions = [];
        this.evolutions = pokemon.evolutions.map((evolution) => {
            return new Evolution(evolution); });
    }

    public getAbilities (): Ability[] {
        return this.abilities;
    }

    public getMoves (): PokemonMove[] {
        return this.moves;
    }

    public getMoveByID (id: number): PokemonMove {
        let value = this.moves.find((pokemonMove) => pokemonMove.move.id === id);
        return value === undefined ? null : value;
    }

    public getMoveByName (name: string): PokemonMove {
        let value = this.moves.find((pokemonMove) => pokemonMove.move.name === name);
        return value === undefined ? null : value;
    }
    
    public getRandomMove (): PokemonMove {
        return this.moves [Math.floor (Math.random () * this.moves.length)];
    }

    public getStats (): Stat[] {
        return this.stats;
    }

    public getStatByName (name: string): Stat {
        let value = this.stats.find((stat) => stat.name === name);
        return value === undefined ? null : value;
    }

    public getTypes (): Type[] {
        return this.types;
    }

    public getTypeByID (id: number): Type {
        let value = this.types.find((type) => type.id === id);
        return value === undefined ? null : value;
    }

    public getTypesByName (name: string): Type {
        let value = this.types.find((type) => type.name === name);
        return value === undefined ? null : value;
    }

    public getEvolutions (): Evolution[] {
        return this.evolutions;
    }
}