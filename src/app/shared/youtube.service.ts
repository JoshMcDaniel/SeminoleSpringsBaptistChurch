import { take, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * The YouTubeService retrieves videos from the
 * Seminole Springs Baptist Church YouYube channel.
 */
@Injectable({
  providedIn: 'root'
})

export class YouTubeService {

  private readonly BASE_URL = 'https://www.googleapis.com/youtube/v3/search?key=';
  private readonly API_KEY = 'AIzaSyCT0zgDGm_Q7PtFvUnhTTOi1p57zIWujQk';

  constructor(private http: HttpClient) { }

  getVideosForChanel(channel: string, maxResults: number): Observable<Object> {
    let url = this.BASE_URL + this.API_KEY + '&channelId=' +
      channel + '&order=date&part=snippet &type=video,id&maxResults=' + maxResults
    return this.http.get(url).pipe(
      map((res: Object) => {
        return res;
      }))
  }
}
