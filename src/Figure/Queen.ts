import { Figure, FigureColor } from './Figure'

export class Queen extends Figure {
  constructor(color: FigureColor) {
    super('Queen', color)
  }
}
