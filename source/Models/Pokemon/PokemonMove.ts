import Move from "Models/Pokemon/Move";
import MoveService from "Services/Move";

export default class PokemonMove {

    public move: Move;
    public moveLearnMethod: string;
    public levelLearnedAt: number;

    constructor (pokemonMove: any) {
        if (pokemonMove.move === undefined) {
            if (pokemonMove.moveId === undefined) {
                this.move = null;
            }
            else {
                this.move = MoveService.getMoveByID(pokemonMove.moveId);
            }
        }
        else {
            this.move = pokemonMove.move;
        }
        this.moveLearnMethod = pokemonMove.moveLearnMethod;
        this.levelLearnedAt = pokemonMove.levelLearnedAt;
    }
}