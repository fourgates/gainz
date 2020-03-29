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

  // TODO - create exercise
  // TODO - create set type
  // TODO - fix horizontal scroll
  ngOnInit(): void {
    this.exerciseService.getSetTypes().subscribe(res1=>{
      console.log('this.allSetTypes', this.allSetTypes);
      this.allSetTypes = res1;
      this.currentSetType = res1[0];
      this.exerciseService.getExerciseTypes(123).subscribe(res2=>{
        this.exerciseTypes = res2;
        if(res2 && res2.length > 0){
          this.currentExerciseType = res2[0];
        }
        this.exerciseService.getExercise(this.currentExerciseType.exerciseId,this.currentSetType.setTypeLk)
        .subscribe(res3=>{
          this.currentExercise = res3;
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
    this.exerciseService.getExercise(type.exerciseId, this.currentSetType.setTypeLk).subscribe(res=>{
      this.currentExercise = res;
    })
  }
  selectSetType(type: SetType){
    this.currentSetType = type;
    this.exerciseService.getExercise(this.currentExerciseType.exerciseId, 
      this.currentSetType.setTypeLk).subscribe(res=>{
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
