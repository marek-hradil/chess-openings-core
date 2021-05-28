import { MoveEvent } from '../Rules/MovementRule';
import BoardHistory from './BoardHistory';
import BoardTimeConfig from '../Config/BoardTimeConfig';
import BoardTimeRecord from './BoardTimeRecord';
declare class BoardTime {
    private history;
    private plan;
    private listeners;
    constructor(config: BoardTimeConfig);
    getHistory(): BoardHistory;
    buildMove(events: MoveEvent[]): BoardTimeRecord;
    move(move: BoardTimeRecord): void;
    getNextInevitable(): BoardTimeRecord | null;
    isFollowingPlan(plannedMove: BoardTimeRecord): boolean;
}
export default BoardTime;
