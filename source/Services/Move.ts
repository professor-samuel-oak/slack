import Move from "Models/Pokemon/Move";
import LoaderService from "Services/Loader";

export default class MoveService {

    private static moves: Move[];

    constructor () {
        MoveService.moves = [];
        let rawMoves = LoaderService.loadJSON<Object[]>("moves");
        rawMoves.map((rawMove) => {
            let move = new Move(rawMove);
            MoveService.moves.push(move);
        });
    }

    public static getMoves (): Move[] {
        return this.moves;
    }

    public static getMoveByID (id: number): Move {
        let move = this.moves[id - 1];
        if (typeof move !== "undefined")
            return move;
        return null;
    }

    public static getMoveByName (name: string): Move {
        this.moves.map((move) => {
            if (move.name === name) {
                return move;
            }
        });
        return null;
    }
}