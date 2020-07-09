import { Observable } from 'rxjs';
import { Event } from './../events.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, take } from 'rxjs/operators';
import { AngularFireUploadTask } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class ManageEventsDialogService {

  // task: AngularFireUploadTask;
  // percentage: Observable<number>;
  // snapShort: Observable<any>;
  // downloadUrl: Observable<string>;

  constructor(
    private db: AngularFirestore,
    // private storage: AngularFireStorage,
    private snackBar: MatSnackBar
  ) { }

  private basePath = `images/events`;
  private uploadTask: firebase.storage.UploadTask;

  // addEvent(e, event: Event) {
  //   const n = Date.now();
  //   const file = e.target.files[0];
  //   const filePath = `images/events/${n}`;
  //   const fileRef = this.storage.ref(filePath);
  //   const task = this.storage.upload(filePath, file);
  //   task
  //     .snapshotChanges()
  //     .pipe(
  //       finalize(() => {
  //         this.downloadURL = fileRef.getDownloadURL();
  //         this.downloadURL.subscribe(url => {
  //           if (url) {
  //             event.event_image = url;
  //             this.addEventToCollection(event);
  //           }
  //           console.log('Shouldve uploaded', event);
  //         });
  //       })
  //     )
  //     .subscribe(url => {
  //       if (url) {
  //         console.log(url);
  //       }
  //     });
  // }

  addEventToCollection(event: Event) {
    this.db.collection('/events').add(event)
      .then(() => {
        this.openSnackBar('Event added');
      });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
    });
  }
}
