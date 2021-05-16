import { PositionConverter } from '../../Converters'
import BoardState from '../State/BoardState'
import { LinearMovementRule } from './MovementRule'

export class BishopMovementRule extends LinearMovementRule {
  public canAttackTo(state: BoardState, from: string): string[] {
    return [
      ...this.iterateAttackable(state, from, PositionConverter.topLeftNeighbour),
      ...this.iterateAttackable(state, from, PositionConverter.topRightNeighbour),
      ...this.iterateAttackable(state, from, PositionConverter.bottomLeftNeighbour),
      ...this.iterateAttackable(state, from, PositionConverter.bottomRightNeighbour),
    ]
  }

  public canMoveTo(state: BoardState, from: string): string[] {
    return [
      ...this.iterateMovable(state, from, PositionConverter.topLeftNeighbour),
      ...this.iterateMovable(state, from, PositionConverter.topRightNeighbour),
      ...this.iterateMovable(state, from, PositionConverter.bottomLeftNeighbour),
      ...this.iterateMovable(state, from, PositionConverter.bottomRightNeighbour),
    ]
  }
}
