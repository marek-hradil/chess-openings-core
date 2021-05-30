import { FigureColor, FigureName } from '../../Figure/Figure';
import BoardTimeRecord from './BoardTimeRecord';
declare class BoardHistory {
    private moves;
    pushMove(move: BoardTimeRecord): void;
    list(): BoardTimeRecord[];
    filter({ color, name, id }: {
        color?: FigureColor;
        name?: FigureName;
        id?: string;
    }): BoardTimeRecord[];
    getLastMove(): BoardTimeRecord | null;
    getMoveCount(): number;
}
export default BoardHistory;
