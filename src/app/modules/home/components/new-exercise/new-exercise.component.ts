import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Exercise, Set, SetType } from '../exercise/exercise.dt';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.component.html',
  styles: []
})
export class NewExerciseComponent implements OnInit {

  @Input() exercise: Exercise;
  @Input() setType: SetType;
  @Output() saveExercise = new EventEmitter<Exercise>();
  @Output() cancelExercise = new EventEmitter<Exercise>();

  data: Set[];
  form: FormGroup;// = this.fb.group({ 'currentWeight': null, 'actualRep': null});
  formSetReps: FormArray;
  formSetWeight: FormArray;
  editMode = false;

  // TODO 
  // 1. create a table component. abstract headers and property
  // 2. combine exercise & new-exercise
  constructor(private fb: FormBuilder) { 
    this.formSetReps = fb.array([]);
    this.formSetWeight = fb.array([]);
  }
  displayedColumns: string[] = ['setNumber', 'prevWeight', 'currentWeight', 'expectedRep', 'actualRep', 'adjustedWeight', 'percentChange'];
  ngOnInit(): void {
    this.setupNewExercise();
    this.calculatePercentChange();
    this.form = new FormGroup({
      sets: this.formSetReps,
      weights: this.formSetWeight
    });
    this.form.disable();
    this.form.valueChanges
    .pipe(
        debounceTime(200),
        distinctUntilChanged()
    )
    .subscribe({
        next: (value) => {
            //use value here
            this.calculateAdjustedWeight();
            this.calculatePercentChange();
        }
    });
    console.log('form', this.form);
  }
  private setupNewExercise(){
    this.exercise.sets.forEach(set=>{
        this.formSetReps.push(new FormControl(set.actualRep));
        this.formSetWeight.push(new FormControl(set.currentWeight));
    })
    this.data = this.exercise.sets;
  }

  // subtract 10lb for every missed rep
  // currentWeight - ((expectedRep - actualRep) * 10)
  calculateAdjustedWeight(){
    this.exercise.sets.forEach((set, i)=>{
      let currentWeight = this.formSetWeight.value[i];
      let actualRep = this.formSetReps.value[i];

      if(!isNaN(currentWeight) && !isNaN(set.expectedRep) && !isNaN(actualRep)){
        set.adjustedWeight = (currentWeight - ((set.expectedRep - actualRep) * 10));
      }
    })
    console.log('adjusted weights', this.exercise);
  }
  calculatePercentChange(){
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
    console.log('save', this.formSetReps.value);
    console.log('save', this.formSetWeight.value);

    let reps: [] = this.formSetReps.value;
    let weights: [] = this.formSetWeight.value;

    let out: Exercise =  {exerciseId: this.exercise.exerciseId,
       sets: []};
    this.exercise.sets.forEach((previousSet, i)=>{
      let current: Set = {
          exerciseId: this.exercise.exerciseId,
          setTypeLk: this.setType.setTypeLk,
          setNumber: previousSet.setNumber,
          prevWeight: previousSet.currentWeight,
          currentWeight: weights[i],
          expectedRep: previousSet.expectedRep,
          actualRep: reps[i],
          adjustedWeight: this.exercise.sets[i].adjustedWeight // this doesnt seem right
      };
      out.sets.push(current);
    })
    this.calculatePercentChange();
    console.log('out', out);
    this.saveExercise.emit(out);
  }
  cancel(){
    this.form.disable();
  }
  get sets(): FormArray { return this.form.get('sets') as FormArray; }
  get weights(): FormArray { return this.form.get('weights') as FormArray; }
}
