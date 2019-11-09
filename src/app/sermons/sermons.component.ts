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

  quotaReached = false;
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
          if (list['error'] === true) {
            this.quotaReached = true;
          } else {
            for (const element of list['items']) {
              this.mostRecent.push(element);
            }
          }
        })
    );

    this.subscriptions.push(
      this.youTubeService.getMostPopular()
        .subscribe((list: object) => {
          if (list['error'] === true) {
            this.quotaReached = true;
          } else {
            for (const element of list['items']) {
              this.mostRecent.push(element);
            }
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
   * Returns the YouTube embed link with the dynamic link
   * that is passed in the parameter appended to the end.
   * @param link The dynamic link to be appended to the standard YouTube embed link.
   */
  createURL(link: string): string {
    return `https://www.youtube.com/embed/${link}`;
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
