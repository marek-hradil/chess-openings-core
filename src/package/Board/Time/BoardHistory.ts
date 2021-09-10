import { FigureColor, FigureName } from '../../Figure/Figure'
import BoardTimeRecord from './BoardTimeRecord'

class BoardHistory {
  private moves: BoardTimeRecord[] = []
  private shift = 0

  public pushMove(move: BoardTimeRecord) {
    this.moves.push(move)
  }

  public list() {
    return this.moves
  }

  public getShift() {
    return this.shift
  }

  public setShift(moveBy: -1 | 1) {
    this.shift += moveBy
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
        acceptable = acceptable && move.startingPosition === startingPosition
      }

      if (name) {
        acceptable = acceptable && move.name === name
      }

      if (color) {
        acceptable = acceptable && move.color === color
      }

      return acceptable
    })
  }

  public getMove(historyShift: number) {
    const index = this.getMoveCount() + historyShift
    if (index < 0) {
      return null
    }

    return this.moves[index] ?? null
  }

  public getLastMove() {
    return this.getMove(-1)
  }

  public getMoveCount() {
    return this.moves.length
  }
}

export default BoardHistory
