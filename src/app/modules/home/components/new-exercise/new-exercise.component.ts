import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Exercise, UserSet, SetType } from '../exercise/exercise.dt';
import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.component.html',
  styles: [`
    .mat-input-element:disabled, 
    .mat-form-field-type-mat-native-select.mat-form-field-disabled 
    .mat-form-field-infix::after {
      color: darkolivegreen;
    }
`]
})
export class NewExerciseComponent implements OnInit {

  @Input() exercise: Exercise;
  @Input() setType: SetType;
  @Output() saveExercise = new EventEmitter<Exercise>();
  @Output() cancelExercise = new EventEmitter<Exercise>();
  @Output() deleteSet = new EventEmitter<Exercise>();
  @Output() reorderExercise = new EventEmitter<Exercise>();
  @Output() calculatePrevWeight = new EventEmitter<Exercise>();

  data: UserSet[];
  form: FormGroup;// = this.fb.group({ 'currentWeight': null, 'actualRep': null});
  formSetReps: FormArray;
  formSetWeight: FormArray;
  editMode = false;

  // TODO 
  // 1. create a table component. abstract headers and property
  // 2. combine exercise & new-exercise
  constructor(private fb: FormBuilder) { 
  }
  displayedColumns: string[] = ['setNumber', 'prevWeight', 'currentWeight', 'expectedRep', 'actualRep', 'adjustedWeight', 'percentChange'];
  ngOnInit(): void {
    this.form = new FormGroup({});
    this.calculatePercentChange();
    this.initForm();
  }
  private initForm(){
    // create a form array for set and reps since they are editable
    this.formSetReps = this.fb.array([]);
    this.formSetWeight = this.fb.array([]);
    this.exercise.sets.forEach(set=>{
      this.formSetReps.push(new FormControl(set.actualRep));
      this.formSetWeight.push(new FormControl(set.currentWeight));
    })

    // data = data for table
    this.data = this.exercise.sets;

    // setup form
    this.form = new FormGroup({
      sets: this.formSetReps,
      weights: this.formSetWeight,
      seqno: new FormControl(this.exercise.seqno)
    });
    let newSet = this.exercise.sets.find(set=>set.setId == undefined);
    if(!newSet){
      this.form.disable();
    }
    this.calculateChange(this.form.get('sets'));
    this.calculateChange(this.form.get('weights'));
    this.reorderChange(this.form.get('seqno'));
    console.log('form', this.form);
  }
  private reorderChange(form: AbstractControl){
    form.valueChanges
      .pipe(
          debounceTime(200),
          distinctUntilChanged()
      )
      .subscribe({
          next: (value) => {
              // update order of exercises
              this.exercise.seqno = this.form.get('seqno').value;
              this.reorderExercise.emit(this.exercise);
          }
      });
  }
  private calculateChange(form: AbstractControl){
    form.valueChanges
      .pipe(
          debounceTime(200),
          distinctUntilChanged()
      )
      .subscribe({
          next: (value) => {
              //use value here
              this.calculateAdjustedWeight();
              this.calculatePercentChange();
              this.calculatePrevWeight.emit(this.exercise);
          }
      });
  }
  // subtract 10lb for every missed rep
  // currentWeight - ((expectedRep - actualRep) * 10)
  private calculateAdjustedWeight(){
    this.exercise.sets.forEach((set, i)=>{
      let currentWeight = this.formSetWeight.value[i];
      let actualRep = this.formSetReps.value[i];

      if(!isNaN(currentWeight) && !isNaN(set.expectedRep) && !isNaN(actualRep)){
        set.adjustedWeight = (currentWeight - ((set.expectedRep - actualRep) * 10));
      }
    })
  }
  private calculatePercentChange(){
    this.exercise.sets.forEach((set, i)=>{
      let currentWeight = set.adjustedWeight;

      if(!isNaN(set.prevWeight) && !isNaN(currentWeight))
        if(currentWeight  - set.prevWeight == 0){
          set.percentChange = "0";
        }
        else{
          // increase / previous
          let a = currentWeight - set.prevWeight;
          let b = set.prevWeight;
          let c = a / b * 100;
          set.percentChange = c.toFixed(0);
        }
    });
  }
  save(){
    let reps: [] = this.formSetReps.value;
    let weights: [] = this.formSetWeight.value;

    let out: Exercise =  {exerciseId: this.exercise.exerciseId,
       sets: []};
    this.exercise.sets.forEach((previousSet, i)=>{
      let current: UserSet = {
          setId: previousSet.setId,
          setNumber: previousSet.setNumber,
          prevWeight: previousSet.prevWeight,
          expectedRep: previousSet.expectedRep,

          seqno: this.exercise.seqno,
          exerciseId: this.exercise.exerciseId,
          setTypeLk: this.setType.setTypeLk,
          currentWeight: weights[i],
          actualRep: reps[i],
          adjustedWeight: this.exercise.sets[i].adjustedWeight // this doesnt seem right
      };
      out.sets.push(current);
    })
    this.calculatePercentChange();
    console.log('out', out);
    this.saveExercise.emit(out);
  }
  delete(){
    this.deleteSet.emit(this.exercise);
  } 
  cancel(){
    this.initForm();
    this.form.disable();
  }
  get sets(): FormArray { return this.form.get('sets') as FormArray; }
  get weights(): FormArray { return this.form.get('weights') as FormArray; }
}
