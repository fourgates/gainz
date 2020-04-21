import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { RunGroup, RunWeek, Run, TableColumn } from './run.dt';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { RunWeekBottomSheetComponent } from '../run-week-bottom-sheet/run-week-bottom-sheet.component';

@Component({
  selector: 'app-runs',
  templateUrl: './runs.component.html',
  styleUrls: ['./runs.component.scss']
})
export class RunsComponent implements OnInit {

  form: FormGroup;
  data: RunWeek[] = [
    {
    week: 1,
    mon:{
      distance: 4,
      hours: 0,
      mins: 8,
      seconds: 0
    },
    tue:{
      distance: 6,
      hours: 0,
      mins: 60,
      seconds: 0
    },
    wed:{
      distance: 6,
      hours: 0,
      mins: 60,
      seconds: 0
    },
    thur:{
      distance: 6,
      hours: 0,
      mins: 60,
      seconds: 0
    },
    fri:{
      distance: 6,
      hours: 0,
      mins: 60,
      seconds: 0
    },
    sat:{
      distance: 6,
      hours: 0,
      mins: 60,
      seconds: 0
    },
    sun:{
      distance: 6,
      hours: 0,
      mins: 60,
      seconds: 0
    }
  },
  {
    week: 2,
    mon:{
      distance: 6,
      hours: 0,
      mins: 8,
      seconds: 0
    },
    tue:{
      distance: 7,
      hours: 0,
      mins: 80,
      seconds: 0
    },
    wed:{
      distance: 6,
      hours: 0,
      mins: 60,
      seconds: 0
    },
    thur:{
      distance: 6,
      hours: 0,
      mins: 60,
      seconds: 0
    },
    fri:{
      distance: 6,
      hours: 0,
      mins: 60,
      seconds: 0
    },
    sat:{
      distance: 6,
      hours: 0,
      mins: 60,
      seconds: 0
    },
    sun:{
      distance: 6,
      hours: 0,
      mins: 60,
      seconds: 0
    }
  }
];
  displayedColumns: string[] = ['week', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun', 'total', 'mileIncrease', 'percentIncrease', 'max', 'maxIncrease', 
  'maxPercentIncrease', 'daysTrained', 'someday'];

  dayColumns: TableColumn[] = [
    {
    property: 'mon',
    description: 'Mon'
    },
    {
      property: 'tue',
      description: 'Tue'
    },
    {
      property: 'wed',
      description: 'Wed'
    },
    {
      property: 'thur',
      description: 'Thur'
    },
    {
      property: 'fri',
      description: 'Fri'
    },
    {
      property: 'sat',
      description: 'Sat'
    },
    {
      property: 'sun',
      description: 'Sun'
    },
  ];
  days: string[] = this.dayColumns.map(dc=>dc.property);
  nonDayColumns: TableColumn[] = [
    {
      property: 'total',
      description: 'Total'
    },
    {
      property: 'mileIncrease',
      description: 'Mile Increase'
    },
    {
      property: 'maxIncrease',
      description: 'Max Increase'
    },
    {
      property: 'daysTrained',
      description: 'Days Trained'
    }
  ]
  nonDay: string[] = this.nonDayColumns.map(ndc=>ndc.property);
  displayedColumns2: string[] = ['week'].concat(this.days).concat(this.nonDay);
  
  //displayedColumns: string[] = ['week'];
  constructor(private fb: FormBuilder, private _bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
    this.initForm();
    
    this.calcTotal(this.data[0]);
    this.calcTotal(this.data[1]);
    this.calcIncrease(this.data);
    this.form.disable();
  }
  initForm(){
    this.form = this.fb.group({
      // array of runs
      runs: this.fb.array(this.data.map(d=>{
        // each run can edit the distance and time for the run on the given day
        return this.fb.group({
          week: d.week,
          mon: this.runToFormGroup(d.mon),
          tue: this.runToFormGroup(d.tue),
          wed: this.runToFormGroup(d.wed),
          thur: this.runToFormGroup(d.thur),
          fri: this.runToFormGroup(d.fri),
          sat: this.runToFormGroup(d.sat),
          sun: this.runToFormGroup(d.sun),
        });
      }))
    });
    this.form.disable();
    console.log('form', this.form);
  }
  runToFormGroup(run: Run){
    return this.fb.group({
      distance: run.distance,
      hours: run.hours,
      mins: run.mins,
      seconds: run.seconds
    });
  }
  get runs(): FormArray{
    let out = this.form.get('runs') as FormArray;
    console.log('out', out)
    return out;
  }
  getRuns(): FormArray{
    return this.form.get('runs') as FormArray;
  }
  addRun(){
    // let add =     {
    //   week: ['0'],
    //   mon: ['0'],
    //   tue: ['0'],
    //   wed: ['0'],
    //   thur: ['0'],
    //   fri: ['0'],
    //   sat: ['0'],
    //   sun: ['0']
    // }

    // // add a new run to the form
    // let runs: FormArray = this.getRuns();
    // runs.push(this.fb.group(add));

    // // refresh data source
    // let out = [...this.data];
    // out.push(add);
    // this.data = out;
  }
  calcIncrease(rows){
    for(let i=0;i<rows.length;i++){
      let current = rows[i];
      if(i === 0){
        continue;
      }
      let prev = rows[i-1];
      
      let mileIncrease = (current.total - prev.total);
      let percentIncrease = ((mileIncrease / prev.total) * 100).toFixed(2);
      current.mileIncrease = mileIncrease + "(" + percentIncrease + "%)";

      let maxIncrease = (current.max - prev.max);
      let maxPercentIncrease = ((maxIncrease / prev.max) * 100).toFixed(2);
      current.maxIncrease = maxIncrease + "(" + maxPercentIncrease + "%)";
    }
  }
  calcTotal(row: RunWeek){
    let total = 0;
    let max = 0;
    let daysTrained = 0;
    if(row.mon && row.mon.distance > 0){
      total += row.mon.distance
      max = row.mon.distance > max ? row.mon.distance : max;
      daysTrained++;
    }
    if(row.tue && row.tue.distance > 0){
      total += row.tue.distance;
      max = row.tue.distance > max ? row.tue.distance : max;
      daysTrained++;
    }
    if(row.wed && row.wed.distance > 0){
      total += row.wed.distance;
      max = row.wed.distance > max ? row.wed.distance : max;
      daysTrained++;
    }
    if(row.thur && row.thur.distance > 0){
      total += row.thur.distance;
      max = row.thur.distance > max ? row.thur.distance : max;
      daysTrained++;
    }
    if(row.fri && row.fri.distance > 0){
      total += row.fri.distance;
      max = row.fri.distance > max ? row.fri.distance : max;
      daysTrained++;
    }
    if(row.sat && row.sat.distance > 0){
      total += row.sat.distance;
      max = row.sat.distance > max ? row.sat.distance : max;
      daysTrained++;
    }
    if(row.sun && row.sun.distance > 0){
      total += row.sun.distance;
      max = row.sun.distance > max ? row.sun.distance : max;
      daysTrained++;
    }
    row.max = max;
    row.total = total;
    row.daysTrained = daysTrained;
    console.log('row', row);
  }
  edit(){
    this.form.enable();
  }
  cancel(){
    this.form.disable();
  }
  delete(){}
  save(){}
  openBottomSheet(): void {
    this._bottomSheet.open(RunWeekBottomSheetComponent);
  }
}
