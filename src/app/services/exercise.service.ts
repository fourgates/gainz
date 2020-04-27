import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise, ExerciseType, SetType } from '../modules/exercise/components/exercise/exercise.dt';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})

export class ExerciseService {
    constructor(private http: HttpClient) { }

    boxSquatId = 123;
    benchId = 345;
    urlConfig = 'http://localhost:3000/';

    getExerciseTypes():Observable<ExerciseType[]>{
        return this.http.get<ExerciseType[]>(this.urlConfig + 'exercise/types');
    }
    getSetTypes(): Observable<SetType[]>{
        return this.http.get<SetType[]>(this.urlConfig + 'sets/lk-set-types');
    }
    getExercise(exerciseId: number, setTypeLk: string): Observable<Exercise[]>{
        return this.http.get<Exercise[]>(this.urlConfig + `exercise/${exerciseId}/${setTypeLk}`);
    }
    saveUserSet(exercise: Exercise):Observable<Exercise>{
        // TODO - set seqno
        return this.http.post<Exercise>(this.urlConfig + `exercise/sets`, exercise);
    }
    deleteUserSet(exercise: Exercise){
        return this.http.post<number>(this.urlConfig 
            + `sets/delete`, exercise);
    }
    createExerciseType(exercise: Exercise){
        return this.http.post<Exercise>(this.urlConfig 
            + `exercise`, exercise); 
    }
    deleteExerciseType(exercise: Exercise){
        return this.http.delete<Exercise>(this.urlConfig 
            + `exercise/${exercise.exerciseId}`); 
    }
}