import Board from '../Board/Board'
import { NotationConverter } from '../Converters'
import { Figure, FigureColor } from './Figure'

export class Knight extends Figure {
  constructor(color: FigureColor) {
    super('Knight', color)
  }
}
