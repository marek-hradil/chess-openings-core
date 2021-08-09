import { BlackField, Field, FieldState, WhiteField } from './BoardField'
import { FigureColor } from '../../Figure/Figure'
import { NotationConverter } from '../../Converters'
import BoardStateConfig from '../Config/BoardStateConfig'

class BoardState {
  private fields: Field[][]

  constructor(config: BoardStateConfig) {
    this.fields = Array.from({ length: config.data.fieldRows }).map((_, rowIndex) =>
      Array.from({ length: config.data.fieldCols }).map((_, colIndex) =>
        (rowIndex + colIndex) % 2 === 0 ? new WhiteField() : new BlackField()
      )
    )
  }

  public setFields(fields: Field[][]) {
    this.fields = fields
  }

  public getFields() {
    return this.fields
  }

  public getFieldByNotation(notation: string) {
    const [rowIndex, colIndex] = NotationConverter.fromNotation(notation)

    return this.getFieldByIndex(rowIndex, colIndex)
  }

  public getFieldByIndex(rowIndex: number, colIndex: number) {
    return this.fields?.[rowIndex]?.[colIndex] ?? null
  }

  public getSelectedField() {
    return this.fields.flat().find(field => field.getState() === FieldState.Selected)
  }

  public findKing(color: FigureColor) {
    return BoardStateFigureSearch.findKing(this.fields, color)
  }
}

class BoardStateFigureSearch {
  public static findKing(fields: Field[][], color: FigureColor) {
    let kingPosition: string | null = null

    start: for (const rowIndex in fields) {
      for (const colIndex in fields[rowIndex]) {
        const field = fields?.[Number(rowIndex)]?.[Number(colIndex)]

        if (!field) {
          continue
        }

        const figure = field.getFigure()

        if (!figure) {
          continue
        }

        if (figure.getName() === 'King' && figure.getColor() === color) {
          kingPosition = NotationConverter.toNotation(Number(rowIndex), Number(colIndex))

          break start
        }
      }
    }

    return kingPosition
  }
}

export class BoardStatePrototypeFactory {
  public static clone(state: BoardState) {
    const config = new BoardStateConfig()
    const clonedState = new BoardState(config)

    clonedState.setFields(state.getFields())

    return clonedState
  }
}

export default BoardState
