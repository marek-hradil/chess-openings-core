import { Figure, FigureColor } from './Figure'

export class Knight extends Figure {
  constructor(color: FigureColor, startingPosition: string) {
    super('Knight', color, startingPosition)
  }
}
