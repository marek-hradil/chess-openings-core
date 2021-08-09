import { FigureColor, FigureName } from './Figure';
export declare class FigureVisuals {
    private spriteX;
    private spriteY;
    private spriteHeight;
    private spriteWidth;
    constructor(name: FigureName, color: FigureColor);
    serialize(): readonly [number, number, number, number];
    private setSpriteCoordinates;
}
