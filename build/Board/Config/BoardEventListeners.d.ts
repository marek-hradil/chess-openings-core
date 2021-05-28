import { FigureColor } from '../../Figure/Figure';
import BoardTimeRecord from '../Time/BoardTimeRecord';
declare type OnPlanViolation = (lastMove: BoardTimeRecord, shouldBeMove: BoardTimeRecord) => void;
declare type OnPlanContinuance = (lastMove: BoardTimeRecord) => void;
declare type OnEnd = (won?: FigureColor) => void;
export declare type BoardTimeEventsListeners = {
    onPlanViolation?: OnPlanViolation;
    onPlanContinuance?: OnPlanContinuance;
};
export declare type BoardRulesEventsListeners = {
    onEnd?: OnEnd;
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
    constructor(eventListeners: EventsListeners);
}
export default BoardEventListeners;
