import * as rawConfig from "../config.json";
import SlackBotService from "Services/SlackBot";
import MessageService from "Services/Message";
import LoaderService from "Services/Loader";
import MoveService from "Services/Move";
import TypeService from "Services/Type";
import PokemonService from "Services/Pokemon";

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
    }
}

// run the app
let app = new App ();