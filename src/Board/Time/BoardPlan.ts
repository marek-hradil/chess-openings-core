import { FigureColor } from '../../Figure/Figure'
import BoardTimeRecord from './BoardTimeRecord'

class BoardPlan {
  private followablePlan: { [color in FigureColor]: BoardTimeRecord[] }
  private inevitablePlan: { [color in FigureColor]: BoardTimeRecord[] }

  constructor(
    followablePlan?: BoardPlan['followablePlan'],
    inevitablePlan?: BoardPlan['inevitablePlan']
  ) {
    this.followablePlan = followablePlan ?? { White: [], Black: [] }
    this.inevitablePlan = inevitablePlan ?? { White: [], Black: [] }
  }

  public getNextInevitablePlan(moveColor: FigureColor | null, moveCount: number) {
    return this.inevitablePlan[moveColor ?? 'White'][Math.floor(moveCount / 2)] ?? null
  }

  public getNextFollowingPlan(moveColor: FigureColor | null, moveCount: number) {
    return this.followablePlan[moveColor ?? 'White'][Math.floor(moveCount / 2)] ?? null
  }
}

export default BoardPlan
