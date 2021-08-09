import { Figure, FigureColor, FigureName } from '../../Figure/Figure';
import { MovementRule } from '../Rules/MovementRule';
import BoardTimeRecord from '../Time/BoardTimeRecord';
export declare type BoardRulesData = {
    layout?: {
        [position: string]: Figure;
    };
    movements?: {
        [type in FigureName]: MovementRule;
    };
};
export declare type BoardStateData = {
    fieldRows?: number;
    fieldCols?: number;
};
export declare type BoardTimeData = {
    inevitablePlan?: {
        [color in FigureColor]: BoardTimeRecord[];
    };
    followablePlan?: {
        [color in FigureColor]: BoardTimeRecord[];
    };
};
export declare type BoardRendererData = {
    figuresSpritePath?: string;
};
export declare type BoardGeneralData = {
    startAs?: FigureColor;
};
declare type DataConstructor = BoardGeneralData & ((BoardRulesData & {
    type: 'BoardRules';
}) | (BoardStateData & {
    type: 'BoardState';
}) | (BoardTimeData & {
    type: 'BoardTime';
}) | (BoardRendererData & {
    type: 'BoardRenderer';
}) | {
    type: 'BoardGui';
} | never);
interface Data extends Required<BoardRulesData>, Required<BoardStateData>, Required<BoardTimeData>, Required<BoardRendererData> {
}
declare class BoardData implements Data {
    private readonly defaultLayout;
    layout: {
        [position: string]: Figure;
    };
    private readonly defaultMovements;
    movements: {
        King: MovementRule;
        Queen: MovementRule;
        Rook: MovementRule;
        Bishop: MovementRule;
        Knight: MovementRule;
        Pawn: MovementRule;
    };
    fieldRows: number;
    fieldCols: number;
    figuresSpritePath: string;
    inevitablePlan: {
        White: BoardTimeRecord[];
        Black: BoardTimeRecord[];
    };
    followablePlan: {
        White: BoardTimeRecord[];
        Black: BoardTimeRecord[];
    };
    startAs: FigureColor;
    constructor(data: DataConstructor);
}
export default BoardData;
