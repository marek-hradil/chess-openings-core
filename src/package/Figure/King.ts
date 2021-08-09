import { Figure, FigureColor } from './Figure'

export class King extends Figure {
  constructor(color: FigureColor, startingPosition: string) {
    super('King', color, startingPosition)
  }
}
