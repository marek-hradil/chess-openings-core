export type BoardRulesSwitches = {
  shouldEndOnPlanViolation?: boolean
  shouldEnforcePlan?: boolean
}

type Switches = (BoardRulesSwitches & { type: 'BoardRules' }) | never

class BoardSwitches {
  public shouldEndOnPlanViolation = true
  public shouldEnforcePlan = true

  constructor(switches: Switches) {
    if (switches.type === 'BoardRules') {
      this.shouldEndOnPlanViolation = switches?.shouldEndOnPlanViolation ?? true
      this.shouldEnforcePlan = switches?.shouldEnforcePlan ?? true
    }
  }
}

export default BoardSwitches
