import { FigureColor, FigureName } from '../../Figure/Figure';
import { MoveEvent } from '../Rules/MovementRule';
declare class BoardTimeRecord {
    readonly fromPosition: string | null;
    readonly toPosition: string | null;
    readonly color: FigureColor;
    readonly name: FigureName;
    readonly startingPosition: string;
    readonly specials: {
        capture: boolean;
        pawnLongMove: boolean;
        pawnEnPassant: boolean;
        castleLong: boolean;
        castleShort: boolean;
        promotion: FigureName | null;
        disambiguateRow: boolean;
        disambiguateCol: boolean;
    };
    readonly events: MoveEvent[];
    constructor(positions: [from: string | null, to: string | null], figure: {
        color: FigureColor;
        name: FigureName;
        startingPosition: string;
    }, specials: Partial<BoardTimeRecord['specials']>, events: MoveEvent[]);
    equals(record: BoardTimeRecord): boolean;
    serialize(): string;
    private buildFigureSign;
    private buildFromSign;
}
export default BoardTimeRecord;
