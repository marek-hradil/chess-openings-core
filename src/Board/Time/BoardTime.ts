import { ColorConverter } from '../../Converters'
import BoardEventListeners from '../Config/BoardEventListeners'
import BoardTimeConfig from '../Config/BoardTimeConfig'
import { MoveEvent } from '../Rules/MovementRule'
import BoardHistory from './BoardHistory'
import BoardPlan from './BoardPlan'
import BoardTimeEventConverter from './BoardTimeEventConverter'
import BoardTimeRecord from './BoardTimeRecord'

class BoardTime {
  private history: BoardHistory
  private plan: BoardPlan

  private listeners: BoardEventListeners

  constructor(config: BoardTimeConfig) {
    this.history = new BoardHistory()
    this.plan = new BoardPlan(config.data.followablePlan, config.data.inevitablePlan)
    this.listeners = config.listeners
  }

  public getHistory() {
    return this.history
  }

  public buildMove(events: MoveEvent[]) {
    return BoardTimeEventConverter.convertMoveEventsToRecord(events)
  }

  public move(move: BoardTimeRecord) {
    this.history.pushMove(move)
  }

  public getNextInevitable() {
    const lastMove = this.history.getLastMove()
    const colorToPlay = lastMove ? ColorConverter.convert(lastMove.color) : 'White'

    const inevitablePlan = this.plan.getNextInevitablePlan(colorToPlay, this.history.getMoveCount())

    return inevitablePlan
  }

  public isFollowingPlan(plannedMove: BoardTimeRecord) {
    const followingMove = this.plan.getNextFollowingPlan(
      plannedMove.color,
      this.history.getMoveCount()
    )
    if (!followingMove) {
      return true
    }

    const equals = followingMove.equals(plannedMove)
    if (equals) {
      this.listeners.onPlanContinuance(plannedMove)
    } else {
      this.listeners.onPlanViolation(plannedMove, followingMove)
    }

    return equals
  }
}

export default BoardTime
