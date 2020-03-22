import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styles: ['table{ width: 100%}']
})
export class ExerciseComponent implements OnInit {

  constructor() { }
  boxSquats: any[] = [];
  displayedColumns: string[] = ['setNumber', 'prevWeight', 'currentWeight', 'expectedRep', 'actualRep', 'percentIncrease'];
  ngOnInit(): void {
    for(let i=0;i<3;i++){
      let exercise = {sets: []};
      for(let x=0;x<5;x++){
        let set = {
          setNumber: x + 1,
          prevWeight: 100,
          currentWeight: 110,
          expectedRep: 5 - x,
          actualRep: 5 - x,
          percentIncrease: '5%'
        };
        exercise.sets.push(set);
      }
      this.boxSquats.push(exercise);
    }
    console.log('box', this.boxSquats);
  }

}
