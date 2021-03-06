import BoardGuiConfig from '../Config/BoardGuiConfig';
import BoardRules from '../Rules/BoardRules';
import BoardState from '../State/BoardState';
import BoardTime from '../Time/BoardTime';
declare class BoardGui {
    private canvasWidth;
    private canvasHeight;
    private data;
    constructor(config: BoardGuiConfig, canvas: HTMLCanvasElement);
    onClick(coordinates: [x: number, y: number], state: BoardState, rules: BoardRules, time: BoardTime): void;
    private onClickIdle;
    private onClickPlayable;
    private onClickSelected;
    private clear;
}
export default BoardGui;
