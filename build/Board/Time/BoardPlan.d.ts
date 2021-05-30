import { FigureColor } from '../../Figure/Figure';
import BoardTimeRecord from './BoardTimeRecord';
declare class BoardPlan {
    private followablePlan;
    private inevitablePlan;
    constructor(followablePlan?: BoardPlan['followablePlan'], inevitablePlan?: BoardPlan['inevitablePlan']);
    getNextInevitablePlan(color: FigureColor | null, moveCount: number): BoardTimeRecord | null;
    getNextFollowingPlan(color: FigureColor | null, moveCount: number): BoardTimeRecord | null;
    listFollowablePlan(color: FigureColor | null, moveCount: number): BoardTimeRecord[];
    listInevitablePlan(color: FigureColor | null, moveCount: number): BoardTimeRecord[];
    listFollowedPlan(color: FigureColor | null, moveCount: number): BoardTimeRecord[];
}
export default BoardPlan;
