import { Config } from './../../assets/config.model';
import { take, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

/**
 * The YouTubeService retrieves videos from the
 * Seminole Springs Baptist Church YouYube channel.
 */
@Injectable({
  providedIn: 'root'
})

export class YouTubeService {

  private readonly BASE_URL = 'https://www.googleapis.com/youtube/v3/search?key=';
  private readonly configURL = '../assets/config.json';
  // TODO: Get key from config file instead of embedding it here.
  private apiKey = 'AIzaSyCT0zgDGm_Q7PtFvUnhTTOi1p57zIWujQk';

  constructor(
    private http: HttpClient,
    private data: DataService
  ) { }

  getVideosForChannel(channel: string, maxResults: number): Observable<Object> {
    let url = this.BASE_URL + this.apiKey + '&channelId=' +
      channel + '&order=date&part=snippet &type=video,id&maxResults=' + maxResults
    return this.http.get(url).pipe(
      map((res: Object) => {
        return res;
      }))
  }

  /**
   * Gets the required API key for the YouTube service.
   */
  getApiKey(): string {
    let apiKey: string;
    this.data.getData(this.configURL).pipe(take(1))
      .subscribe((conf: Config) => {
        console.log('KEY is: ', conf.API_KEY);
        apiKey = conf.API_KEY;
      });
    return apiKey;
  }
}
