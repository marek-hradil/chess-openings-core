import { Figure } from '../../Figure/Figure';
import BoardHistory from '../Time/BoardHistory';
import BoardRules from './BoardRules';
import BoardState from '../State/BoardState';
export declare enum MovementRuleType {
    Linear = "Linear",
    Simple = "Simple"
}
export declare type MoveEvent = {
    from: string | null;
    to: string | null;
    figure: Figure;
};
export declare abstract class MovementRule {
    protected abstract type: MovementRuleType;
    make(state: BoardState, from: string, to: string): MoveEvent[];
    abstract canAttackTo(state: BoardState, from: string): string[];
    abstract canMoveTo(state: BoardState, from: string, history: BoardHistory, rules: BoardRules): string[];
}
export declare abstract class SimpleMovementRule extends MovementRule {
    protected type: MovementRuleType;
    protected checkAttackable(positions: Array<string | null>): string[];
    protected checkMovable(from: string, state: BoardState, positions: Array<string | null>): string[];
}
export declare abstract class LinearMovementRule extends MovementRule {
    protected type: MovementRuleType;
    protected iterateMovable(state: BoardState, start: string, nextPosition: (position: string) => string | null): string[];
    protected iterateAttackable(state: BoardState, start: string, nextPosition: (position: string) => string | null): string[];
}
