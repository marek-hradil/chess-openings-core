import { FigureColor, FigureName } from '../../Figure/Figure';
import BoardTimeRecord from './BoardTimeRecord';
declare class BoardHistory {
    private moves;
    pushMove(move: BoardTimeRecord): void;
    list(): BoardTimeRecord[];
    filter({ color, name, startingPosition, }: {
        color?: FigureColor;
        name?: FigureName;
        startingPosition?: string;
    }): BoardTimeRecord[];
    getLastMove(): BoardTimeRecord | null;
    getMoveCount(): number;
}
export default BoardHistory;
