import { Queen } from '../../Figure/Queen';
import { SimpleMovementRule } from './MovementRule';
import BoardHistory from '../Time/BoardHistory';
import BoardState from '../State/BoardState';
export declare class PawnMovementRule extends SimpleMovementRule {
    make(state: BoardState, from: string, to: string): ({
        from: string;
        to: null;
        figure: import("../../Figure/Figure").Figure;
    } | {
        from: null;
        to: string;
        figure: Queen;
    })[] | ({
        from: string;
        to: null;
        figure: import("../../Figure/Figure").Figure;
    } | {
        from: string;
        to: string;
        figure: import("../../Figure/Figure").Figure;
    })[];
    canAttackTo(state: BoardState, from: string): string[];
    canMoveTo(state: BoardState, from: string, history: BoardHistory): string[];
}
