import { MoveEvent } from '../Rules/MovementRule';
import BoardHistory from './BoardHistory';
import BoardTimeConfig from '../Config/BoardTimeConfig';
import BoardTimeEventConverter from './BoardTimeEventConverter';
import BoardTimeRecord from './BoardTimeRecord';
declare class BoardTime {
    private history;
    private plan;
    private listeners;
    private data;
    constructor(config: BoardTimeConfig);
    getHistory(): BoardHistory;
    buildMove(events: MoveEvent[], details: Parameters<typeof BoardTimeEventConverter.convertMoveEventsToRecord>[1]): BoardTimeRecord;
    move(move: BoardTimeRecord): void;
    getColorToPlay(): import("../../Figure/Figure").FigureColor;
    getNextInevitable(): BoardTimeRecord | null;
    isFollowingPlan(plannedMove: BoardTimeRecord): boolean;
}
export default BoardTime;
