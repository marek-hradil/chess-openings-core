import { BoardConfigOptions } from './Config/BoardConfig';
declare class Board {
    private gui;
    private state;
    private rules;
    private time;
    private renderer;
    constructor(canvas: HTMLCanvasElement, options?: BoardConfigOptions);
}
export declare const createBoard: (args: [canvas: HTMLCanvasElement, options?: Partial<{
    rules: (import("./Config/BoardEventListeners").BoardRulesEventsListeners & import("./Config/BoardSwitches").BoardRulesSwitches & import("./Config/BoardData").BoardRulesData) | undefined;
    time: ({
        inevitablePlan?: {
            White: ({
                from: string | null;
                to: string | null;
            } & Omit<{
                color: import("../Figure/Figure").FigureColor;
                name: import("../Figure/Figure").FigureName;
                id: string | null;
            }, "id"> & Partial<{
                capture: boolean;
                pawnLongMove: boolean;
                pawnEnPassant: boolean;
                castleLong: boolean;
                castleShort: boolean;
                promotion: import("../Figure/Figure").FigureName | null;
            }>)[];
            Black: ({
                from: string | null;
                to: string | null;
            } & Omit<{
                color: import("../Figure/Figure").FigureColor;
                name: import("../Figure/Figure").FigureName;
                id: string | null;
            }, "id"> & Partial<{
                capture: boolean;
                pawnLongMove: boolean;
                pawnEnPassant: boolean;
                castleLong: boolean;
                castleShort: boolean;
                promotion: import("../Figure/Figure").FigureName | null;
            }>)[];
        } | undefined;
        followablePlan?: {
            White: ({
                from: string | null;
                to: string | null;
            } & Omit<{
                color: import("../Figure/Figure").FigureColor;
                name: import("../Figure/Figure").FigureName;
                id: string | null;
            }, "id"> & Partial<{
                capture: boolean;
                pawnLongMove: boolean;
                pawnEnPassant: boolean;
                castleLong: boolean;
                castleShort: boolean;
                promotion: import("../Figure/Figure").FigureName | null;
            }>)[];
            Black: ({
                from: string | null;
                to: string | null;
            } & Omit<{
                color: import("../Figure/Figure").FigureColor;
                name: import("../Figure/Figure").FigureName;
                id: string | null;
            }, "id"> & Partial<{
                capture: boolean;
                pawnLongMove: boolean;
                pawnEnPassant: boolean;
                castleLong: boolean;
                castleShort: boolean;
                promotion: import("../Figure/Figure").FigureName | null;
            }>)[];
        } | undefined;
    } & import("./Config/BoardEventListeners").BoardTimeEventsListeners) | undefined;
    state: import("./Config/BoardData").BoardStateData | undefined;
    renderer: import("./Config/BoardData").BoardRendererData | undefined;
}> | undefined]) => Board;
export default Board;
