import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Exercise, ExerciseType, SetType } from '../modules/home/components/exercise/exercise.dt';

@Injectable({
    providedIn: 'root',
})
export class ExerciseService {
    constructor() { }

    getExerciseTypes(userId: number):Observable<ExerciseType[]>{
        let boxSquat: ExerciseType = {
            exerciseId: 123,
            userId: 1,
            description: "Box Squat",
        }
        let bench: ExerciseType = {
            exerciseId: 345,
            userId: 1,
            description: "Bench",
        }
        return of([boxSquat, bench]);
    }
    getSetTypes(): Observable<SetType[]>{
        let fiveToOne: SetType = {
            setTypeId: 1,
            description: '5, 4, 3, 2, 1',
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
            description: '3, 3, 3',
            userId: 1,
            sets: [
                {set: 1, rep: 3},
                {set: 2, rep: 3},
                {set: 3, rep: 3},
            ]
        }
        return of([fiveToOne, threeByThree]);
    }
    getExercise(exerciseId: number): Observable<Exercise[]>{
        if(exerciseId === 123){
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
        else if(exerciseId === 345){
            let out: Exercise[] = [];
            for(let i=0;i<3;i++){
                let exercise = {sets: []};
                for(let x=0;x<3;x++){
                  let set = {
                    setNumber: x + 1,
                    prevWeight: 50,
                    currentWeight: 60,
                    expectedRep: 3 - x,
                    actualRep: 3 - x
                  };
                  exercise.sets.push(set);
                }
                out.push(exercise);
              }
            return of(out);
        }
    }
}