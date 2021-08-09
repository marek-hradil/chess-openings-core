import { FigureColor } from '../../Figure/Figure';
import BoardData, { BoardGeneralData } from './BoardData';
import BoardEventListeners, { BoardTimeEventsListeners } from './BoardEventListeners';
import BoardTimeRecord from '../Time/BoardTimeRecord';
declare type PlanRecordSerialized = {
    from: ConstructorParameters<typeof BoardTimeRecord>['0']['0'];
    to: ConstructorParameters<typeof BoardTimeRecord>['0']['1'];
} & Omit<ConstructorParameters<typeof BoardTimeRecord>['1'], 'id'> & ConstructorParameters<typeof BoardTimeRecord>['2'];
declare type Options = {
    inevitablePlan?: {
        [color in FigureColor]: PlanRecordSerialized[];
    };
    followablePlan?: {
        [color in FigureColor]: PlanRecordSerialized[];
    };
} & BoardTimeEventsListeners & BoardGeneralData;
declare class BoardTimeConfig {
    listeners: BoardEventListeners;
    data: BoardData;
    constructor(options?: Options);
    private deserializePlan;
}
export default BoardTimeConfig;
