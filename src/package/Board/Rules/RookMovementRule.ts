import { LinearMovementRule } from './MovementRule'
import { PositionConverter } from '../../Converters'
import BoardState from '../State/BoardState'

export class RookMovementRule extends LinearMovementRule {
  public canAttackTo(state: BoardState, from: string): string[] {
    return [
      ...this.iterateAttackable(state, from, PositionConverter.topNeighbour),
      ...this.iterateAttackable(state, from, PositionConverter.leftNeighbour),
      ...this.iterateAttackable(state, from, PositionConverter.bottomNeighbour),
      ...this.iterateAttackable(state, from, PositionConverter.rightNeighbour),
    ]
  }

  public canMoveTo(state: BoardState, from: string): string[] {
    return [
      ...this.iterateMovable(state, from, PositionConverter.topNeighbour),
      ...this.iterateMovable(state, from, PositionConverter.leftNeighbour),
      ...this.iterateMovable(state, from, PositionConverter.rightNeighbour),
      ...this.iterateMovable(state, from, PositionConverter.bottomNeighbour),
    ]
  }
}
