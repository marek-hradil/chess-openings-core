import { SimpleMovementRule } from './MovementRule';
import BoardHistory from '../Time/BoardHistory';
import BoardRules from './BoardRules';
import BoardState from '../State/BoardState';
export declare class KingMovementRule extends SimpleMovementRule {
    make(state: BoardState, from: string, to: string): ({
        from: string;
        to: null;
        figure: import("../../Figure/Figure").Figure;
    } | {
        from: string;
        to: string;
        figure: import("../../Figure/Figure").Figure;
    })[];
    canAttackTo(_: BoardState, from: string): string[];
    canMoveTo(state: BoardState, from: string, history: BoardHistory, rules: BoardRules): string[];
}
