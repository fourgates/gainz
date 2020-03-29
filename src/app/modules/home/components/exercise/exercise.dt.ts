export interface Exercise{
    exerciseId: number;
    sets: Set[]
}
export interface Set{
    exerciseId: number;
    setTypeId?: number;
    setTypeLk: string;
    setNumber: number;
    prevWeight: number;
    currentWeight?: number;
    expectedRep: number;
    actualRep?: number;
    percentChange?: string;
    adjustedWeight?: number;
}
export interface ExerciseType{
    exerciseId: number;
    userId: number
    description: string;
}
export interface SetType{
    setTypeLk: string;
    description: string;
    sets: SetRep[];
}
export interface SetRep{
    set: number;
    rep: number;
}