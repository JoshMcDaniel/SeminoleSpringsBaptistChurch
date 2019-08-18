import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

const URL = '../assets/data.json';
@Injectable({
 providedIn: 'root'
})
// Used if there is a need to access online images for the slider as well
export class DataService {

 constructor(private http: HttpClient) {}

 getData() {
   return this.http.get(URL);
 }
}