import { DialogData } from './view-video.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.scss']
})
export class VideoViewComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<VideoViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() { }

  /**
   * Returns the YouTube embed link with the ID that
   * is passed in the parameter appended to the end.
   * @param id The dynamic ID to be appended to the standard YouTube embed link.
   */
  createURL(id: string): string {
    return `https://www.youtube.com/embed/${id}?autoplay=1`;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
