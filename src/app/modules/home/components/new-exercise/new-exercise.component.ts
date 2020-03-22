import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Exercise, Set } from '../exercise/exercise.dt';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.component.html',
  styles: []
})
export class NewExerciseComponent implements OnInit {

  @Input() exercise: Exercise;
  @Output() saveExercise = new EventEmitter<Exercise>();

  data: Set[];
  form: FormGroup;// = this.fb.group({ 'currentWeight': null, 'actualRep': null});
  formSetReps: FormArray;
  formSetWeight: FormArray;
  // TODO 
  // 1. use a form array
  // 2. create a table component. abstract headers and property
  // 3. exercise needs adjusted weight
  // 4. create editable table (new-exercise-component) 
  // 5. implement adjusted weight
  constructor(private fb: FormBuilder) { 
    this.formSetReps = fb.array([]);
    this.formSetWeight = fb.array([]);
  }
  displayedColumns: string[] = ['setNumber', 'prevWeight', 'currentWeight', 'expectedRep', 'actualRep', 'percentChange'];
  ngOnInit(): void {
    this.exercise.sets.forEach(set=>{
      set.percentChange = (set.prevWeight / (set.currentWeight  - set.prevWeight)).toFixed(0);
      this.formSetReps.push(new FormControl());
      this.formSetWeight.push(new FormControl());
      set.prevWeight = set.currentWeight;
    })
    this.data = this.exercise.sets;

    
    this.form = new FormGroup({
      sets: this.formSetReps,
      weights: this.formSetWeight
    });
    
    // TODO -- use on value change of these values update percent change
    //         and adjusted weight
    console.log('form', this.form);
  }
  save(){
    console.log('save', this.formSetReps.value);
    console.log('save', this.formSetWeight.value);

    let reps: [] = this.formSetReps.value;
    let weights: [] = this.formSetWeight.value;

    let out: Exercise =  {sets: []};
    this.exercise.sets.forEach((previousSet, i)=>{
      let current: Set = {
          setNumber: previousSet.setNumber,
          prevWeight: previousSet.currentWeight,
          currentWeight: weights[i],
          expectedRep: previousSet.expectedRep,
          actualRep: reps[i],
      };
      current.percentChange = this.calculatePercentChange(current);
      out.sets.push(current);
    })
    console.log('out', out);
    this.saveExercise.emit(out);
  }
  get sets(): FormArray { return this.form.get('sets') as FormArray; }
  get weights(): FormArray { return this.form.get('weights') as FormArray; }
  calculatePercentChange(set: Set){
    return (set.prevWeight / (set.currentWeight  - set.prevWeight)).toFixed(0);
  }
}
