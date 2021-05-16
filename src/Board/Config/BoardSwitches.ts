export type BoardRulesSwitches = {
  shouldEndOnPlanViolation?: boolean
  shouldEnforcePlan?: boolean
}

type Switches = (BoardRulesSwitches & { type: 'BoardRules' }) | never

class BoardSwitches {
  public shouldEndOnPlanViolation: boolean = true
  public shouldEnforcePlan: boolean = true

  constructor(switches: Switches) {
    if (switches.type === 'BoardRules') {
      this.shouldEndOnPlanViolation = switches?.shouldEndOnPlanViolation ?? true
      this.shouldEnforcePlan = switches?.shouldEnforcePlan ?? true
    }
  }
}

export default BoardSwitches
