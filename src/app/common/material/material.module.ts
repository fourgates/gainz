import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [],
  exports: [MatButtonModule, MatToolbarModule, MatMenuModule, MatTableModule],
  imports: [
    CommonModule
  ]
})
export class MaterialModule { }
