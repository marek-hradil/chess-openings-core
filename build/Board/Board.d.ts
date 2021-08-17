import { BoardConfigOptions } from './Config/BoardConfig';
declare class Board {
    private gui;
    private state;
    private rules;
    private time;
    private renderer;
    constructor(canvas: HTMLCanvasElement, options?: BoardConfigOptions);
    moveForwardsInHistory(): void;
    moveBackwardsInHistory(): void;
}
export declare const createBoard: (args: [canvas: HTMLCanvasElement, options?: Readonly<Partial<{
    rules: (import("./Config/BoardEventListeners").BoardRulesEventsListeners & import("./Config/BoardSwitches").BoardRulesSwitches & Omit<import("./Config/BoardData").BoardRulesData, "layout"> & {
        layout?: {
            name: import("../Figure/Figure").FigureName;
            color: import("../Figure/Figure").FigureColor;
            position: string;
            startingPosition?: string | undefined;
        }[] | undefined;
    }) | undefined;
    time: ({
        inevitablePlan?: {
            White: ({
                from: string | null;
                to: string | null;
            } & Omit<{
                color: import("../Figure/Figure").FigureColor;
                name: import("../Figure/Figure").FigureName;
                startingPosition: string;
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
                startingPosition: string;
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
                startingPosition: string;
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
                startingPosition: string;
            }, "id"> & Partial<{
                capture: boolean;
                pawnLongMove: boolean;
                pawnEnPassant: boolean;
                castleLong: boolean;
                castleShort: boolean;
                promotion: import("../Figure/Figure").FigureName | null;
            }>)[];
        } | undefined;
    } & import("./Config/BoardEventListeners").BoardTimeEventsListeners & import("./Config/BoardData").BoardGeneralData) | undefined;
    state: import("./Config/BoardData").BoardStateData | undefined;
    renderer: (import("./Config/BoardData").BoardRendererData & import("./Config/BoardData").BoardGeneralData) | undefined;
    gui: import("./Config/BoardData").BoardGeneralData | undefined;
    general: import("./Config/BoardData").BoardGeneralData;
}>> | undefined]) => Board;
export default Board;
