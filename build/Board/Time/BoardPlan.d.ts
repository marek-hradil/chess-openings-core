import { FigureColor } from '../../Figure/Figure';
import BoardTimeRecord from './BoardTimeRecord';
declare class BoardPlan {
    private followablePlan;
    private inevitablePlan;
    constructor(followablePlan?: BoardPlan['followablePlan'], inevitablePlan?: BoardPlan['inevitablePlan']);
    getNextInevitablePlan(moveColor: FigureColor | null, moveCount: number): BoardTimeRecord | null;
    getNextFollowingPlan(moveColor: FigureColor | null, moveCount: number): BoardTimeRecord | null;
}
export default BoardPlan;
