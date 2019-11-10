import { Component, OnInit, OnDestroy } from '@angular/core';
import { YouTubeService } from '../shared/youtube.service';
import { Subscription, EMPTY, of } from 'rxjs';
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

  constructor(
    private youTubeService: YouTubeService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.youTubeService.getVideosForChannel()
        .subscribe((list: object) => {
          for (const element of list['items']) {
            this.mostRecent.push(element);
          }
        })
    );

    this.subscriptions.push(
      this.youTubeService.getMostPopular()
        .subscribe((list: object) => {
          for (const element of list['items']) {
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
   * Toggles the expanded state of all the expansion panels in the template.
   */
  masterToggle(): void {
    this.isAllExpanded = !this.isAllExpanded;
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
