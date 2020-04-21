import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

@NgModule({
  declarations: [],
  exports: [MatButtonModule, MatToolbarModule, MatMenuModule, 
    MatTableModule, MatInputModule, MatDialogModule, MatSnackBarModule, MatButtonToggleModule, MatBottomSheetModule],
  imports: [
    CommonModule
  ]
})
export class MaterialModule { }
