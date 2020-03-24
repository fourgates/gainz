import { Component, OnInit } from '@angular/core';
import { Exercise, ExerciseType } from '../components/exercise/exercise.dt';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [ExerciseService],
  styles: []
})
export class HomeComponent implements OnInit {
  exerciseTypes: ExerciseType[] = [];
  currentExercise: Exercise[] = [];
  previousExercise: Exercise;
  showNewFlg: boolean;
  constructor(private exerciseService: ExerciseService) { }

  // TODO - on change of exercise, call service and get diff exercises
  // TODO - get new data on set type change
  // TODO - create exercise
  // TODO - create set type
  ngOnInit(): void {
    this.exerciseService.getExercise(123, 234).subscribe(res=>{
      this.currentExercise = res;
    })
    this.exerciseService.getExerciseTypes(123).subscribe(res=>{
      this.exerciseTypes = res;
    })
    console.log('currentExercise', this.currentExercise);
  }
  addNewExercise(){
    this.showNewFlg = true;
    if(this.currentExercise.length > 0){
      this.previousExercise = this.currentExercise[this.currentExercise.length - 1];
    }
  }
  saveNewExcercise(newExcercise: Exercise){
    console.log('new', newExcercise);
    // TODO - save
    this.showNewFlg = false;
    this.currentExercise.push(newExcercise);
  }
}
