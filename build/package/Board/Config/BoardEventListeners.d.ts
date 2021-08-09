import { FigureColor } from '../../Figure/Figure';
import BoardTimeRecord from '../Time/BoardTimeRecord';
declare type OnPlanViolation = (lastMove: BoardTimeRecord, planLeft: BoardTimeRecord[], planDone: BoardTimeRecord[]) => void;
declare type OnPlanContinuance = (lastMove: BoardTimeRecord, planLeft: BoardTimeRecord[], planDone: BoardTimeRecord[]) => void;
declare type OnEnd = (won?: FigureColor) => void;
declare type OnMove = (lastMove: BoardTimeRecord, playedMoves: BoardTimeRecord[]) => void;
export declare type BoardTimeEventsListeners = {
    onPlanViolation?: OnPlanViolation;
    onPlanContinuance?: OnPlanContinuance;
};
export declare type BoardRulesEventsListeners = {
    onEnd?: OnEnd;
    onMove?: OnMove;
};
declare type EventsListeners = (BoardTimeEventsListeners & {
    type: 'BoardTime';
}) | (BoardRulesEventsListeners & {
    type: 'BoardRules';
}) | never;
declare class BoardEventListeners {
    onPlanContinuance: OnPlanContinuance;
    onPlanViolation: OnPlanViolation;
    onEnd: OnEnd;
    onMove: OnMove;
    constructor(eventListeners: EventsListeners);
}
export default BoardEventListeners;
