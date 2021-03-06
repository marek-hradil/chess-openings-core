import {
  ColorConverter,
  LengthConverter,
  NotationConverter,
  PositionConverter,
} from '../../Converters'
import { SimpleMovementRule } from './MovementRule'
import BoardHistory from '../Time/BoardHistory'
import BoardRules from './BoardRules'
import BoardState from '../State/BoardState'
import BoardTimeRecord from '../Time/BoardTimeRecord'

export class KingMovementRule extends SimpleMovementRule {
  public make(state: BoardState, from: string, to: string) {
    const length = LengthConverter.measureLengthOfMove(from, to)
    const figure = state.getFieldByNotation(from)?.getFigure()

    if (!figure) {
      return []
    }

    if (length !== 2) {
      const attackedFigure = state.getFieldByNotation(to)?.getFigure()

      if (attackedFigure) {
        return [
          { from: to, to: null, figure: attackedFigure },
          { from, to, figure },
        ]
      }

      return [{ from, to, figure }]
    }

    const [, fromCol] = NotationConverter.fromNotation(from)
    const [, toCol] = NotationConverter.fromNotation(to)

    const vec = fromCol - toCol
    const color = figure.getColor()
    const isShortCastle = vec < 0
    const rookPosition = isShortCastle
      ? color === 'White'
        ? 'h1'
        : 'h8'
      : color === 'White'
      ? 'a1'
      : 'a8'

    const rookDesignatedPosition = isShortCastle
      ? color === 'White'
        ? 'f1'
        : 'f8'
      : color === 'White'
      ? 'd1'
      : 'd8'

    const rookFigure = state.getFieldByNotation(rookPosition)?.getFigure()

    if (rookFigure) {
      return [
        { from, to, figure },
        { from: rookPosition, to: rookDesignatedPosition, figure: rookFigure },
      ]
    }

    return []
  }

  public canAttackTo(_: BoardState, from: string): string[] {
    return this.checkAttackable([
      PositionConverter.topLeftNeighbour(from),
      PositionConverter.topNeighbour(from),
      PositionConverter.topRightNeighbour(from),
      PositionConverter.leftNeighbour(from),
      PositionConverter.bottomLeftNeighbour(from),
      PositionConverter.bottomNeighbour(from),
      PositionConverter.bottomRightNeighbour(from),
      PositionConverter.rightNeighbour(from),
    ])
  }

  public canMoveTo(
    state: BoardState,
    from: string,
    history: BoardHistory,
    rules: BoardRules
  ): string[] {
    const figure = state.getFieldByNotation(from)?.getFigure()
    if (!figure) {
      return []
    }

    const normalMoves = this.checkMovable(from, state, [
      PositionConverter.topLeftNeighbour(from),
      PositionConverter.topNeighbour(from),
      PositionConverter.topRightNeighbour(from),
      PositionConverter.leftNeighbour(from),
      PositionConverter.bottomLeftNeighbour(from),
      PositionConverter.bottomNeighbour(from),
      PositionConverter.bottomRightNeighbour(from),
      PositionConverter.rightNeighbour(from),
    ])

    const didMove = Boolean(
      history.filter({ startingPosition: figure.getStartingPosition() }).length
    )
    const isInCheck = rules.isAttacked(state, from, ColorConverter.convert(figure.getColor()))
    if (didMove || isInCheck) {
      return normalMoves
    }

    const rooksMovesMap = history
      .filter({ name: 'Rook', color: figure.getColor() })
      .reduce<Record<string, BoardTimeRecord[]>>((acc, move) => {
        if (acc[move.startingPosition]) {
          return {
            ...acc,
            [move.startingPosition]: [...(acc[move.startingPosition] ?? []), move],
          }
        } else {
          return {
            ...acc,
            [move.startingPosition]: [move],
          }
        }
      }, {})

    const didBothRooksMove = Object.keys(rooksMovesMap).length === 2
    if (didBothRooksMove) {
      return normalMoves
    }

    const shortCastlePathway = Array.from({ length: 3 }).reduce<string[]>(
      (acc, _, index) => [...acc, PositionConverter.rightNeighbour(acc?.[index - 1] ?? from)!],
      []
    )

    const longCastlePathway = Array.from({ length: 4 }).reduce<string[]>(
      (acc, _, index) => [...acc, PositionConverter.leftNeighbour(acc?.[index - 1] ?? from)!],
      []
    )

    const canCastle = (acc: boolean, position: string, index: number, arr: string[]) => {
      const isRookField = index === arr.length - 1
      const isCheckableField = arr.length === 4 && index === 2
      const isFree = !state.getFieldByNotation(position)?.getFigure()
      const isAttacked = rules.isAttacked(
        state,
        position,
        ColorConverter.convert(figure.getColor())
      )

      if (!isRookField) {
        if (isCheckableField) {
          return acc && isFree
        }

        return acc && isFree && !isAttacked
      }

      const rookStartingPosition = state
        .getFieldByNotation(position)
        ?.getFigure()
        ?.getStartingPosition()

      if (!rookStartingPosition) {
        return false
      }

      const didMove = Boolean(rooksMovesMap[rookStartingPosition])

      return acc && !didMove
    }

    const canShortCastle = shortCastlePathway.reduce<boolean>(canCastle, true)
    const canLongCastle = longCastlePathway.reduce<boolean>(canCastle, true)

    const castleMoves = []
    if (canShortCastle && shortCastlePathway[1]) {
      castleMoves.push(shortCastlePathway[1])
    }

    if (canLongCastle && longCastlePathway[1]) {
      castleMoves.push(longCastlePathway[1])
    }

    return [...normalMoves, ...castleMoves]
  }
}
