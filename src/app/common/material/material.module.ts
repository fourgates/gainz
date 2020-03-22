import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [],
  exports: [MatButtonModule, MatToolbarModule, MatMenuModule, 
    MatTableModule, MatInputModule],
  imports: [
    CommonModule
  ]
})
export class MaterialModule { }
