import { LinearMovementRule } from './MovementRule';
import BoardState from '../State/BoardState';
export declare class RookMovementRule extends LinearMovementRule {
    canAttackTo(state: BoardState, from: string): string[];
    canMoveTo(state: BoardState, from: string): string[];
}
