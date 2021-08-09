import { LinearMovementRule } from './MovementRule'
import { PositionConverter } from '../../Converters'
import BoardState from '../State/BoardState'

export class QueenMovementRule extends LinearMovementRule {
  public canAttackTo(state: BoardState, from: string): string[] {
    return [
      ...this.iterateAttackable(state, from, PositionConverter.topNeighbour),
      ...this.iterateAttackable(state, from, PositionConverter.topLeftNeighbour),
      ...this.iterateAttackable(state, from, PositionConverter.leftNeighbour),
      ...this.iterateAttackable(state, from, PositionConverter.bottomLeftNeighbour),
      ...this.iterateAttackable(state, from, PositionConverter.bottomNeighbour),
      ...this.iterateAttackable(state, from, PositionConverter.bottomRightNeighbour),
      ...this.iterateAttackable(state, from, PositionConverter.rightNeighbour),
      ...this.iterateAttackable(state, from, PositionConverter.topRightNeighbour),
    ]
  }

  public canMoveTo(state: BoardState, from: string): string[] {
    return [
      ...this.iterateMovable(state, from, PositionConverter.topNeighbour),
      ...this.iterateMovable(state, from, PositionConverter.topLeftNeighbour),
      ...this.iterateMovable(state, from, PositionConverter.leftNeighbour),
      ...this.iterateMovable(state, from, PositionConverter.bottomLeftNeighbour),
      ...this.iterateMovable(state, from, PositionConverter.bottomNeighbour),
      ...this.iterateMovable(state, from, PositionConverter.bottomRightNeighbour),
      ...this.iterateMovable(state, from, PositionConverter.rightNeighbour),
      ...this.iterateMovable(state, from, PositionConverter.topRightNeighbour),
    ]
  }
}
