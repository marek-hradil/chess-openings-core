import BoardData, { BoardRulesData } from './BoardData';
import BoardEventListeners, { BoardRulesEventsListeners } from './BoardEventListeners';
import BoardSwitches, { BoardRulesSwitches } from './BoardSwitches';
declare class BoardRulesConfig {
    listeners: BoardEventListeners;
    switches: BoardSwitches;
    data: BoardData;
    constructor(options?: BoardRulesEventsListeners & BoardRulesSwitches & BoardRulesData);
}
export default BoardRulesConfig;
