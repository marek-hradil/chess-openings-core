import { FigureColor, FigureName } from '../../Figure/Figure'
import BoardTimeRecord from './BoardTimeRecord'

class BoardHistory {
  private moves: BoardTimeRecord[] = []

  public pushMove(move: BoardTimeRecord) {
    this.moves.push(move)
  }

  public list() {
    return this.moves
  }

  public filter({
    color,
    name,
    startingPosition,
  }: {
    color?: FigureColor
    name?: FigureName
    startingPosition?: string
  }) {
    return this.moves.filter(move => {
      let acceptable = true
      if (startingPosition) {
        acceptable &&= move.startingPosition === startingPosition
      }

      if (name) {
        acceptable &&= move.name === name
      }

      if (color) {
        acceptable &&= move.color === color
      }

      return acceptable
    })
  }

  public getLastMove() {
    return this.moves[this.moves.length - 1] ?? null
  }

  public getMoveCount() {
    return this.moves.length
  }
}

export default BoardHistory
