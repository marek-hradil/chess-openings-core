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
    disambiguateRow: false,
    disambiguateCol: false,
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

  public serialize() {
    if (this.specials.castleLong) {
      return '0-0-0'
    }

    if (this.specials.castleShort) {
      return '0-0'
    }

    const captureSign = this.specials.capture ? 'x' : ''

    if (this.specials.pawnEnPassant) {
      return this.fromPosition + captureSign + this.toPosition + ' e.p.'
    }

    const figureSign = this.buildFigureSign(this.name)
    const fromSign = this.buildFromSign(this.fromPosition)
    const promotionSign = this.specials.promotion
      ? this.buildFigureSign(this.specials.promotion)
      : ''

    return figureSign + fromSign + captureSign + this.toPosition + promotionSign
  }

  private buildFigureSign(figureName: FigureName) {
    if (figureName === 'Knight') {
      return 'N'
    }

    if (figureName === 'Pawn') {
      return ''
    }

    return figureName.charAt(0)
  }

  private buildFromSign(fromSign: string | null) {
    if (this.specials.disambiguateCol && this.specials.disambiguateRow) {
      return fromSign ?? ''
    }

    if (this.specials.disambiguateCol) {
      return fromSign?.charAt(0) ?? ''
    }

    if (this.specials.disambiguateRow) {
      return fromSign?.charAt(1) ?? ''
    }

    return ''
  }
}

export default BoardTimeRecord
