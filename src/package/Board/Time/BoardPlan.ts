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

  public getNextInevitablePlan(color: FigureColor | null, moveCount: number) {
    return this.inevitablePlan[color ?? 'White'][Math.floor(moveCount / 2)] ?? null
  }

  public getNextFollowingPlan(color: FigureColor | null, moveCount: number) {
    return this.followablePlan[color ?? 'White'][Math.floor(moveCount / 2)] ?? null
  }

  public listFollowablePlan(color: FigureColor | null, moveCount: number) {
    return this.followablePlan[color ?? 'White'].slice(Math.floor(moveCount / 2))
  }

  public listInevitablePlan(color: FigureColor | null, moveCount: number) {
    return this.inevitablePlan[color ?? 'White'].slice(Math.floor(moveCount / 2))
  }

  public listFollowedPlan(color: FigureColor | null, moveCount: number) {
    return this.followablePlan[color ?? 'White'].slice(0, Math.floor(moveCount / 2))
  }
}

export default BoardPlan
