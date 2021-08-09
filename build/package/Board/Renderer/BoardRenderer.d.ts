import BoardRendererConfig from '../Config/BoardRendererConfig';
import BoardState from '../State/BoardState';
export declare class BoardRenderer {
    private sprite;
    private context;
    private sizes;
    private data;
    constructor(config: BoardRendererConfig, canvas: HTMLCanvasElement);
    render(state: BoardState): void;
}
export default BoardRenderer;
