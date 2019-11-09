import { VideoViewComponent } from './video-view.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [VideoViewComponent],
  imports: [
    CommonModule,
    VideoViewComponent
  ],
  exports: [VideoViewComponent]
})
export class VideoViewModule { }
