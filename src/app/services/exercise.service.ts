import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Exercise, ExerciseType, SetType } from '../modules/home/components/exercise/exercise.dt';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})

// TODO - integrate getSetTypes
export class ExerciseService {
    constructor(private http: HttpClient) { }

    boxSquatId = 123;
    benchId = 345;
    urlConfig = 'http://localhost:3000/';

    getExerciseTypes(userId: number):Observable<ExerciseType[]>{
        this.http.get('http://localhost:3000/users').subscribe(res=>{
            console.log('res', res);
        })
        let boxSquat: ExerciseType = {
            exerciseId: this.boxSquatId,
            userId: 1,
            description: "Box Squat",
        }
        let bench: ExerciseType = {
            exerciseId: this.benchId,
            userId: 1,
            description: "Bench",
        }
        return of([boxSquat, bench]);
    }
    getSetTypes(): Observable<SetType[]>{
        this.http.get<SetType[]>(this.urlConfig + 'exercise').subscribe(res=>{
            console.log('res123', res);
        })
        return this.http.get<SetType[]>(this.urlConfig + 'lk-set-types');
    }
    fiveToOneLk = "fiveToOne";
    threeToThreeLk = "threeToThree";
    exercise1SetId = 10;
    exercise2SetId = 20;
    exercise3SetId = 30;
    getExercise(exerciseId: number, setTypeLk: string): Observable<Exercise[]>{
        let out: Exercise[] = [];
        for(let i=0;i<3;i++){
            let exercise: Exercise = {exerciseId: this.boxSquatId, sets: []};
            for(let x=0;x<5;x++){
              let set = {
                exerciseId: exercise.exerciseId,
                setTypeId: this.exercise1SetId + i + x,
                setTypeLk: this.fiveToOneLk,
                setNumber: x + 1,
                prevWeight: 100,
                currentWeight: 110,
                expectedRep: 5 - x,
                actualRep: 5 - x
              };
              if(setTypeLk === set.setTypeLk){
                exercise.sets.push(set);
              }
            }
            out.push(exercise);
        }
        for(let i=0;i<3;i++){
            let exercise: Exercise = {exerciseId:this.boxSquatId, sets: []};
            for(let x=0;x<3;x++){
              let set = {
                exerciseId: exercise.exerciseId,
                setTypeId: this.exercise2SetId + i + x,
                setTypeLk: this.threeToThreeLk,
                setNumber: x + 1,
                prevWeight: 150,
                currentWeight: 175,
                expectedRep: 3 - x,
                actualRep: 3 - x
              };
              if(setTypeLk === set.setTypeLk){
                exercise.sets.push(set);
              }
            }
            out.push(exercise);
        }
        for(let i=0;i<3;i++){
            let exercise : Exercise = {exerciseId: this.benchId, sets: []};
            for(let x=0;x<3;x++){
                let set = {
                exerciseId: exercise.exerciseId,
                setTypeId: this.exercise3SetId + i + x,
                setTypeLk: this.threeToThreeLk,
                setNumber: x + 1,
                prevWeight: 50,
                currentWeight: 60,
                expectedRep: 3 - x,
                actualRep: 3 - x
                };
                if(setTypeLk === set.setTypeLk){
                    exercise.sets.push(set);
                }
            }
            out.push(exercise);
        }
        let filtered = out.filter(e=>e.exerciseId === exerciseId);
        console.log('filtered', filtered);
        return of(filtered);
    }
}