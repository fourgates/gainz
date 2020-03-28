export interface Exercise{
    exerciseId: number;
    setTypeId: number;
    sets: Set[]
}
export interface Set{
    exerciseId: number;
    setTypeId: number;
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
    setTypeId: number;
    description: string;
    userId: number
    sets: SetRep[];
}
export interface SetRep{
    set: number;
    rep: number;
}