import { BoardConfigOptions } from './Config/BoardConfig';
declare class Board {
    private gui;
    private state;
    private rules;
    private time;
    private renderer;
    constructor(options: BoardConfigOptions, canvas: HTMLCanvasElement);
}
export default Board;
