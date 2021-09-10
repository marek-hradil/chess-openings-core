import { FigureColor, FigureName } from '../../Figure/Figure';
import BoardTimeRecord from './BoardTimeRecord';
declare class BoardHistory {
    private moves;
    private shift;
    pushMove(move: BoardTimeRecord): void;
    list(): BoardTimeRecord[];
    getShift(): number;
    setShift(moveBy: -1 | 1): void;
    filter({ color, name, startingPosition, }: {
        color?: FigureColor;
        name?: FigureName;
        startingPosition?: string;
    }): BoardTimeRecord[];
    getMove(historyShift: number): BoardTimeRecord | null;
    getLastMove(): BoardTimeRecord | null;
    getMoveCount(): number;
}
export default BoardHistory;
