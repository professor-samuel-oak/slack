import Pokemon from "Models/Pokemon/Pokemon";
import LoaderService from "Services/Loader";

export default class PokemonService {

    private static pokemons: Pokemon[];

    constructor () {
        PokemonService.pokemons = [];
        let rawPokemons = LoaderService.loadJSON<Object[]>("pokemon");
        rawPokemons.map((rawPokemon) => {
            let pokemon = new Pokemon(rawPokemon);
            PokemonService.pokemons.push(pokemon);
        });
    }

    public static getPokemons (): Pokemon[] {
        return this.pokemons;
    }

    public static getPokemonByID (id: number): Pokemon {
        let pokemon = this.pokemons[id - 1];
        if (typeof pokemon !== "undefined")
            return pokemon;
        return null;
    }

    public static getPokemonByName (name: string): Pokemon {
        let value = this.pokemons.find((pokemon) => pokemon.name === name);
        return value === undefined ? null : value;
    }

    public static getRandomPokemon (): Pokemon {
        return this.pokemons[Math.floor (Math.random () * this.pokemons.length)];
    }
}