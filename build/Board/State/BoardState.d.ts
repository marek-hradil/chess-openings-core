import { Field } from './BoardField';
import { Figure, FigureColor, FigureName } from '../../Figure/Figure';
import BoardStateConfig from '../Config/BoardStateConfig';
declare class BoardState {
    private fields;
    constructor(config: BoardStateConfig);
    setFields(fields: Field[][]): void;
    getFields(): Field[][];
    getFieldByNotation(notation: string): Field | null;
    getFieldByIndex(rowIndex: number, colIndex: number): Field | null;
    getSelectedField(): Field | undefined;
    findKing(color: FigureColor): string | null;
    listFigures(name: FigureName, color: FigureColor): [position: string, figure: Figure][];
}
export declare class BoardStatePrototypeFactory {
    static clone(state: BoardState): BoardState;
}
export default BoardState;
