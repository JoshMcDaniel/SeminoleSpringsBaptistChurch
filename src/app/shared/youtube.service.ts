import { apiKeys } from './../../../apiKeys';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

/**
 * The YouTubeService retrieves videos from the
 * Seminole Springs Baptist Church YouYube channel.
 */
@Injectable({
  providedIn: 'root'
})

export class YouTubeService {

  private readonly BASE_URL = 'https://www.googleapis.com/youtube/v3/search?key=';
  private readonly channelID: string = 'UC-2UUaVukuu7FgXmOH-jdmg';
  numberOfVideos = 1;
  numberOfMostPopular = 3;
  // TODO: Apply API key restrictions to only the specified domains
  // https://console.developers.google.com/apis/credentials?project=seminolespringsbaptist

  constructor(private http: HttpClient) { }

  getVideosForChannel(): Observable<object> {
    const url = this.BASE_URL + apiKeys.youTubeAPI + '&channelId=' +
      this.channelID + '&order=date&part=snippet &type=video,id&maxResults=' + this.numberOfVideos;
    return this.http.get(url).pipe(
      map((res: object) => {
        return res;
      }),
      catchError(error => this.errorHandler(error)));
  }

  getMostPopular(): Observable<object> {
    const url = this.BASE_URL + apiKeys.youTubeAPI + '&channelId=' +
      this.channelID + '&order=viewCount&part=snippet &type=video,id&maxResults=' + this.numberOfMostPopular;
    return this.http.get(url).pipe(
      map((res: object) => {
        return res;
      }),
      catchError(error => this.errorHandler(error)));
  }

  errorHandler(error: any) {
    if (error.error instanceof Error) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return of({});
  }
}
