import { FigureVisuals } from './FigureVisuals';
export declare type FigureColor = 'White' | 'Black';
export declare type FigureName = 'King' | 'Queen' | 'Rook' | 'Bishop' | 'Knight' | 'Pawn';
export declare abstract class Figure {
    private readonly id;
    private readonly color;
    private readonly name;
    private readonly visuals;
    constructor(name: FigureName, color: FigureColor);
    getColor(): FigureColor;
    getName(): FigureName;
    getVisuals(): FigureVisuals;
    getId(): string;
}
