import { Figure, FigureColor } from './Figure'

export class Pawn extends Figure {
  constructor(color: FigureColor, startingPosition: string) {
    super('Pawn', color, startingPosition)
  }
}
