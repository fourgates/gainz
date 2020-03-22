import { Component, OnInit, Input } from '@angular/core';
import { Exercise, Set } from '../exercise/exercise.dt';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-exercise',
  templateUrl: './new-exercise.component.html',
  styles: []
})
export class NewExerciseComponent implements OnInit {

  @Input() exercise: Exercise;
  data: Set[];
  form: FormGroup;// = this.fb.group({ 'currentWeight': null, 'actualRep': null});
  formSetReps: FormArray;
  formSetWeight: FormArray;
  // TODO 
  // 1. use a form array
  // 2. create a table component. abstract headers and property
  // 3. exercise needs adjusted weight
  // 4. create editable table (new-exercise-component) 
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
    })
    this.data = this.exercise.sets;
    this.form = new FormGroup({
      sets: this.formSetReps,
      weights: this.formSetWeight
    });
    console.log('form', this.form);
  }
  save(){
    console.log('save', this.formSetReps.value);
    console.log('save', this.formSetWeight.value);
  }
  get sets(): FormArray { return this.form.get('sets') as FormArray; }
  get weights(): FormArray { return this.form.get('weights') as FormArray; }
}