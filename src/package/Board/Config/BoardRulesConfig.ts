import BoardData, { BoardRulesData } from './BoardData'
import BoardEventListeners, { BoardRulesEventsListeners } from './BoardEventListeners'
import BoardSwitches, { BoardRulesSwitches } from './BoardSwitches'

class BoardRulesConfig {
  public listeners: BoardEventListeners
  public switches: BoardSwitches
  public data: BoardData

  constructor(options?: BoardRulesEventsListeners & BoardRulesSwitches & BoardRulesData) {
    this.listeners = new BoardEventListeners({
      type: 'BoardRules',
      onEnd: options?.onEnd,
    })

    this.switches = new BoardSwitches({
      type: 'BoardRules',
      shouldEndOnPlanViolation: options?.shouldEndOnPlanViolation,
      shouldEnforcePlan: options?.shouldEnforcePlan,
    })

    this.data = new BoardData({
      type: 'BoardRules',
      layout: options?.layout,
      movements: options?.movements,
    })
  }
}

export default BoardRulesConfig
