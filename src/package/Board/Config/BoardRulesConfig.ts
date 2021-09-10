import { FigureColor, FigureName } from '../../Figure/Figure'
import BoardData, { BoardRulesData } from './BoardData'
import BoardEventListeners, { BoardRulesEventsListeners } from './BoardEventListeners'
import BoardSwitches, { BoardRulesSwitches } from './BoardSwitches'
import FigureFactory from '../../Figure/FigureFactory'

type SerializedLayout = {
  name: FigureName
  color: FigureColor
  position: string
  startingPosition?: string
}[]
class BoardRulesConfig {
  public listeners: BoardEventListeners
  public switches: BoardSwitches
  public data: BoardData

  constructor(
    options?: BoardRulesEventsListeners &
      BoardRulesSwitches &
      Omit<BoardRulesData, 'layout'> & { layout?: SerializedLayout }
  ) {
    this.listeners = new BoardEventListeners({
      type: 'BoardRules',
      onEnd: options?.onEnd,
      onMove: options?.onMove,
    })

    this.switches = new BoardSwitches({
      type: 'BoardRules',
      shouldEndOnPlanViolation: options?.shouldEndOnPlanViolation,
      shouldEnforcePlan: options?.shouldEnforcePlan,
    })

    this.data = new BoardData({
      type: 'BoardRules',
      layout: this.deserializeLayout(options?.layout),
      movements: options?.movements,
    })
  }

  private deserializeLayout(layout?: SerializedLayout) {
    if (!layout) {
      return undefined
    }

    return layout?.reduce(
      (acc, figure) => ({
        ...acc,
        [figure.position]: FigureFactory.makeFigure(
          figure.name,
          figure.color,
          figure.startingPosition ?? figure.position
        ),
      }),
      {}
    )
  }
}

export default BoardRulesConfig
