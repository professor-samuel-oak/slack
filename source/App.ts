import * as rawConfig from "../config.json";
import SlackBotService from "Services/SlackBot";
import MessageService from "Services/Message";
import LoaderService from "Services/Loader";
import MoveService from "Services/Move";
import TypeService from "Services/Type";
import PokemonService from "Services/Pokemon";
import ActionHelper from "Helpers/Action";
import BattlePokemon from "Models/Pokemon/BattlePokemon";
import TypeName from "Enums/TypeName";
import Pokemon from "Models/Pokemon/Pokemon";
import PokemonMove from "Models/Pokemon/PokemonMove";
import DamageClassName from "Enums/DamageClassName";

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
        let attackingPokemonId = Math.floor(Math.random() * 151) + 1;
        let pokemonAttack = PokemonService.getPokemonByID(attackingPokemonId);
        // Make sure you have a pokemon which has non-status moves to prevent infinite loop in next section.
        while (this.hasOnlyStatusMoves(pokemonAttack)) {
            attackingPokemonId = Math.floor(Math.random() * 151) + 1;
            pokemonAttack = PokemonService.getPokemonByID(attackingPokemonId);
        }
        let battlePokemonAttack = new BattlePokemon(pokemonAttack);

        let move = battlePokemonAttack.getRandomMove();
        // Move is often a status move, which never does damage.
        // to make the demo useful, keep trying until getting a non-status move.
        while (move.move.damageClass === DamageClassName.STATUS) {
            move = battlePokemonAttack.getRandomMove ();
        }
        
        let typesAttack = battlePokemonAttack.getTypes ().map ((type) => TypeName[type.name]);
        console.log("\x1b[33m%s\x1b[41m%s\x1b[0m\x1b[33m%s\x1b[41m%s\x1b[0m\x1b[33m%s\x1b[41m%s\x1b[0m\x1b[33m%s\x1b[0m", "Wow, ", `${battlePokemonAttack.name} (${typesAttack}) (lvl ${battlePokemonAttack.level})`, " has great moves such as ", `${move.move.name} (${TypeName[TypeService.getTypeByID(move.move.typeId).name]})`, " doing ", `${DamageClassName[move.move.damageClass]}`, " damage!");

        let defendingPokemonId = Math.floor(Math.random() * 151) + 1;
        let pokemonDefense = PokemonService.getPokemonByID(defendingPokemonId);
        let battlePokemoDefense = new BattlePokemon(pokemonDefense);
        let typesDefense = pokemonDefense.getTypes().map((type) => TypeName[type.name]);
        let damage = ActionHelper.getMoveDamage(battlePokemonAttack, battlePokemoDefense, move.move, false);
        console.log ("\x1b[33m%s\x1b[41m%s\x1b[0m\x1b[33m%s\x1b[41m%s\x1b[0m\x1b[33m%s\x1b[41m%s\x1b[0m\x1b[33m%s\x1b[41m%s\x1b[0m\x1b[33m%s\x1b[0m", "If ", `${battlePokemonAttack.name}`, " would use this move against ", `${battlePokemoDefense.name} (${typesDefense}) (lvl ${battlePokemonAttack.level})`, ", ", `${battlePokemonAttack.name}`, " could do ", `${damage} damage`, "!");
    }

    private hasOnlyStatusMoves (pokemon: Pokemon): boolean {
        for (const pokemonMove of pokemon.getMoves()) {
            if (pokemonMove.move.damageClass !== DamageClassName.STATUS) {
                return false;
            }
        }

        return true;
    }
}

// run the app
let app = new App ();