import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-runs',
  templateUrl: './runs.component.html',
  styleUrls: ['./runs.component.scss']
})
export class RunsComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      runs: this.fb.array([
        this.fb.group({
          week: ['1'],
          mon: ['1.5'],
          tue: ['1.5'],
          wed: ['1.5'],
          thur: ['1.5'],
          fri: ['1.5'],
          sat: ['1.5'],
          sun: ['1.5']
        })
      ])
    });
  }


  get runs(){
    return this.form.get('runs') as FormArray;
  }
}
