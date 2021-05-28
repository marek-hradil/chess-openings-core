import { FigureColor } from './Figure/Figure';
export declare class NotationConverter {
    private static rowNotation;
    private static colNotation;
    static toNotation(rowIndex: number, colIndex: number): string | null;
    static fromNotation(notation: string): [rowIndex: number, colIndex: number];
}
export declare class LengthConverter {
    static measureLengthOfMove(from: string, to: string): number;
}
export declare class PositionConverter {
    static topNeighbour(notation: string): string | null;
    static bottomNeighbour(notation: string): string | null;
    static leftNeighbour(notation: string): string | null;
    static rightNeighbour(notation: string): string | null;
    static topLeftNeighbour(notation: string): string | null;
    static topRightNeighbour(notation: string): string | null;
    static bottomLeftNeighbour(notation: string): string | null;
    static bottomRightNeighbour(notation: string): string | null;
    static topLeftKnightNeighbour(notation: string): string | null;
    static topRightKnightNeighbour(notation: string): string | null;
    static leftTopKnightNeighbour(notation: string): string | null;
    static leftBottomKnightNeighbour(notation: string): string | null;
    static bottomLeftKnightNeighbour(notation: string): string | null;
    static bottomRightKnightNeighbour(notation: string): string | null;
    static rightBottomKnightNeighbour(notation: string): string | null;
    static rightTopKnightNeighbour(notation: string): string | null;
    private static useNotation;
}
export declare class IndexConverter {
    static toIndex(x: number, y: number, squareWidth: number, squareHeight: number): [rowIndex: number, colIndex: number];
    static fromIndex(rowIndex: number, colIndex: number, squareWidth: number, squareHeight: number): [x: number, y: number];
}
export declare class ColorConverter {
    static convert(color: FigureColor): "White" | "Black";
}
