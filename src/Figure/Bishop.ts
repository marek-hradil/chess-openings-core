import { Figure, FigureColor } from './Figure'

export class Bishop extends Figure {
  constructor(color: FigureColor, startingPosition: string) {
    super('Bishop', color, startingPosition)
  }
}
