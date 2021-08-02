import { BoardRendererData } from './BoardData';
import BoardSwitches from './BoardSwitches';
declare class BoardGuiConfig {
    switches: BoardSwitches;
    constructor(options?: BoardRendererData);
}
export default BoardGuiConfig;
