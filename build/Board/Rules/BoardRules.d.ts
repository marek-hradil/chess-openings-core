import { FigureColor } from '../../Figure/Figure';
import BoardRulesConfig from '../Config/BoardRulesConfig';
import BoardState from '../State/BoardState';
import BoardTime from '../Time/BoardTime';
declare class BoardRules {
    private listeners;
    private switches;
    private data;
    constructor(config: BoardRulesConfig);
    setup(state: BoardState): void;
    move(from: string, to: string, state: BoardState, time: BoardTime): void;
    moveForwardsInHistory(state: BoardState, time: BoardTime): void;
    moveBackwardsInHistory(state: BoardState, time: BoardTime): void;
    /**
     * Determine where can figure on this field attack to
     */
    getAttackablesForField(from: string, state: BoardState): string[];
    /**
     * Determine where can figure on this field move to
     */
    getMovablesForField(from: string, state: BoardState, time: BoardTime): string[];
    /**
     * Is field attacked
     */
    isAttacked(state: BoardState, position: string, byColor: FigureColor): boolean;
    isCheckmate(state: BoardState, time: BoardTime): boolean;
    private applyEvents;
    private deapplyEvents;
}
export default BoardRules;
