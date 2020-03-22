import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './container/home.component';
import { MaterialModule } from './../../common/material/material.module';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { NewExerciseComponent } from './components/new-exercise/new-exercise.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, ExerciseComponent, NewExerciseComponent],
  exports: [HomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
