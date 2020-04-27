import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExerciseRoutingModule } from './exercise-routing.module';
import { ExerciseContainerComponent } from './container/exercise-container.component';
import { BrowserModule } from '@angular/platform-browser';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { MaterialModule } from 'src/app/common/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [ExerciseContainerComponent, ExerciseComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ExerciseRoutingModule,
    BrowserModule,
  ]
})
export class ExerciseModule { }
