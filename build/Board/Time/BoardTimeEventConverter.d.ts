import { MoveEvent } from '../Rules/MovementRule';
import BoardTimeRecord from './BoardTimeRecord';
declare class BoardTimeEventConverter {
    static convertMoveEventsToRecord(events: MoveEvent[]): BoardTimeRecord;
    private static isCapture;
    private static getPromotedFigure;
    private static isCastle;
    private static isPawnLongMove;
    private static isEnPassant;
    private static extractMainMove;
}
export default BoardTimeEventConverter;
