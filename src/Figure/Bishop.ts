import { Figure, FigureColor } from './Figure'

export class Bishop extends Figure {
  constructor(color: FigureColor) {
    super('Bishop', color)
  }
}
