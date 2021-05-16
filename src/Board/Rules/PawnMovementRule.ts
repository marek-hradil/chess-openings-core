import { ColorConverter, NotationConverter, PositionConverter } from '../../Converters'
import { Queen } from '../../Figure/Queen'
import BoardState from '../State/BoardState'
import BoardHistory from '../Time/BoardHistory'
import { SimpleMovementRule } from './MovementRule'

export class PawnMovementRule extends SimpleMovementRule {
  public make(state: BoardState, from: string, to: string) {
    const figure = state.getFieldByNotation(from).getFigure()
    const attackedFigure = state.getFieldByNotation(to).getFigure()

    if (!figure) {
      return []
    }

    const [, fromCol] = NotationConverter.fromNotation(from)
    const [toRow, toCol] = NotationConverter.fromNotation(to)
    const isPromotion = toRow === 0 || toRow === 7

    if (isPromotion) {
      if (attackedFigure) {
        return [
          { from: to, to: null, figure: attackedFigure },
          { from, to: null, figure },
          { from: null, to, figure: new Queen(figure.getColor()) },
        ]
      }

      return [
        { from, to: null, figure },
        { from: null, to, figure: new Queen(figure.getColor()) },
      ]
    }

    if (attackedFigure) {
      return [
        { from: to, to: null, figure: attackedFigure },
        { from, to, figure },
      ]
    }

    if (fromCol === toCol) {
      return [{ from, to, figure }]
    }

    const enPassantWhitePosition = PositionConverter.bottomNeighbour(to)
    if (figure.getColor() === 'White' && enPassantWhitePosition) {
      const enPassantable = state.getFieldByNotation(enPassantWhitePosition).getFigure()!
      return [
        { from, to, figure },
        { from: enPassantWhitePosition, to: null, figure: enPassantable },
      ]
    }

    const enPassantBlackPosition = PositionConverter.topNeighbour(to)
    if (figure.getColor() === 'Black' && enPassantBlackPosition) {
      const enPassantable = state.getFieldByNotation(enPassantBlackPosition).getFigure()!
      return [
        { from, to, figure },
        { from: enPassantBlackPosition, to: null, figure: enPassantable },
      ]
    }

    return []
  }

  public canAttackTo(state: BoardState, from: string): string[] {
    const figure = state.getFieldByNotation(from).getFigure()
    if (!figure) {
      return []
    }

    const [getForwardLeft, getForwardRight] =
      figure.getColor() === 'White'
        ? [PositionConverter.topLeftNeighbour, PositionConverter.topRightNeighbour]
        : [PositionConverter.bottomLeftNeighbour, PositionConverter.bottomRightNeighbour]

    const moves = []
    const forwardLeft = getForwardLeft(from)
    if (forwardLeft) {
      moves.push(forwardLeft)
    }

    const forwardRight = getForwardRight(from)
    if (forwardRight) {
      moves.push(forwardRight)
    }

    return moves
  }

  public canMoveTo(state: BoardState, from: string, history: BoardHistory): string[] {
    const figure = state.getFieldByNotation(from).getFigure()
    if (!figure) {
      return []
    }

    const getForward =
      figure.getColor() === 'White'
        ? PositionConverter.topNeighbour
        : PositionConverter.bottomNeighbour

    const [getForwardLeft, getForwardRight] =
      figure.getColor() === 'White'
        ? [PositionConverter.topLeftNeighbour, PositionConverter.topRightNeighbour]
        : [PositionConverter.bottomLeftNeighbour, PositionConverter.bottomRightNeighbour]

    const moves = []
    const forward = getForward(from)
    if (forward && !state.getFieldByNotation(forward).getFigure()) {
      moves.push(forward)
    }

    const hasMoved = Boolean(history.filter({ id: figure.getId() }).length)
    const twoForward = forward && moves.includes(forward) && getForward(forward)
    if (!hasMoved && twoForward && !state.getFieldByNotation(twoForward).getFigure()) {
      moves.push(twoForward)
    }

    const canTake = (f: string) =>
      state.getFieldByNotation(f).getFigure()?.getColor() ===
      ColorConverter.convert(figure.getColor())

    const forwardLeft = getForwardLeft(from)
    if (forwardLeft && canTake(forwardLeft)) {
      moves.push(forwardLeft)
    }

    const forwardRight = getForwardRight(from)
    if (forwardRight && canTake(forwardRight)) {
      moves.push(forwardRight)
    }

    const lastMove = history.getLastMove()
    if (!lastMove) {
      return moves
    }

    const isEnPassantPossible =
      lastMove.specials.pawnLongMove && lastMove.color === ColorConverter.convert(figure.getColor())
    if (!isEnPassantPossible || !lastMove.toPosition) {
      return moves
    }

    const [fromRow, fromCol] = NotationConverter.fromNotation(from)
    const [enPassantRow, enPassantCol] = NotationConverter.fromNotation(lastMove.toPosition)
    if (fromRow !== enPassantRow || Math.abs(fromCol - enPassantCol) !== 1) {
      return moves
    }

    const whiteEnPassant = PositionConverter.topNeighbour(lastMove.toPosition)
    const blackEnPassant = PositionConverter.bottomNeighbour(lastMove.toPosition)
    if (figure.getColor() === 'White' && whiteEnPassant) {
      return [...moves, whiteEnPassant]
    }

    if (figure.getColor() === 'Black' && blackEnPassant) {
      return [...moves, blackEnPassant]
    }

    return moves
  }
}
