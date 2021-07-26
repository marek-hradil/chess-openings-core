export declare type BoardRulesSwitches = {
    shouldEndOnPlanViolation?: boolean;
    shouldEnforcePlan?: boolean;
};
export declare type BoardRendererSwitches = {
    shouldRenderAsBlack?: boolean;
};
declare type Switches = (BoardRulesSwitches & {
    type: 'BoardRules';
}) | (BoardRendererSwitches & {
    type: 'BoardRenderer';
}) | never;
declare class BoardSwitches {
    shouldEndOnPlanViolation: boolean;
    shouldEnforcePlan: boolean;
    shouldRenderAsBlack: boolean;
    constructor(switches: Switches);
}
export default BoardSwitches;
