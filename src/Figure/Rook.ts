import { Figure, FigureColor } from './Figure'

export class Rook extends Figure {
  constructor(color: FigureColor) {
    super('Rook', color)
  }
}
