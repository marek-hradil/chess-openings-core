import { Figure, FigureColor } from './Figure'

export class Pawn extends Figure {
  constructor(color: FigureColor) {
    super('Pawn', color)
  }
}
