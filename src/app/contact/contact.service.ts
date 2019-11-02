import { NgForm } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  // Temporarily using Formspree to email the form data to the
  // organization staff email account until a proper backend is developed.
  readonly endPointURL = 'https://formspree.io/xleregqr';

  constructor(
    private http: HttpClient
  ) { }

  submitForm(formData: NgForm): Observable<any> {
    const v = formData.value;
    const data = `firstName=${v.firstName}&lastName=${v.lastName}&email=${v.email}&phoneNumber=${v.phoneNumber}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(this.endPointURL, data, httpOptions)
      .pipe(
        map(response => {
          console.log('email sent', response);
          return response;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
