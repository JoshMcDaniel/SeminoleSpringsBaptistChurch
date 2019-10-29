import { Component, OnInit, OnDestroy } from '@angular/core';
import { YouTubeService } from '../shared/youtube.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sermons',
  templateUrl: './sermons.component.html',
  styleUrls: ['./sermons.component.scss']
})

export class SermonsComponent implements OnInit, OnDestroy {

  private readonly channelID = 'UC-2UUaVukuu7FgXmOH-jdmg';
  numberOfVideosToGet = 1;
  videos = [];
  subscriptions: Subscription[] = [];

  constructor(private youTubeService: YouTubeService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.youTubeService.getVideosForChannel(this.channelID, this.numberOfVideosToGet)
        .subscribe((list: Object) => {
          for (let element of list["items"]) {
            this.videos.push(element)
          }
        })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    })
  }

  /**
   * Returns the YouTube embed link with the dynamic link
   * that is passed in the parameter appended to the end.
   * @param link The dynamic link to be appended to the standard YouTube embed link.
   */
  createURL(link: string): string {
    return `https://www.youtube.com/embed/${link}`;
  }

}
