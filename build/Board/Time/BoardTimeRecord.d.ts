import { FigureColor, FigureName } from '../../Figure/Figure';
declare class BoardTimeRecord {
    readonly fromPosition: string | null;
    readonly toPosition: string | null;
    readonly color: FigureColor;
    readonly name: FigureName;
    readonly id: string | null;
    readonly specials: {
        capture: boolean;
        pawnLongMove: boolean;
        pawnEnPassant: boolean;
        castleLong: boolean;
        castleShort: boolean;
        promotion: FigureName | null;
    };
    constructor(positions: [from: string | null, to: string | null], figure: {
        color: FigureColor;
        name: FigureName;
        id: string | null;
    }, specials: Partial<BoardTimeRecord['specials']>);
    equals(record: BoardTimeRecord): boolean;
}
export default BoardTimeRecord;
