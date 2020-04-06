import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-set-modal',
  template: `
  <h1 mat-dialog-title>New Exercise</h1>
  <div mat-dialog-content>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <p>Exercise Name: </p>
      <mat-form-field>
        <input matInput [formControlName]="'exerciseName'" style="width:50%">
      </mat-form-field>
    </form>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">Cancel</button>
    <button mat-button [mat-dialog-close]="form.value" cdkFocusInitial>
      Save
    </button>
  </div>
  `,
  styles: []
})
export class NewSetModalComponent implements OnInit {

  form: FormGroup;
  
  constructor(private fb: FormBuilder, 
  public dialogRef: MatDialogRef<NewSetModalComponent>) { }

  ngOnInit(): void {
    this.form = this.fb.group({exerciseName: null});
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  submit(): void{
    this.dialogRef.close(this.form.value);
  }
}
