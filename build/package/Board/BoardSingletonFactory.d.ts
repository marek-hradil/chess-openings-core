import BoardConfig from './Config/BoardConfig';
import BoardGui from './Gui/BoardGui';
import BoardRenderer from './Renderer/BoardRenderer';
import BoardRules from './Rules/BoardRules';
import BoardState from './State/BoardState';
import BoardTime from './Time/BoardTime';
declare class BoardSingletonFactory {
    private config;
    private state;
    private rules;
    private time;
    private renderer;
    private gui;
    constructor(config: BoardConfig);
    makeState(): BoardState;
    makeRules(): BoardRules;
    makeTime(): BoardTime;
    makeGui(canvas: HTMLCanvasElement): BoardGui;
    makeRenderer(canvas: HTMLCanvasElement): BoardRenderer;
}
export default BoardSingletonFactory;
