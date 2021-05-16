import { Figure, FigureColor } from './Figure'

export class King extends Figure {
  constructor(color: FigureColor) {
    super('King', color)
  }
}
