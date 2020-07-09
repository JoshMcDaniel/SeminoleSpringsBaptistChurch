import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ManageEventsDialogService } from './manage-events-dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const DATE_FORMAT = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-manage-events-dialog',
  templateUrl: './manage-events-dialog.component.html',
  styleUrls: ['./manage-events-dialog.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT },
  ],
})
export class ManageEventsDialogComponent {

  event = new FormGroup({
    event_date: new FormControl('', [
      Validators.required
    ]),
    event_description: new FormControl('', [
      Validators.required
    ]),
    event_image: new FormControl('', [
      Validators.required
    ]),
    event_title: new FormControl('', [
      Validators.required
    ]),
    event_time: new FormControl('', [
      Validators.required
    ]),
  });

  formBuilder: FormBuilder;

  imageToUpload: File;

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapShot: Observable<any>;
  downloadUrl: Observable<string>;


  constructor(
    public dialogRef: MatDialogRef<ManageEventsDialogComponent>,
    private manageEventService: ManageEventsDialogService,
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) { }

  addImage(files) {
    this.imageToUpload = files[0];
  }

  addEvent() {
    const n = Date.now();
    const filePath = `images/events/${n}/${this.imageToUpload.name}`;
    // this.task = this.storage.upload(filePath, this.imageToUpload);
    this.storage.upload(filePath, this.imageToUpload).then(() => {
      this.storage.ref(filePath).getDownloadURL().pipe(take(1))
        .subscribe(url => this.db.collection('/events').add({
          ...this.event.value, event_image: url, event_date: moment(this.event_date.value).format('MMMM d, YYYY')
        })
          .then(() => {
            this.manageEventService.openSnackBar('Event added');
          }));
    });
    // this.percentage = this.task.percentageChanges();
    // this.snapShot = this.task.snapshotChanges();
    // this.downloadUrl = this.storage.ref(filePath).getDownloadURL();
    // this.storage.ref(filePath).getDownloadURL().pipe(take(1))
    //   .subscribe(url => this.db.collection('/events').add({
    //     ...this.event.value, event_image: url, event_date: moment(this.event_date.value).format('MMMM d, YYYY')
    //   })
    //     .then(() => {
    //       this.manageEventService.openSnackBar('Event added');
    //     }));
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  // addEvent(): void {
  //   this.manageEventService.addEvent(file: File, {
  //     ...this.event.value, event_date: moment(this.event_date.value).format('MMMM d, YYYY')
  //   });
  // }

  onCancel(): void {
    this.dialogRef.close();
  }

  getImageName(fullPath: string): string {
    return fullPath.replace(/^.*[\\\/]/, '');
  }

  get event_date(): AbstractControl {
    return this.event.get('event_date');
  }

  get event_image(): AbstractControl {
    return this.event.get('event_image');
  }

  get event_description(): AbstractControl {
    return this.event.get('event_description');
  }
}
