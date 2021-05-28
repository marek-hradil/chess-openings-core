import { SimpleMovementRule } from './MovementRule';
import BoardState from '../State/BoardState';
export declare class KnightMovementRule extends SimpleMovementRule {
    canAttackTo(_: BoardState, from: string): string[];
    canMoveTo(state: BoardState, from: string): string[];
}
