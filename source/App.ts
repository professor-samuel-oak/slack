import * as rawConfig from "../config.json";
import SlackBotService from "Services/SlackBot";
import MessageService from "Services/Message";
import LoaderService from "Services/Loader";
import MoveService from "Services/Move";
import TypeService from "Services/Type";
import PokemonService from "Services/Pokemon";
import PartyPokemon from "Models/Pokemon/PartyPokemon";
import ActionHelper from "Helpers/Action";

export default class App {

    public static readonly Config: any = rawConfig;

    protected readonly slackBotService: SlackBotService;
    protected readonly messageService: MessageService;
    protected readonly loaderService: LoaderService;
    protected readonly moveService: MoveService;
    protected readonly typeService: TypeService;
    protected readonly pokemonService: PokemonService;

    constructor () {
        this.slackBotService = new SlackBotService ();
        this.messageService = new MessageService ();
        this.loaderService = new LoaderService();

        // Initialize the static data holders
        // It's important pokemon is last in this list
        this.moveService = new MoveService();
        this.typeService = new TypeService();
        this.pokemonService = new PokemonService();

        this.doDemo ();
    }

    private doDemo (): void {
        let pokemonAttack = PokemonService.getPokemonByID (Math.floor(Math.random() * 152))
        let partyPokemonAttack = new PartyPokemon(pokemonAttack);
        let move = pokemonAttack.getRandomMove ();
        let typesAttack = pokemonAttack.getTypes ().map ((type) => type.name);
        console.log ("\x1b[33m%s\x1b[41m%s\x1b[0m\x1b[33m%s\x1b[41m%s\x1b[0m\x1b[33m%s\x1b[0m", "Wow, ", `${pokemonAttack.name} (${typesAttack})`, " has great moves such as ", `${move.move.name}`, "!");

        let pokemonDefense = PokemonService.getPokemonByID (Math.floor(Math.random() * 152));
        let partyPokemoDefense = new PartyPokemon(pokemonDefense);
        let typesDefense = pokemonDefense.getTypes ().map ((type) => type.name);
        let damage = ActionHelper.getMoveDamage(partyPokemonAttack, partyPokemoDefense, move.move, false);
        console.log ("\x1b[33m%s\x1b[41m%s\x1b[0m\x1b[33m%s\x1b[41m%s\x1b[0m\x1b[33m%s\x1b[41m%s\x1b[0m\x1b[33m%s\x1b[41m%s\x1b[0m\x1b[33m%s\x1b[0m", "If ", `${pokemonAttack.name}`, " would use this move against ", `${pokemonDefense.name} (${typesDefense})`, ", ", `${pokemonAttack.name}`, " could do ", `${damage} damage`, "!");
    }
}

// run the app
let app = new App ();