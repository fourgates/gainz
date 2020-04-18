import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-runs',
  templateUrl: './runs.component.html',
  styleUrls: ['./runs.component.scss']
})
export class RunsComponent implements OnInit {

  form: FormGroup;
  data: any[] = [
    {
    week: ['1'],
    mon: ['1.5'],
    tue: ['1.5'],
    wed: ['1.5'],
    thur: ['1.5'],
    fri: ['1.5'],
    sat: ['1.5'],
    sun: ['1.5']
  },
  {
    week: ['2'],
    mon: ['2.5'],
    tue: ['2.5'],
    wed: ['2.5'],
    thur: ['2.5'],
    fri: ['0'],
    sat: ['2.5'],
    sun: ['2.7']
  }
];
  displayedColumns: string[] = ['week', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun', 'total', 'mileIncrease', 'percentIncrease', 'max', 'maxIncrease', 'maxPercentIncrease', 'daysTrained'];
  //displayedColumns: string[] = ['week'];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    let rs = this.data.map(d=>this.fb.group(d));
    this.form = this.fb.group({
      runs: this.fb.array(rs)
    });
    
    this.calcTotal(this.data[0]);
    this.calcTotal(this.data[1]);
    this.calcIncrease(this.data);
    this.form.disable();
  }
  get runs(){
    return this.form.get('runs') as FormArray;
  }
  calcIncrease(rows){
    for(let i=0;i<rows.length;i++){
      let current = rows[i];
      if(i === 0){
        continue;
      }
      let prev = rows[i-1];
      current.mileIncrease = (current.total - prev.total).toFixed(2);
      current.percentIncrease = ((current.mileIncrease / prev.total) * 100).toFixed(2);
      current.maxIncrease = (current.max - prev.max).toFixed(2);
      current.maxPercentIncrease = ((current.maxIncrease / prev.max) * 100).toFixed(2);
    }
  }
  calcTotal(row){
    let total = 0;
    let max = 0;
    let daysTrained = 0;
    if(row.mon && parseFloat(row.mon) > 0){
      total += parseFloat(row.mon);
      max = parseFloat(row.mon) > max ? parseFloat(row.mon) : max;
      daysTrained++;
    }
    if(row.tue && parseFloat(row.tue) > 0){
      total += parseFloat(row.tue);
      max = parseFloat(row.tue) > max ? parseFloat(row.tue) : max;
      daysTrained++;
    }
    if(row.wed && parseFloat(row.wed) > 0){
      total += parseFloat(row.wed);
      max = parseFloat(row.wed) > max ? parseFloat(row.wed) : max;
      daysTrained++;
    }
    if(row.thur && parseFloat(row.thur) > 0){
      total += parseFloat(row.thur);
      max = parseFloat(row.thur) > max ? parseFloat(row.thur) : max;
      daysTrained++;
    }
    if(row.fri && parseFloat(row.fri) > 0){
      total += parseFloat(row.fri);
      max = parseFloat(row.fri) > max ? parseFloat(row.fri) : max;
      daysTrained++;
    }
    if(row.sat && parseFloat(row.sat) > 0){
      total += parseFloat(row.sat);
      max = parseFloat(row.sat) > max ? parseFloat(row.sat) : max;
      daysTrained++;
    }
    if(row.sun && parseFloat(row.sun) > 0){
      total += parseFloat(row.sun);
      max = parseFloat(row.sun) > max ? parseFloat(row.sun) : max;
      daysTrained++;
    }
    row.max = max;
    row.total = total;
    row.daysTrained = daysTrained;
  }
  cancel(){}
  delete(){}
  save(){}
}
