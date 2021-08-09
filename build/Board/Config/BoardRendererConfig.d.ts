import BoardData, { BoardGeneralData, BoardRendererData } from './BoardData';
declare class BoardRendererConfig {
    data: BoardData;
    constructor(options?: BoardRendererData & BoardGeneralData);
}
export default BoardRendererConfig;
