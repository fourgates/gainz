import { Component, OnInit } from '@angular/core';
import { Exercise, ExerciseType, SetType, UserSet } from '../components/exercise/exercise.dt';
import { ExerciseService } from 'src/app/services/exercise.service';
import { MatDialog } from '@angular/material/dialog';
import { NewSetModalComponent } from '../components/new-set-modal/new-set-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  constructor(private exerciseService: ExerciseService, public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

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
  }
  sortExerciseBySeqno(){
    this.currentExercise = this.currentExercise.sort((a,b)=>{
      return a.seqno - b.seqno;
    })
  }
  selectExerciseType(type: ExerciseType){
    this.currentExerciseType = type;
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
      this.addMessage("Set has been deleted");
    })
  }
  addNewSet(){
    let seqno = 0;
    this.currentExercise.forEach(exercise=>{
      if(exercise.seqno >= seqno){
        seqno = exercise.seqno + 1;
      }
    })
    let firstSet = this.currentExercise[0].sets.length === 0;
    let newExercise: Exercise = {exerciseId: this.currentExerciseType.exerciseId,
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

  saveNewExcercise(newExcercise: Exercise){
    console.log('new', newExcercise);
    this.exerciseService.saveUserSet(newExcercise).subscribe(res=>{
      this.loadCurrentExercise();
      this.addMessage("Exercised Saved");
    })
  }
  createExercise(): void {
    const dialogRef = this.dialog.open(NewSetModalComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result', result);
      if(result === undefined){
        return;
      }
      let exercise: Exercise = {description: result.exerciseName};
      this.exerciseService.createExerciseType(exercise).subscribe(res=>{
        this.addMessage(result.exerciseName + " Has Been Created");
      });
    });
  }
  private addMessage(message: string) {
    this._snackBar.open(message, "Close", {
      duration: 2000,
    });
  }
}
