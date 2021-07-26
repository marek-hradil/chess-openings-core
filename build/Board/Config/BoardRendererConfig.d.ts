import BoardData, { BoardRendererData } from './BoardData';
import BoardSwitches from './BoardSwitches';
declare class BoardRendererConfig {
    data: BoardData;
    switches: BoardSwitches;
    constructor(options?: BoardRendererData);
}
export default BoardRendererConfig;
