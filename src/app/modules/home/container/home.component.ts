import { Component, OnInit } from '@angular/core';
import { Exercise, ExerciseType, SetType, UserSet } from '../../exercise/components/exercise/exercise.dt';
import { ExerciseService } from 'src/app/services/exercise.service';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [ExerciseService],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faDumbbell = faDumbbell;
  exerciseTypes: ExerciseType[] = [];
  currentExerciseType: ExerciseType;
  currentSetType: SetType;
  allSetTypes: SetType[] = [];
  currentExercise: Exercise[] = [];
  currentRun = false;
  constructor(private exerciseService: ExerciseService, private messageService: MessageService) { }

  // TODO - create set type
  ngOnInit(): void {
    this.init();
  }
  init(){
    this.exerciseService.getSetTypes().subscribe(res1=>{
      this.allSetTypes = res1;
      this.currentSetType = res1[0];
      this.exerciseService.getExerciseTypes().subscribe(res2=>{
        this.exerciseTypes = res2;
      })
    })
  }
  selectExerciseType(type: ExerciseType){
    this.currentRun = false;
    this.currentExerciseType = type;
    console.log('currentExerciseType', this.currentExerciseType);
    if(!this.currentSetType){
      this.currentSetType = this.allSetTypes[0];
    }
    console.log('this.current', this.currentSetType);
    //this.loadCurrentExercise();
  }
  selectRun(){
    this.currentRun = true;
  }
  back(){
    this.currentExerciseType = undefined; 
    this.currentExercise = undefined
    this.currentRun = false;
  }
}
