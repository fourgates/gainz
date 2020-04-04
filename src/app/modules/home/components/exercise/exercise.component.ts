import { Component, OnInit, Input } from '@angular/core';
import { Exercise, UserSet } from './exercise.dt';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styles: ['table{ width: 100%}']
})
export class ExerciseComponent implements OnInit {

  @Input() exercise: Exercise;
  data: UserSet[];
  // TODO 
  // 3. create a new exercise component
  // 4. create a table component. abstract headers and property
  // 5. exercise needs adjusted weight
  // 6. create editable table (new-exercise-component) 
  constructor() { }
  displayedColumns: string[] = ['setNumber', 'prevWeight', 'currentWeight', 'expectedRep', 'actualRep', 'percentChange'];
  ngOnInit(): void {
    this.exercise.sets.forEach(set=>{
      set.percentChange = this.calculatePercentChange(set)
    })
    this.data = this.exercise.sets;
  }

  calculatePercentChange(set: UserSet){
    return (set.prevWeight / (set.currentWeight  - set.prevWeight)).toFixed(0);
  }
}
