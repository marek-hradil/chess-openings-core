import { FigureColor, FigureName } from '../../Figure/Figure'
import { MoveEvent } from '../Rules/MovementRule'

class BoardTimeRecord {
  public readonly fromPosition: string | null
  public readonly toPosition: string | null

  public readonly color: FigureColor
  public readonly name: FigureName
  public readonly startingPosition: string

  public readonly specials = {
    capture: false,
    pawnLongMove: false,
    pawnEnPassant: false,
    castleLong: false,
    castleShort: false,
    promotion: null as FigureName | null,
  }

  public readonly events: MoveEvent[]

  constructor(
    positions: [from: string | null, to: string | null],
    figure: { color: FigureColor; name: FigureName; startingPosition: string },
    specials: Partial<BoardTimeRecord['specials']>,
    events: MoveEvent[]
  ) {
    this.fromPosition = positions[0]
    this.toPosition = positions[1]
    this.color = figure.color
    this.name = figure.name
    this.startingPosition = figure.startingPosition
    this.events = events

    this.specials = {
      ...this.specials,
      ...specials,
    }
  }

  public equals(record: BoardTimeRecord) {
    return (
      record.fromPosition === this.fromPosition &&
      record.toPosition === this.toPosition &&
      record.color === this.color &&
      record.name === this.name &&
      record.specials.promotion === this.specials.promotion
    )
  }
}

export default BoardTimeRecord
