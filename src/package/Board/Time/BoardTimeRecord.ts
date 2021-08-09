import { FigureColor, FigureName } from '../../Figure/Figure'

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

  constructor(
    positions: [from: string | null, to: string | null],
    figure: { color: FigureColor; name: FigureName; startingPosition: string },
    specials: Partial<BoardTimeRecord['specials']>
  ) {
    this.fromPosition = positions[0]
    this.toPosition = positions[1]
    this.color = figure.color
    this.name = figure.name
    this.startingPosition = figure.startingPosition

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
