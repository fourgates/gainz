import { Component } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
@Component({
  selector: 'app-run-week-bottom-sheet',
  templateUrl: './run-week-bottom-sheet.component.html',
  styleUrls: ['./run-week-bottom-sheet.component.scss']
})
export class RunWeekBottomSheetComponent{

  constructor(private _bottomSheetRef: MatBottomSheetRef<RunWeekBottomSheetComponent>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
