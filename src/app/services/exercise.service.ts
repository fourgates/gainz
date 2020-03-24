import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Exercise, ExerciseType, SetType } from '../modules/home/components/exercise/exercise.dt';

@Injectable({
    providedIn: 'root',
})
export class ExerciseService {
    constructor() { }

    getExerciseTypes(userId: number):Observable<ExerciseType[]>{
        let fiveToOne: SetType = {
            setTypeId: 1,
            userId: 1,
            sets: [
                {set: 1, rep: 5},
                {set: 2, rep: 4},
                {set: 3, rep: 3},
                {set: 4, rep: 2},
                {set: 5, rep: 1},
            ]
        }
        let threeByThree: SetType = {
            setTypeId: 2,
            userId: 1,
            sets: [
                {set: 1, rep: 3},
                {set: 2, rep: 3},
                {set: 3, rep: 3},
            ]
        }
        let boxSquat: ExerciseType = {
            exerciseId: 123,
            userId: 1,
            description: "Box Squat",
            setTypes: [fiveToOne, threeByThree]
        }
        let bench: ExerciseType = {
            exerciseId: 345,
            userId: 1,
            description: "Bench",
            setTypes: [fiveToOne, threeByThree]
        }
        return of([boxSquat, bench]);
    }
    getExercise(exerciseId: number, setType: number): Observable<Exercise[]>{
        let out: Exercise[] = [];
        for(let i=0;i<3;i++){
            let exercise = {sets: []};
            for(let x=0;x<5;x++){
              let set = {
                setNumber: x + 1,
                prevWeight: 100,
                currentWeight: 110,
                expectedRep: 5 - x,
                actualRep: 5 - x
              };
              exercise.sets.push(set);
            }
            out.push(exercise);
          }
        return of(out);
    }
}