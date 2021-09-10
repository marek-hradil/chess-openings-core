import { ColorConverter } from '../../Converters'
import { MoveEvent } from '../Rules/MovementRule'
import BoardData from '../Config/BoardData'
import BoardEventListeners from '../Config/BoardEventListeners'
import BoardHistory from './BoardHistory'
import BoardPlan from './BoardPlan'
import BoardTimeConfig from '../Config/BoardTimeConfig'
import BoardTimeEventConverter from './BoardTimeEventConverter'
import BoardTimeRecord from './BoardTimeRecord'

class BoardTime {
  private history: BoardHistory
  private plan: BoardPlan

  private listeners: BoardEventListeners
  private data: BoardData

  constructor(config: BoardTimeConfig) {
    this.history = new BoardHistory()
    this.plan = new BoardPlan(config.data.followablePlan, config.data.inevitablePlan)
    this.data = config?.data
    this.listeners = config.listeners
  }

  public getHistory() {
    return this.history
  }

  public buildMove(
    events: MoveEvent[],
    details: Parameters<typeof BoardTimeEventConverter.convertMoveEventsToRecord>[1]
  ) {
    return BoardTimeEventConverter.convertMoveEventsToRecord(events, details)
  }

  public move(move: BoardTimeRecord) {
    this.history.pushMove(move)
  }

  public getColorToPlay() {
    const lastMove = this.history.getLastMove()
    return lastMove ? ColorConverter.convert(lastMove.color) : this.data.startAs
  }

  public getNextInevitable() {
    const inevitablePlan = this.plan.getNextInevitablePlan(
      this.getColorToPlay(),
      this.history.getMoveCount()
    )

    return inevitablePlan
  }

  public isFollowingPlan(plannedMove: BoardTimeRecord) {
    const followingMove = this.plan.getNextFollowablePlan(
      plannedMove.color,
      this.history.getMoveCount()
    )
    if (!followingMove) {
      return true
    }

    const equals = followingMove.equals(plannedMove)
    if (equals) {
      this.listeners.onPlanContinuance(
        plannedMove,
        this.plan.listFollowablePlan(plannedMove.color, this.history.getMoveCount() + 2),
        this.plan.listFollowedPlan(plannedMove.color, this.history.getMoveCount() + 2)
      )
    } else {
      this.listeners.onPlanViolation(
        plannedMove,
        this.plan.listFollowablePlan(plannedMove.color, this.history.getMoveCount()),
        this.plan.listFollowedPlan(plannedMove.color, this.history.getMoveCount())
      )
    }

    return equals
  }
}

export default BoardTime
