import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './container/home.component';
import { MaterialModule } from './../../common/material/material.module';
import { ExerciseComponent } from './components/exercise/exercise.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewSetModalComponent } from './components/new-set-modal/new-set-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [HomeComponent, ExerciseComponent, NewSetModalComponent],
  exports: [HomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class HomeModule { }
