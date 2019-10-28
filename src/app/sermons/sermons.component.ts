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
  videos = [];
  subscriptions: Subscription[] = [];

  constructor(private youTubeService: YouTubeService) { }

  ngOnInit() {
    this.subscriptions.push(
      this.youTubeService.getVideosForChanel(this.channelID, 3)
        .subscribe(lista => {
          for (let element of lista["items"]) {
            this.videos.push(element)
          }
        })
    )
    console.log(this.videos);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    })
  }

}
