import { FigureColor, FigureName } from '../../Figure/Figure';
import BoardData, { BoardRulesData } from './BoardData';
import BoardEventListeners, { BoardRulesEventsListeners } from './BoardEventListeners';
import BoardSwitches, { BoardRulesSwitches } from './BoardSwitches';
declare type SerializedLayout = {
    name: FigureName;
    color: FigureColor;
    position: string;
    startingPosition?: string;
}[];
declare class BoardRulesConfig {
    listeners: BoardEventListeners;
    switches: BoardSwitches;
    data: BoardData;
    constructor(options?: BoardRulesEventsListeners & BoardRulesSwitches & Omit<BoardRulesData, 'layout'> & {
        layout?: SerializedLayout;
    });
    private deserializeLayout;
}
export default BoardRulesConfig;
