import { Bishop } from './Bishop';
import { FigureColor, FigureName } from './Figure';
import { King } from './King';
import { Knight } from './Knight';
import { Pawn } from './Pawn';
import { Queen } from './Queen';
import { Rook } from './Rook';
declare class FigureFactory {
    private static figures;
    static makeFigure(name: FigureName, color: FigureColor, startingPosition: string): Bishop | King | Knight | Pawn | Queen | Rook;
}
export default FigureFactory;
