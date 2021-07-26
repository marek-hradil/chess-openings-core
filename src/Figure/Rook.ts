import { Figure, FigureColor } from './Figure'

export class Rook extends Figure {
  constructor(color: FigureColor, startingPosition: string) {
    super('Rook', color, startingPosition)
  }
}
