import { Component, OnInit } from '@angular/core';
import { Exercise, ExerciseType, SetType } from '../components/exercise/exercise.dt';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [ExerciseService],
  styles: ['.mat-select-value {color: grey;}']
})
export class HomeComponent implements OnInit {
  exerciseTypes: ExerciseType[] = [];
  currentExerciseType: ExerciseType;
  currentSetType: SetType;
  allSetTypes: SetType[] = [];
  currentExercise: Exercise[] = [];
  previousExercise: Exercise;
  showNewFlg: boolean;
  constructor(private exerciseService: ExerciseService) { }

  // TODO - dynamically change set types
  // TODO - create exercise
  // TODO - create set type
  // TODO - fix horizontal scroll
  ngOnInit(): void {
    this.exerciseService.getSetTypes().subscribe(res=>{
      this.allSetTypes = res;
      this.currentSetType = res[0];
      this.exerciseService.getExerciseTypes(123).subscribe(res=>{
        this.exerciseTypes = res;
        if(res && res.length > 0){
          this.currentExerciseType = res[0];
        }
        this.exerciseService.getExercise(this.currentExerciseType.exerciseId,this.currentSetType.setTypeId).subscribe(res=>{
          this.currentExercise = res;
        })
      })
    })
    console.log('currentExercise', this.currentExercise);
  }
  selectExerciseType(type: ExerciseType){
    this.currentExerciseType = type;
    console.log('this.currentExerciseType', this.currentExerciseType);
    if(!this.currentSetType){
      this.currentSetType = this.allSetTypes[0];
    }
    this.exerciseService.getExercise(type.exerciseId, this.currentSetType.setTypeId).subscribe(res=>{
      this.currentExercise = res;
    })
  }
  selectSetType(type: SetType){
    this.currentSetType = type;
    this.exerciseService.getExercise(this.currentExerciseType.exerciseId, 
      this.currentSetType.setTypeId).subscribe(res=>{
      this.currentExercise = res;
    })
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
