import { MoveEvent } from '../Rules/MovementRule'
import { NotationConverter } from '../../Converters'
import BoardTimeRecord from './BoardTimeRecord'

class BoardTimeEventConverter {
  public static convertMoveEventsToRecord(events: MoveEvent[]) {
    const specials = {
      capture: this.isCapture(events),
      pawnEnPassant: this.isEnPassant(events),
      pawnLongMove: this.isPawnLongMove(events),
      promotion: this.getPromotedFigure(events),

      ...this.isCastle(events),
    }

    const mainMove = this.extractMainMove(events)

    return new BoardTimeRecord(
      [mainMove?.from ?? null, mainMove?.to ?? null],
      {
        color: mainMove?.figure?.getColor() ?? 'White',
        name: mainMove?.figure?.getName() ?? 'King',
        id: mainMove?.figure?.getId() ?? null,
      },
      specials
    )
  }

  private static isCapture(events: MoveEvent[]) {
    const numberOfCaptures = events.filter(event => !event.to).length
    const numberOfPromotions = events.filter(event => !event.from).length

    return numberOfCaptures > numberOfPromotions
  }

  private static getPromotedFigure(events: MoveEvent[]) {
    const newFigure = events.find(event => !event.from)

    return newFigure?.figure?.getName() ?? null
  }

  private static isCastle(events: MoveEvent[]) {
    if (events.length !== 2) {
      return false
    }

    const isSameColour = new Set(events.map(({ figure }) => figure.getColor())).size === 1
    if (!isSameColour) {
      return false
    }

    const rook = events.find(event => event.figure.getName() === 'Rook')
    const king = events.find(event => event.figure.getName() === 'King')

    if (!rook || !king) {
      return false
    }

    if (!rook.from || !rook.to) {
      return false
    }

    const [, rookFromCol] = NotationConverter.fromNotation(rook.from)
    const [, rookToCol] = NotationConverter.fromNotation(rook.to)

    if (Math.abs(rookFromCol - rookToCol) === 2) {
      return {
        castleLong: false,
        castleShort: true,
      }
    } else {
      return {
        castleShort: false,
        castleLong: true,
      }
    }
  }

  private static isPawnLongMove(events: MoveEvent[]) {
    if (events.length !== 1) {
      return false
    }

    const [move] = events

    if (!move?.from || !move?.to) {
      return false
    }

    const [fromRow] = NotationConverter.fromNotation(move.from)
    const [toRow] = NotationConverter.fromNotation(move.to)

    return Math.abs(fromRow - toRow) === 2
  }

  private static isEnPassant(events: MoveEvent[]) {
    const isEveryFigurePawn = events.every(event => event.figure.getName() === 'Pawn')
    if (!isEveryFigurePawn || events.length !== 2) {
      return false
    }

    const isCapture = this.isCapture(events)
    if (!isCapture) {
      return false
    }

    const captured = events.find(event => !event.to)
    const capturing = events.find(event => event.to)

    if (!captured || !capturing) {
      return false
    }

    return captured.from !== capturing.to
  }

  private static extractMainMove(events: MoveEvent[]) {
    return events.find(event => event.from && event.to)
  }
}

export default BoardTimeEventConverter
