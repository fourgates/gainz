export interface Exercise{
    sets: Set[]
}
export interface Set{
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
    setTypes: SetType[];
}
export interface SetType{
    setTypeId: number;
    userId: number
    sets: SetRep[];
}
export interface SetRep{
    set: number;
    rep: number;
}