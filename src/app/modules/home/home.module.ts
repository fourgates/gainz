import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './container/home.component';
import { MaterialModule } from './../../common/material/material.module';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewSetModalComponent } from './components/new-set-modal/new-set-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminModule } from '../admin/admin.module';
import { RunsComponent } from './components/runs/runs.component';
import { RunWeekBottomSheetComponent } from './components/run-week-bottom-sheet/run-week-bottom-sheet.component';

@NgModule({
  declarations: [HomeComponent, ExerciseComponent, NewSetModalComponent, RunsComponent, RunWeekBottomSheetComponent],
  exports: [HomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AdminModule
  ]
})
export class HomeModule { }
