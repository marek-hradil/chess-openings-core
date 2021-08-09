import { Field } from './BoardField';
import { FigureColor } from '../../Figure/Figure';
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
}
export declare class BoardStatePrototypeFactory {
    static clone(state: BoardState): BoardState;
}
export default BoardState;
