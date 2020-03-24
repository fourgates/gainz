import { Component, OnInit } from '@angular/core';
import { Exercise } from '../components/exercise/exercise.dt';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [ExerciseService],
  styles: []
})
export class HomeComponent implements OnInit {
  boxSquats: Exercise[] = [];
  showNewFlg: boolean;
  constructor(private exerciseService: ExerciseService) { }

  // TODO - on change of exercise, call service and get diff exercises
  // TODO - get new data on set type change
  // TODO - create exercise
  // TODO - create set type
  ngOnInit(): void {
    this.exerciseService.getExercise(123, 234).subscribe(res=>{
      this.boxSquats = res;
    })
    console.log('box', this.boxSquats);
  }
  addNewExercise(){
    console.log('add new exercise');
    this.showNewFlg = true;
  }
  saveNewExcercise(newExcercise: Exercise){
    console.log('new', newExcercise);
    // TODO - save
    this.showNewFlg = false;
    this.boxSquats.push(newExcercise);
  }
}
