import { Figure } from '../../Figure/Figure';
export declare enum FieldState {
    Idle = "Idle",
    Selected = "Selected",
    Playable = "Playable"
}
export declare enum FieldColor {
    White = "White",
    Black = "Black"
}
export declare class Field {
    private color;
    private figure;
    private state;
    constructor(color: FieldColor);
    getFigure(): Figure | null;
    setFigure(figure: Figure | null): void;
    getColor(): "#FBFAF8" | "#804E49" | "#5A914D" | "#8FAD88";
    getState(): FieldState;
    setState(state: FieldState): void;
}
export declare class WhiteField extends Field {
    constructor();
}
export declare class BlackField extends Field {
    constructor();
}
