export interface Exercise{
    sets: Set[]
}
interface Set{
    setNumber: number;
    prevWeight: number;
    currentWeight: number;
    expectedRep: number;
    actualRep: number;
}