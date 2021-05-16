import { FigureColor } from '../../Figure/Figure'
import BoardState, { BoardStatePrototypeFactory } from '../State/BoardState'
import { ColorConverter, NotationConverter } from '../../Converters'
import BoardTime from '../Time/BoardTime'
import BoardEventListeners from '../Config/BoardEventListeners'
import BoardSwitches from '../Config/BoardSwitches'
import BoardData from '../Config/BoardData'
import BoardRulesConfig from '../Config/BoardRulesConfig'

class BoardRules {
  private listeners: BoardEventListeners
  private switches: BoardSwitches
  private data: BoardData

  constructor(config: BoardRulesConfig) {
    this.listeners = config.listeners
    this.switches = config.switches
    this.data = config.data
  }

  public setup(state: BoardState) {
    for (const [position, figure] of Object.entries(this.data.layout)) {
      state.getFieldByNotation(position).setFigure(figure)
    }
  }

  public move(from: string, to: string, state: BoardState, time: BoardTime, rules: BoardRules) {
    const field = state.getFieldByNotation(from)
    const figure = field.getFigure()
    if (!figure) {
      return
    }

    const movement = this.data.movements[figure.getName()]
    const events = movement.make(state, from, to)

    const move = time.buildMove(events)
    const isByPlan = time.isFollowingPlan(move)
    if (!isByPlan && this.switches.shouldEndOnPlanViolation) {
      this.listeners.onEnd()
      return
    }

    if (!isByPlan && this.switches.shouldEnforcePlan) {
      return
    }

    for (const event of events) {
      if (!event.from && event.to) {
        state.getFieldByNotation(event.to).setFigure(event.figure)
      }

      if (event.from && !event.to) {
        state.getFieldByNotation(event.from).setFigure(null)
      }

      if (event.from && event.to) {
        state.getFieldByNotation(event.from).setFigure(null)
        state.getFieldByNotation(event.to).setFigure(event.figure)
      }
    }

    time.move(move)

    if (this.isCheckmate(state, time, rules)) {
      this.listeners.onEnd(time.getHistory().getLastMove()?.color ?? 'White')
      return
    }

    const nextPlan = time.getNextInevitable()
    if (nextPlan) {
      this.move(nextPlan.fromPosition ?? '', nextPlan.toPosition ?? '', state, time, rules)
    }
  }

  /**
   * Determine where can figure on this field attack to
   */
  public getAttackablesForField(from: string, state: BoardState) {
    const field = state.getFieldByNotation(from)
    const figure = field.getFigure()
    if (!figure) {
      return []
    }

    const movement = this.data.movements[figure.getName()]
    const positions = movement.canAttackTo(state, from)

    return positions
  }

  /**
   * Determine where can figure on this field move to
   */
  public getMovablesForField(from: string, state: BoardState, time: BoardTime, rules: BoardRules) {
    const field = state.getFieldByNotation(from)
    const figure = field.getFigure()
    if (!figure) {
      return []
    }

    const movement = this.data.movements[figure.getName()]
    const positions = movement.canMoveTo(state, from, time.getHistory(), rules)

    const isFigureKing = figure.getName() === 'King'
    const kingPosition = isFigureKing ? from : state.findKing(figure.getColor())

    if (!kingPosition) {
      return []
    }

    const notCheckPositions = []

    for (const to of positions) {
      const prototype = BoardStatePrototypeFactory.clone(state)

      const capturableFigure = prototype.getFieldByNotation(to).getFigure()

      prototype.getFieldByNotation(from).setFigure(null)
      prototype.getFieldByNotation(to).setFigure(figure)

      const isAttacked = this.isAttacked(
        prototype,
        isFigureKing ? to : kingPosition,
        ColorConverter.convert(figure.getColor())
      )

      if (!isAttacked) {
        notCheckPositions.push(to)
      }

      prototype.getFieldByNotation(to).setFigure(capturableFigure)
      prototype.getFieldByNotation(from).setFigure(figure)
    }

    return notCheckPositions
  }

  /**
   * Is field attacked
   */
  public isAttacked(state: BoardState, position: string, byColor: FigureColor) {
    const potentialAttackers = []
    const fields = state.getFields()
    for (const rowIndex in fields) {
      for (const colIndex in fields[rowIndex]) {
        const attacker = fields[Number(rowIndex)][Number(colIndex)]?.getFigure()
        const notation = NotationConverter.toNotation(Number(rowIndex), Number(colIndex))

        if (notation && attacker && attacker.getColor() === byColor) {
          potentialAttackers.push(notation)
        }
      }
    }

    let isAttacked = false
    for (const potentialAttackerPosition of potentialAttackers) {
      const positions = this.getAttackablesForField(potentialAttackerPosition, state)
      if (positions.includes(position)) {
        isAttacked = true
        break
      }
    }

    return isAttacked
  }

  public isCheckmate(state: BoardState, time: BoardTime, rules: BoardRules) {
    const lastMove = time.getHistory().getLastMove()
    if (!lastMove) {
      return false
    }

    const color = ColorConverter.convert(lastMove.color)
    const oppositeKingPosition = state.findKing(color)
    if (!oppositeKingPosition) {
      return false
    }

    const isOppositeKingAttacked = this.isAttacked(state, oppositeKingPosition, color)
    if (
      isOppositeKingAttacked &&
      this.getMovablesForField(oppositeKingPosition, state, time, rules).length === 0
    ) {
      const fields = state.getFields()
      let moves = 0
      for (const rowIndex in fields) {
        for (const colIndex in fields[rowIndex]) {
          const defender = fields[Number(rowIndex)][Number(colIndex)]?.getFigure()
          const notation = NotationConverter.toNotation(Number(rowIndex), Number(colIndex))

          if (notation && defender && defender.getColor() === color) {
            moves += this.getMovablesForField(notation, state, time, rules).length
          }
        }
      }

      if (moves === 0) {
        return true
      }
    }

    return false
  }
}

export default BoardRules
