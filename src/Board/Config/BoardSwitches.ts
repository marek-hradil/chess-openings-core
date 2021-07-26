export type BoardRulesSwitches = {
  shouldEndOnPlanViolation?: boolean
  shouldEnforcePlan?: boolean
}

export type BoardRendererSwitches = {
  shouldRenderAsBlack?: boolean
}

type Switches =
  | (BoardRulesSwitches & { type: 'BoardRules' })
  | (BoardRendererSwitches & { type: 'BoardRenderer' })
  | never

class BoardSwitches {
  public shouldEndOnPlanViolation = true
  public shouldEnforcePlan = true
  public shouldRenderAsBlack = false

  constructor(switches: Switches) {
    if (switches.type === 'BoardRules') {
      this.shouldEndOnPlanViolation = switches?.shouldEndOnPlanViolation ?? true
      this.shouldEnforcePlan = switches?.shouldEnforcePlan ?? true
    }

    if (switches.type === 'BoardRenderer') {
      this.shouldRenderAsBlack = switches?.shouldRenderAsBlack ?? false
    }
  }
}

export default BoardSwitches
