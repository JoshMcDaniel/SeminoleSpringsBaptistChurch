import { apiKeys } from './../../../apiKeys';
import { map } from 'rxjs/operators';
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
  // TODO: Apply API key restrictions to only the specified domains
  // https://console.developers.google.com/apis/credentials?project=seminolespringsbaptist

  constructor(private http: HttpClient) { }

  getVideosForChannel(channel: string, maxResults: number): Observable<object> {
    const url = this.BASE_URL + apiKeys.youTubeAPI + '&channelId=' +
      channel + '&order=date&part=snippet &type=video,id&maxResults=' + maxResults;
    return this.http.get(url).pipe(
      map((res: object) => {
        return res;
      }));
  }

  getMostPopular(channel: string, maxResults: number): Observable<object> {
    const url = this.BASE_URL + apiKeys.youTubeAPI + '&channelId=' +
      channel + '&order=viewCount&part=snippet &type=video,id&maxResults=' + maxResults;
    return this.http.get(url).pipe(
      map((res: object) => {
        return res;
      }));
  }
}
