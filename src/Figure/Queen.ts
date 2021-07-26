import { Figure, FigureColor } from './Figure'

export class Queen extends Figure {
  constructor(color: FigureColor, startingPosition: string) {
    super('Queen', color, startingPosition)
  }
}
