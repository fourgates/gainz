import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './container/home.component';
import { MaterialModule } from './../../common/material/material.module';
import { ExerciseComponent } from './components/exercise/exercise.component'

@NgModule({
  declarations: [HomeComponent, ExerciseComponent],
  exports: [HomeComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class HomeModule { }
