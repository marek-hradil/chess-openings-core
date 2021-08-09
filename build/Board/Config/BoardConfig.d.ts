import { BoardGeneralData } from './BoardData';
import BoardGuiConfig from './BoardGuiConfig';
import BoardRendererConfig from './BoardRendererConfig';
import BoardRulesConfig from './BoardRulesConfig';
import BoardStateConfig from './BoardStateConfig';
import BoardTimeConfig from './BoardTimeConfig';
export declare type BoardConfigOptions = Partial<{
    rules: ConstructorParameters<typeof BoardRulesConfig>[0];
    time: ConstructorParameters<typeof BoardTimeConfig>[0];
    state: ConstructorParameters<typeof BoardStateConfig>[0];
    renderer: ConstructorParameters<typeof BoardRendererConfig>[0];
    gui: ConstructorParameters<typeof BoardGuiConfig>[0];
    general: BoardGeneralData;
}>;
declare class BoardConfig {
    rules: BoardRulesConfig;
    time: BoardTimeConfig;
    state: BoardStateConfig;
    renderer: BoardRendererConfig;
    gui: BoardGuiConfig;
    constructor(options: BoardConfigOptions);
}
export default BoardConfig;
