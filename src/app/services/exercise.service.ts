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
        return this.http.get<ExerciseType[]>(this.urlConfig + 'exercise/types');
    }
    getSetTypes(): Observable<SetType[]>{
        // exercise type endpoint
        this.http.get<SetType[]>(this.urlConfig + 'exercise/types').subscribe(res=>{
            console.log('res123', res);
        })
        // exercise endpoint
        this.http.get<SetType[]>(this.urlConfig + 'exercise/1/threeToThree').subscribe(res=>{
            console.log('res456', res);
        })
        return this.http.get<SetType[]>(this.urlConfig + 'lk-set-types');
    }
    getExercise(exerciseId: number, setTypeLk: string): Observable<Exercise[]>{
        return this.http.get<Exercise[]>(this.urlConfig + `exercise/${exerciseId}/${setTypeLk}`);
    }
}