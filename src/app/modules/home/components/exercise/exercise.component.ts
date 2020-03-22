import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from './exercise.dt';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styles: ['table{ width: 100%}']
})
export class ExerciseComponent implements OnInit {

  @Input() exercise: Exercise;
  
  // TODO 
  // 3. create a new exercise component
  // 4. create a table component. abstract headers and property
  // 5. exercise needs adjusted weight
  // 6. create editable table (new-exercise-component) 
  constructor() { }
  displayedColumns: string[] = ['setNumber', 'prevWeight', 'currentWeight', 'expectedRep', 'actualRep', 'percentIncrease'];
  ngOnInit(): void {
    console.log('this', this.exercise);
  }

}
