import { FigureColor } from '../../Figure/Figure'
import BoardData, { BoardGeneralData } from './BoardData'
import BoardEventListeners, { BoardTimeEventsListeners } from './BoardEventListeners'
import BoardTimeRecord from '../Time/BoardTimeRecord'

type PlanRecordSerialized = {
  from: ConstructorParameters<typeof BoardTimeRecord>['0']['0']
  to: ConstructorParameters<typeof BoardTimeRecord>['0']['1']
} & Omit<ConstructorParameters<typeof BoardTimeRecord>['1'], 'id'> &
  ConstructorParameters<typeof BoardTimeRecord>['2']

type Options = {
  inevitablePlan?: { [color in FigureColor]: PlanRecordSerialized[] }
  followablePlan?: { [color in FigureColor]: PlanRecordSerialized[] }
} & BoardTimeEventsListeners &
  BoardGeneralData

class BoardTimeConfig {
  public listeners: BoardEventListeners
  public data: BoardData

  constructor(options?: Options) {
    this.data = new BoardData({
      type: 'BoardTime',
      inevitablePlan: this.deserializePlan(options?.inevitablePlan),
      followablePlan: this.deserializePlan(options?.followablePlan),
      startAs: options?.startAs,
    })
    this.listeners = new BoardEventListeners({
      type: 'BoardTime',
      onPlanContinuance: options?.onPlanContinuance,
      onPlanViolation: options?.onPlanViolation,
    })
  }

  private deserializePlan(plan?: { [color in FigureColor]: PlanRecordSerialized[] }) {
    if (!plan) {
      return { White: [], Black: [] }
    }

    const deserialize = (path: PlanRecordSerialized[]) =>
      path.map(
        record =>
          new BoardTimeRecord(
            [record.from, record.to],
            { color: record.color, name: record.name, startingPosition: record.startingPosition },
            record,
            []
          )
      )

    return {
      White: deserialize(plan['White']),
      Black: deserialize(plan['Black']),
    }
  }
}

export default BoardTimeConfig
