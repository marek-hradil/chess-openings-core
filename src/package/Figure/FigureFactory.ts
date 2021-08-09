import { Bishop } from './Bishop'
import { FigureColor, FigureName } from './Figure'
import { King } from './King'
import { Knight } from './Knight'
import { Pawn } from './Pawn'
import { Queen } from './Queen'
import { Rook } from './Rook'

class FigureFactory {
  private static figures = {
    Pawn,
    Rook,
    Knight,
    Bishop,
    King,
    Queen,
  }

  public static makeFigure(name: FigureName, color: FigureColor, startingPosition: string) {
    const figure = this.figures[name]

    return new figure(color, startingPosition)
  }
}

export default FigureFactory
