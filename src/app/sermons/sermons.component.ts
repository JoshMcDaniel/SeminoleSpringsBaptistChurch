import { YouTubeResponse } from './../shared/video-view/video-view.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { YouTubeService } from '../shared/youtube.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { VideoViewComponent } from '../shared/video-view/video-view.component';

@Component({
  selector: 'app-sermons',
  templateUrl: './sermons.component.html',
  styleUrls: ['./sermons.component.scss']
})

export class SermonsComponent implements OnInit, OnDestroy {

  readonly youTubeChannelLink = 'https://www.youtube.com/channel/UC-2UUaVukuu7FgXmOH-jdmg';
  errorCondition = false;
  mostRecent: any[] = [];
  mostPopular: any[] = [];
  subscriptions: Subscription[] = [];
  isAllExpanded = true;
  isFetchingVideos = true;

  constructor(
    private youTubeService: YouTubeService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.youTubeService.getVideosForChannel()
        .subscribe((list: YouTubeResponse) => {
          for (const element of list.items) {
            this.mostRecent.push(element);
          }
          this.isFetchingVideos = false;
        })
    );

    this.subscriptions.push(
      this.youTubeService.getMostPopular()
        .subscribe((list: YouTubeResponse) => {
          for (const element of list.items) {
            this.mostPopular.push(element);
          }
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

  /**
   * Opens a Material Dialog with the video spified by the ID in the parameter.
   * @param videoID The ID of the video to be displayed.
   */
  viewVideo(videoID: string): void {
    this.dialog.open(VideoViewComponent, {
      data: { id: videoID }
    });
  }

}
