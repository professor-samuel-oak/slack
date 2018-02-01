import Move from "Models/Pokemon/Move";
import MoveService from "Services/Move";
import MoveLearnMethodName from "Enums/MoveLearnMethodName";

export default class PokemonMove {

    public move: Move;
    public moveLearnMethod: MoveLearnMethodName;
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
        this.levelLearnedAt = pokemonMove.levelLearnedAt;
        
        if (typeof pokemonMove.moveLearnMethod === "string") {
            this.moveLearnMethod = MoveLearnMethodName[pokemonMove.moveLearnMethod as string];
        }
        else {
            this.moveLearnMethod = pokemonMove.moveLearnMethod;
        }
    }
}