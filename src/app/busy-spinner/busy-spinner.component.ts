import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-busy-spinner',
  templateUrl: './busy-spinner.component.html',
  styleUrls: ['./busy-spinner.component.scss']
})
export class BusySpinnerComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<BusySpinnerComponent>,
    @Inject(MAT_DIALOG_DATA) public pendingMessage: string
  ) { }

  ngOnInit() {
  }

}
