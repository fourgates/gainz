import { Component, OnInit } from '@angular/core';
import { Exercise } from '../components/exercise/exercise.dt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  boxSquats: Exercise[] = [];
  constructor() { }
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
