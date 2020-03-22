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