import { Component, OnInit } from '@angular/core';
import { Exercise, ExerciseType, SetType, UserSet } from '../components/exercise/exercise.dt';
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
  constructor(private exerciseService: ExerciseService) { }

  // TODO - create exercise
  // TODO - create set type
  // TODO - fix horizontal scroll
  ngOnInit(): void {
    this.init();
  }
  init(){
    this.exerciseService.getSetTypes().subscribe(res1=>{
      this.allSetTypes = res1;
      this.currentSetType = res1[0];
      this.exerciseService.getExerciseTypes().subscribe(res2=>{
        this.exerciseTypes = res2;
        if(res2 && res2.length > 0){
          this.currentExerciseType = res2[0];
        }
        this.loadCurrentExercise();
      })
    })
  }
  loadCurrentExercise(){
    this.exerciseService.getExercise(this.currentExerciseType.exerciseId,
      this.currentSetType.setTypeLk).subscribe(res=>{
      this.currentExercise = res;
      this.sortExerciseBySeqno();
      this.calculatePrevWeight();
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
    console.log('this.currentExercise', this.currentExercise);
  }
  sortExerciseBySeqno(){
    this.currentExercise = this.currentExercise.sort((a,b)=>{
      return a.seqno - b.seqno;
    })
  }
  selectExerciseType(type: ExerciseType){
    this.currentExerciseType = type;
    console.log('this.currentExerciseType', this.currentExerciseType);
    if(!this.currentSetType){
      this.currentSetType = this.allSetTypes[0];
    }
    this.loadCurrentExercise();
  }
  selectSetType(type: SetType){
    this.currentSetType = type;
    this.loadCurrentExercise();
  }

  deleteUserSet(exercise: Exercise){
    console.log('delete user set', exercise);
    this.exerciseService.deleteUserSet(exercise).subscribe(res=>{
      let findIndex = this.currentExercise.indexOf(exercise);
      this.currentExercise.splice(findIndex, 1);
      this.calculatePrevWeight();
    })
  }
  // FIXME
  addNewExercise(){
    // create a new exercise
    // increment seqno
    // create set arry
    // create sets
    // 
    let newExercise: Exercise = {exerciseId: this.currentExerciseType.exerciseId,
      sets: [], setTypeLk: this.currentSetType.setTypeLk};
      this.currentSetType.sets.forEach(set=>{
        let current: UserSet = {
          exerciseId: newExercise.exerciseId,
          setTypeLk: newExercise.setTypeLk,
          setNumber: set.set,
          prevWeight: 0,
          expectedRep: set.rep,
        };
        newExercise.sets.push(current);
        // this.formSetReps.push(new FormControl());
        // this.formSetWeight.push(new FormControl());
        //this.newExercise.sets.push(current);
      })
      this.currentExercise.push(newExercise);
      this.calculatePrevWeight();
      console.log('newExercise', newExercise);
    if(this.currentExercise.length > 0){
      //this.previousExercise = this.currentExercise[this.currentExercise.length - 1];
    }
  }
  // TODO - setup new exercise and pus using this.previous exercise
  //        then we can get rid of that class variable

  // private setupNewExercise(){
  //   this.newExercise = {exerciseId: this.exercise.exerciseId,
  //     sets: []};
  //  this.exercise.sets.forEach(set=>{
  //    let current: Set = {
  //        exerciseId: this.newExercise.exerciseId,
  //        setTypeLk: this.setType.setTypeLk,
  //        setNumber: set.setNumber,
  //        prevWeight: set.currentWeight,
  //        expectedRep: set.expectedRep,
  //    };
  //    this.formSetReps.push(new FormControl());
  //    this.formSetWeight.push(new FormControl());
  //    this.newExercise.sets.push(current);
  //  })
  //  this.data = this.newExercise.sets;
  // }

  saveNewExcercise(newExcercise: Exercise){
    console.log('new', newExcercise);
    this.exerciseService.saveUserSet(newExcercise).subscribe(res=>{
      this.loadCurrentExercise();
    })
  }
}
