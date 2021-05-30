import { FigureColor } from '../../Figure/Figure'
import BoardTimeRecord from '../Time/BoardTimeRecord'

type OnPlanViolation = (lastMove: BoardTimeRecord, shouldBeMove: BoardTimeRecord) => void
type OnPlanContinuance = (lastMove: BoardTimeRecord) => void
type OnEnd = (won?: FigureColor) => void
type OnMove = (lastMove: BoardTimeRecord) => void

export type BoardTimeEventsListeners = {
  onPlanViolation?: OnPlanViolation
  onPlanContinuance?: OnPlanContinuance
}

export type BoardRulesEventsListeners = {
  onEnd?: OnEnd
  onMove?: OnMove
}

type EventsListeners =
  | (BoardTimeEventsListeners & { type: 'BoardTime' })
  | (BoardRulesEventsListeners & { type: 'BoardRules' })
  | never

class BoardEventListeners {
  public onPlanContinuance: OnPlanContinuance = () => null
  public onPlanViolation: OnPlanViolation = () => null
  public onEnd: OnEnd = () => null
  public onMove: OnMove = () => null

  constructor(eventListeners: EventsListeners) {
    if (eventListeners.type === 'BoardTime') {
      this.onPlanContinuance = eventListeners.onPlanContinuance ?? (() => null)
      this.onPlanViolation = eventListeners.onPlanViolation ?? (() => null)
    }

    if (eventListeners.type === 'BoardRules') {
      this.onEnd = eventListeners.onEnd ?? (() => null)
      this.onMove = eventListeners.onMove ?? (() => null)
    }
  }
}

export default BoardEventListeners
