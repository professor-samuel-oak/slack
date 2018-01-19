import Pokemon from "Models/Pokemon/Pokemon";
import Effectiveness from "Models/ReturnTypes/Effectiveness";
import Move from "Models/Pokemon/Move";
import PartyPokemon from "Models/Pokemon/PartyPokemon";
import Type from "Models/Pokemon/Type";
import TypeService from "Services/Type";

export default class ActionHelper {

    public static getMoveDamage (pokemonAttacking: PartyPokemon, pokemonDefending: PartyPokemon, move: Move, isCriticalHit: boolean): number {
        // Status moves never do damage.
        if (move.damageClass === "status") {
            return 0;
        }
        
        let targets = 1;
        let weather = 1;
        let badge = 1;
        let random = Math.floor(Math.random() * 1.15) + 0.85;

        // See if it's a critical.
        let critical = isCriticalHit ? 2 : 1;
        
        // Get stab value.
        let stab = 1;
        if (pokemonAttacking.getTypeByID(move.typeId) !== null) {
            stab += 0.5;

            // If has ability "adaptability", add another 0.5
        }
        let typeEffectiveness = ActionHelper.getMoveTypeEffectiveness(move, pokemonDefending).effectiveness;

        // Get burn value.
        let burn = 1;
        if (pokemonAttacking.getAilmentByName("burn") && move.damageClass === "physical") {
            // Check if ability isn't gust and move not facade
            burn = 0.5;
        }
        let other = 1;

        // Get actual modifier.
        let modifier = targets * weather * badge * random * critical * stab * typeEffectiveness * burn * other;

        let level = pokemonAttacking.level;
        let power = move.power;
        let attack = move.damageClass === "physical" ? pokemonAttacking.getStatByName("attack").value : pokemonAttacking.getStatByName("special-attack").value;
        let defense = move.damageClass === "physical" ? pokemonDefending.getStatByName("defense").value : pokemonDefending.getStatByName("special-defense").value;

        // Calculate damage, keeping integer calculations.
        let damage = Math.floor((Math.floor(Math.floor(Math.floor(2 * level / 5 + 2) * power * attack / defense) / 50) + 2) * modifier);

        return damage;
    }

    public static getMoveTypeEffectiveness (move: Move, pokemonDefending: Pokemon): Effectiveness {
        let moveType = TypeService.getTypeByID(move.typeId);
        let pokemonDefendingTypes = pokemonDefending.getTypes();

        let effectiveness = new Effectiveness({typeId: move.typeId, effectiveness: 1});

        pokemonDefendingTypes.forEach ((pokemonDefendingType) => {
            effectiveness.effectiveness *= moveType.getDamageModifierAgainstTypeByID(pokemonDefendingType.id).modifier;
        });
        return effectiveness;
    }

    public static getPokemonTypeEffectiveness (pokemonAttacking: Pokemon, pokemonDefending: Pokemon): Effectiveness[] {
        let pokemonAttackingTypes = pokemonAttacking.getTypes();
        let pokemonDefendingTypes = pokemonDefending.getTypes();

        let effectiveness = pokemonAttackingTypes.map((type) => {
            return new Effectiveness({typeId: type.id, effectiveness: 1});
        });

        pokemonAttackingTypes.map ((pokemonAttackingType, index) => {
            let tempEffectiveness = 1;
            pokemonDefendingTypes.map ((pokemonDefendingType) => {
                tempEffectiveness *= pokemonAttackingType.getDamageModifierAgainstTypeByID(pokemonDefendingType.id).modifier;
            });
            effectiveness[index].effectiveness = tempEffectiveness;
        });
        return effectiveness;
    }

    public static isCritical(pokemon: PartyPokemon, move: Move): boolean {
        let threshold = Math.floor(pokemon.getStatByName("speed").value / 2);
        if (pokemon.hasIncreasedCritRate)
            threshold *= 4;
        if (move.increasedCritRate)
            threshold *= 8;
        
        if (threshold > 1)
            threshold = 1;
        threshold *= 255;

        let randomCritical = Math.floor(Math.random() * 256);
        if (randomCritical < threshold)
            return true;
        return false;
    }
}