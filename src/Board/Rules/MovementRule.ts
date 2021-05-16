import { Figure } from '../../Figure/Figure'
import BoardState from '../State/BoardState'
import BoardHistory from '../Time/BoardHistory'
import BoardRules from './BoardRules'

export enum MovementRuleType {
  Linear = 'Linear',
  Simple = 'Simple',
}

export type MoveEvent = {
  from: string | null
  to: string | null
  figure: Figure
}

export abstract class MovementRule {
  protected abstract type: MovementRuleType
  public make(state: BoardState, from: string, to: string): MoveEvent[] {
    const figure = state.getFieldByNotation(from).getFigure()
    const attackedFigure = state.getFieldByNotation(to).getFigure()

    if (!figure) {
      return []
    }

    return [
      ...(attackedFigure ? [{ from: to, to: null, figure: attackedFigure }] : []),
      { from, to, figure },
    ]
  }

  public abstract canAttackTo(state: BoardState, from: string): string[]
  public abstract canMoveTo(
    state: BoardState,
    from: string,
    history: BoardHistory,
    rules: BoardRules
  ): string[]
}

export abstract class SimpleMovementRule extends MovementRule {
  protected type = MovementRuleType.Simple

  protected checkAttackable(positions: Array<string | null>) {
    const attackable = []
    for (const position of positions) {
      if (position) {
        attackable.push(position)
      }
    }

    return attackable
  }

  protected checkMovable(from: string, state: BoardState, positions: Array<string | null>) {
    const movable = []
    const fromField = state.getFieldByNotation(from)

    for (const position of positions) {
      if (!position) {
        continue
      }

      const field = state.getFieldByNotation(position)
      if (
        !field.getFigure() ||
        field.getFigure()?.getColor() !== fromField.getFigure()?.getColor()
      ) {
        movable.push(position)
      }
    }

    return movable
  }
}

export abstract class LinearMovementRule extends MovementRule {
  protected type = MovementRuleType.Linear
  protected iterateMovable(
    state: BoardState,
    start: string,
    nextPosition: (position: string) => string | null
  ) {
    const startField = state.getFieldByNotation(start)
    const moves = []

    let position = nextPosition(start)
    let field = position && state.getFieldByNotation(position)

    while (position && field && !field.getFigure()) {
      moves.push(position)

      position = nextPosition(position)
      field = position && state.getFieldByNotation(position)
    }

    if (position && field && field.getFigure()?.getColor() !== startField.getFigure()?.getColor()) {
      moves.push(position)
    }

    return moves
  }

  protected iterateAttackable(
    state: BoardState,
    start: string,
    nextPosition: (position: string) => string | null
  ) {
    const moves = []

    let position = nextPosition(start)
    let field = position && state.getFieldByNotation(position)

    while (position && field && !field.getFigure()) {
      moves.push(position)

      position = nextPosition(position)
      field = position && state.getFieldByNotation(position)
    }

    if (position && field) {
      moves.push(position)
    }

    return moves
  }
}
