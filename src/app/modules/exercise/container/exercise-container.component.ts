import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';
import { Exercise, SetType, ExerciseType, UserSet } from '../components/exercise/exercise.dt';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-exercise-container',
  templateUrl: './exercise-container.component.html',
  styleUrls: ['./exercise-container.component.css']
})
export class ExerciseContainerComponent implements OnInit {

  constructor(private route: ActivatedRoute, private exerciseService: ExerciseService,
    private messageService: MessageService) { }

  exerciseId: number;
  exerciseTypes: ExerciseType[] = [];
  currentExercise: Exercise[] = [];
  currentSetType: SetType;
  allSetTypes: SetType[] = [];
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.exerciseId = parseInt(params.get('exerciseId'));
      this.init();
    })
  }
  init(){
    this.exerciseService.getSetTypes().subscribe(res1=>{
      this.allSetTypes = res1;
      this.currentSetType = res1[0];
      this.exerciseService.getExerciseTypes().subscribe(res2=>{
        this.exerciseTypes = res2;
        this.loadCurrentExercise();
      })
    })
  }
  loadCurrentExercise(){
    this.exerciseService.getExercise(this.exerciseId,
      this.currentSetType.setTypeLk).subscribe(res=>{
      this.currentExercise = res;
      this.sortExerciseBySeqno();
      this.calculatePrevWeight();
    })
  }
  sortExerciseBySeqno(){
    this.currentExercise = this.currentExercise.sort((a,b)=>{
      return a.seqno - b.seqno;
    })
  }
  calculatePrevWeight(){
    let current: Exercise;
    if(this.currentExercise.length == 1){
      this.currentExercise[0].sets.forEach(set=>{
        set.prevWeight = 0;
      })
    }
    for(let i=0;i<this.currentExercise.length;i++){
      current = this.currentExercise[i];
      if(i > 0){
        let previous: Exercise = this.currentExercise[i-1];
        previous.sets.forEach((set, x)=>{
          current.sets[x].prevWeight = set.adjustedWeight;
        })
      }
    }
  }
  saveNewExcercise(newExcercise: Exercise){
    this.exerciseService.saveUserSet(newExcercise).subscribe(res=>{
      this.loadCurrentExercise();
      this.messageService.addMessage("Exercised Saved");
    })
  }
  deleteUserSet(exercise: Exercise){
    this.exerciseService.deleteUserSet(exercise).subscribe(res=>{
      let findIndex = this.currentExercise.indexOf(exercise);
      this.currentExercise.splice(findIndex, 1);
      this.calculatePrevWeight();
      this.messageService.addMessage("Set has been deleted");
    })
  }
  selectSetType(type: SetType){
    this.currentSetType = type;
    this.loadCurrentExercise();
  }
  addNewSet(){
    let seqno = 0;
    this.currentExercise.forEach(exercise=>{
      if(exercise.seqno >= seqno){
        seqno = exercise.seqno + 1;
      }
    })
    let firstSet = this.currentExercise[0].sets.length === 0;
    let newExercise: Exercise = {exerciseId: this.exerciseId,
      sets: [], setTypeLk: this.currentSetType.setTypeLk, seqno: seqno};
      this.currentSetType.sets.forEach(set=>{
        let current: UserSet = {
          exerciseId: newExercise.exerciseId,
          setTypeLk: newExercise.setTypeLk,
          setNumber: set.set,
          prevWeight: 0,
          expectedRep: set.rep,
          seqno: seqno
        };
        newExercise.sets.push(current);
      })
      if(firstSet){
        this.currentExercise[0] = newExercise;
      }
      else{
        this.currentExercise.push(newExercise);
      }
      this.calculatePrevWeight();
  }
}
