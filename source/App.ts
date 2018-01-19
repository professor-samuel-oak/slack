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

        this.doDamageDemo ();
    }

    private doDamageDemo (): void {
        let pokemonAttack = PokemonService.getPokemonByID (Math.floor(Math.random() * 152))
        let partyPokemonAttack = new PartyPokemon(pokemonAttack);
        let move = partyPokemonAttack.getRandomMove ();
        // Move is often a status move, which never does damage.
        // to make the demo useful, keep trying until getting a non-status move.
        while (move.move.damageClass === "status") {
            move = partyPokemonAttack.getRandomMove ();
        }
        let typesAttack = partyPokemonAttack.getTypes ().map ((type) => type.name);
        console.log ("\x1b[33m%s\x1b[41m%s\x1b[0m\x1b[33m%s\x1b[41m%s\x1b[0m\x1b[33m%s\x1b[0m", "Wow, ", `${partyPokemonAttack.name} (${typesAttack}) (lvl ${partyPokemonAttack.level})`, " has great moves such as ", `${move.move.name} (${move.move.damageClass})`, "!");

        let pokemonDefense = PokemonService.getPokemonByID (Math.floor(Math.random() * 152));
        let partyPokemoDefense = new PartyPokemon(pokemonDefense);
        let typesDefense = pokemonDefense.getTypes ().map ((type) => type.name);
        let damage = ActionHelper.getMoveDamage(partyPokemonAttack, partyPokemoDefense, move.move, false);
        console.log ("\x1b[33m%s\x1b[41m%s\x1b[0m\x1b[33m%s\x1b[41m%s\x1b[0m\x1b[33m%s\x1b[41m%s\x1b[0m\x1b[33m%s\x1b[41m%s\x1b[0m\x1b[33m%s\x1b[0m", "If ", `${partyPokemonAttack.name}`, " would use this move against ", `${partyPokemoDefense.name} (${typesDefense}) (lvl ${partyPokemonAttack.level})`, ", ", `${partyPokemonAttack.name}`, " could do ", `${damage} damage`, "!");
    }
}

// run the app
let app = new App ();