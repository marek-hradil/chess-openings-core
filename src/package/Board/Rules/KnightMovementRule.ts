import { PositionConverter } from '../../Converters'
import { SimpleMovementRule } from './MovementRule'
import BoardState from '../State/BoardState'

export class KnightMovementRule extends SimpleMovementRule {
  public canAttackTo(_: BoardState, from: string): string[] {
    return this.checkAttackable([
      PositionConverter.topLeftKnightNeighbour(from),
      PositionConverter.topRightKnightNeighbour(from),
      PositionConverter.leftTopKnightNeighbour(from),
      PositionConverter.leftBottomKnightNeighbour(from),
      PositionConverter.bottomLeftKnightNeighbour(from),
      PositionConverter.bottomRightKnightNeighbour(from),
      PositionConverter.rightBottomKnightNeighbour(from),
      PositionConverter.rightTopKnightNeighbour(from),
    ])
  }

  public canMoveTo(state: BoardState, from: string): string[] {
    return this.checkMovable(from, state, [
      PositionConverter.topLeftKnightNeighbour(from),
      PositionConverter.topRightKnightNeighbour(from),
      PositionConverter.leftTopKnightNeighbour(from),
      PositionConverter.leftBottomKnightNeighbour(from),
      PositionConverter.bottomLeftKnightNeighbour(from),
      PositionConverter.bottomRightKnightNeighbour(from),
      PositionConverter.rightBottomKnightNeighbour(from),
      PositionConverter.rightTopKnightNeighbour(from),
    ])
  }
}
