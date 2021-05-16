import { ColorConverter, IndexConverter, NotationConverter } from '../../Converters'
import { FieldState } from '../State/BoardField'
import BoardRules from '../Rules/BoardRules'
import BoardState from '../State/BoardState'
import BoardTime from '../Time/BoardTime'

class BoardGui {
  private canvasWidth: number
  private canvasHeight: number

  constructor(canvas: HTMLCanvasElement) {
    this.canvasHeight = canvas.height
    this.canvasWidth = canvas.width
  }

  public onClick(
    coordinates: [x: number, y: number],
    state: BoardState,
    rules: BoardRules,
    time: BoardTime
  ) {
    const [x, y] = coordinates
    const [rowIndex, colIndex] = IndexConverter.toIndex(
      x,
      y,
      this.canvasWidth / 8,
      this.canvasHeight / 8
    )

    const notation = NotationConverter.toNotation(rowIndex, colIndex)
    if (!notation) {
      return
    }

    const field = state.getFieldByNotation(notation)

    switch (field.getState()) {
      case FieldState.Idle:
        this.onClickIdle(notation, state, rules, time)
        break
      case FieldState.Playable:
        this.onClickPlayable(notation, state, rules, time)
        break
      case FieldState.Selected:
        this.onClickSelected(state)
        break
    }
  }

  private onClickIdle(position: string, state: BoardState, rules: BoardRules, time: BoardTime) {
    const figure = state.getFieldByNotation(position).getFigure()
    const lastMove = time.getHistory().getLastMove()
    const colorToPlay = lastMove ? ColorConverter.convert(lastMove.color) : 'White'

    if (!figure || figure.getColor() !== colorToPlay) {
      this.clear(state)
      return
    }

    const start = state.getFieldByNotation(position)
    start.setState(FieldState.Selected)

    const movablePositions = rules.getMovablesForField(position, state, time, rules)

    for (const movable of movablePositions) {
      const field = state.getFieldByNotation(movable)
      field.setState(FieldState.Playable)
    }

    this.clear(state, [...movablePositions, position])
  }

  private onClickPlayable(position: string, state: BoardState, rules: BoardRules, time: BoardTime) {
    const fields = state.getFields()

    let selected = null

    start: for (const rowIndex in fields) {
      for (const colIndex in fields[rowIndex]) {
        const field = fields[rowIndex][colIndex]

        if (field.getState() === FieldState.Selected) {
          selected = NotationConverter.toNotation(Number(rowIndex), Number(colIndex))
          break start
        }
      }
    }

    if (!selected) {
      return
    }

    rules.move(selected, position, state, time, rules)
    this.clear(state)
  }

  private onClickSelected(state: BoardState) {
    this.clear(state)
  }

  private clear(state: BoardState, except: string[] = []) {
    const fields = state.getFields()
    for (const rowIndex in fields) {
      for (const colIndex in fields[rowIndex]) {
        const position = NotationConverter.toNotation(Number(rowIndex), Number(colIndex))
        if (position && !except.includes(position)) {
          const field = fields[rowIndex][colIndex]

          field.setState(FieldState.Idle)
        }
      }
    }
  }
}

export default BoardGui
