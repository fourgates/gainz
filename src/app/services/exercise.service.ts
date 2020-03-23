import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Exercise } from '../modules/home/components/exercise/exercise.dt';

@Injectable({
    providedIn: 'root',
})
export class ExerciseService {
    constructor() { }

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