import Ability from "Models/Pokemon/Ability";
import PokemonMove from "Models/Pokemon/PokemonMove";
import Type from "Models/Pokemon/Type";
import Stat from "Models/Pokemon/Stat";
import Evolution from "Models/Pokemon/Evolution";
import StatName from "Enums/StatName";
import TypeName from "Enums/TypeName";

export default class Pokemon {

    protected abilities: Ability[];
    protected moves: PokemonMove[];
    protected stats: Stat[];
    protected types: Type[];
    protected evolutions: Evolution[];
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

    /**
     * Get abilities from this pokemon.
     * @returns Array of Ability objects.
     */
    public getAbilities (): Ability[] {
        return this.abilities;
    }

    /**
     * Get moves from this pokemon.
     * @returns Array of PokemonMove objects.
     */
    public getMoves (): PokemonMove[] {
        return this.moves;
    }

    /**
     * Get move by id from pokemon.
     * @param id Id of move to search for.
     * @returns PokemonMove object or null if not found.
     */
    public getMoveByID (id: number): PokemonMove {
        let value = this.moves.find((pokemonMove) => pokemonMove.move.id === id);
        return value === undefined ? null : value;
    }

    /**
     * Get move by name from pokemon.
     * @param name Name of move to search for.
     * @returns PokemonMove object or null if not found.
     */
    public getMoveByName (name: string): PokemonMove {
        let value = this.moves.find((pokemonMove) => pokemonMove.move.name === name);
        return value === undefined ? null : value;
    }
    
    /**
     * Get random move from this pokemon.
     * @returns PokemonMove object.
     */
    public getRandomMove (): PokemonMove {
        return this.moves [Math.floor (Math.random () * this.moves.length)];
    }

    /**
     * Get base statistics from this pokemon.
     * @returns Array of Stat objects.
     */
    public getStats (): Stat[] {
        return this.stats;
    }

    /**
     * Get statistic by name from pokemon.
     * @param name Name of statistic to search for.
     * @returns Stat object or null if not found.
     */
    public getStatByName (name: StatName): Stat {
        let value = this.stats.find((stat) => stat.name === name);
        return value === undefined ? null : value;
    }

    /**
     * Get Types from this pokemon.
     * @returns Array of Type objects.
     */
    public getTypes (): Type[] {
        return this.types;
    }

    /**
     * Get type by id from pokemon.
     * @param id Id of type to search for.
     * @returns Type object or null if not found.
     */
    public getTypeByID (id: number): Type {
        let value = this.types.find((type) => type.id === id);
        return value === undefined ? null : value;
    }

    /**
     * Get type by name from pokemon.
     * @param name Name of type to search for.
     * @returns Type object or null if not found.
     */
    public getTypesByName (name: TypeName): Type {
        let value = this.types.find((type) => type.name === name);
        return value === undefined ? null : value;
    }

    /**
     * Get evolutions from this pokemon.
     * @returns Array of Evolution objects.
     */
    public getEvolutions (): Evolution[] {
        return this.evolutions;
    }
}