export declare type BoardRulesSwitches = {
    shouldEndOnPlanViolation?: boolean;
    shouldEnforcePlan?: boolean;
};
declare type Switches = (BoardRulesSwitches & {
    type: 'BoardRules';
}) | never;
declare class BoardSwitches {
    shouldEndOnPlanViolation: boolean;
    shouldEnforcePlan: boolean;
    constructor(switches: Switches);
}
export default BoardSwitches;
