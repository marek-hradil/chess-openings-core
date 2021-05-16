import { FigureColor } from './Figure/Figure'

export class NotationConverter {
  private static rowNotation = ['8', '7', '6', '5', '4', '3', '2', '1']
  private static colNotation = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

  public static toNotation(rowIndex: number, colIndex: number): string | null {
    const col = this.colNotation?.[colIndex]
    const row = this.rowNotation?.[rowIndex]
    if (!col || !row) {
      return null
    }

    return col + row
  }

  public static fromNotation(notation: string): [rowIndex: number, colIndex: number] {
    const [colSign, rowSign] = notation.split('')

    return [this.rowNotation.indexOf(rowSign), this.colNotation.indexOf(colSign)]
  }
}

export class LengthConverter {
  public static measureLengthOfMove(from: string, to: string) {
    const [fromRow, fromCol] = NotationConverter.fromNotation(from)
    const [toRow, toCol] = NotationConverter.fromNotation(to)

    const [rowLength, colLength] = [fromRow - toRow, fromCol - toCol]

    return Math.sqrt(rowLength ** 2 + colLength ** 2)
  }
}

export class PositionConverter {
  public static topNeighbour(notation: string) {
    return PositionConverter.useNotation(notation, [-1, 0])
  }

  public static bottomNeighbour(notation: string) {
    return PositionConverter.useNotation(notation, [1, 0])
  }

  public static leftNeighbour(notation: string) {
    return PositionConverter.useNotation(notation, [0, -1])
  }

  public static rightNeighbour(notation: string) {
    return PositionConverter.useNotation(notation, [0, 1])
  }

  public static topLeftNeighbour(notation: string) {
    return PositionConverter.useNotation(notation, [-1, -1])
  }

  public static topRightNeighbour(notation: string) {
    return PositionConverter.useNotation(notation, [-1, 1])
  }

  public static bottomLeftNeighbour(notation: string) {
    return PositionConverter.useNotation(notation, [1, -1])
  }

  public static bottomRightNeighbour(notation: string) {
    return PositionConverter.useNotation(notation, [1, 1])
  }

  public static topLeftKnightNeighbour(notation: string) {
    return PositionConverter.useNotation(notation, [-2, -1])
  }

  public static topRightKnightNeighbour(notation: string) {
    return PositionConverter.useNotation(notation, [-2, 1])
  }

  public static leftTopKnightNeighbour(notation: string) {
    return PositionConverter.useNotation(notation, [-1, -2])
  }

  public static leftBottomKnightNeighbour(notation: string) {
    return PositionConverter.useNotation(notation, [1, -2])
  }

  public static bottomLeftKnightNeighbour(notation: string) {
    return PositionConverter.useNotation(notation, [2, -1])
  }

  public static bottomRightKnightNeighbour(notation: string) {
    return PositionConverter.useNotation(notation, [2, 1])
  }

  public static rightBottomKnightNeighbour(notation: string) {
    return PositionConverter.useNotation(notation, [1, 2])
  }

  public static rightTopKnightNeighbour(notation: string) {
    return PositionConverter.useNotation(notation, [-1, 2])
  }

  private static useNotation(notation: string, transform: [row: number, col: number]) {
    const [prevRow, prevCol] = NotationConverter.fromNotation(notation)

    return NotationConverter.toNotation(prevRow + transform[0], prevCol + transform[1])
  }
}

export class IndexConverter {
  public static toIndex(
    x: number,
    y: number,
    squareWidth: number,
    squareHeight: number
  ): [rowIndex: number, colIndex: number] {
    return [Math.floor(y / squareHeight), Math.floor(x / squareWidth)]
  }

  public static fromIndex(
    rowIndex: number,
    colIndex: number,
    squareWidth: number,
    squareHeight: number
  ): [x: number, y: number] {
    return [colIndex * squareWidth, rowIndex * squareHeight]
  }
}

export class ColorConverter {
  public static convert(color: FigureColor) {
    return color === 'White' ? 'Black' : 'White'
  }
}
