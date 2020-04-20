export interface Run{
    distance?: number;
    hours?: number;
    mins?: number;
    seconds?: number;
}
export interface RunWeek{
    week?: number;
    mon?: Run;
    tue?: Run;
    wed?: Run;
    thur?: Run;
    fri?: Run;
    sat?: Run;
    sun?: Run;
    max?: number;
    total?: number;
    daysTrained?: number;
}
export interface RunGroup{
    description?: string;
    runs: RunWeek[];
}