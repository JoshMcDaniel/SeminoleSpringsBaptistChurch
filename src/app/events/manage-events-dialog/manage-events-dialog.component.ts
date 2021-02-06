import { mimeType } from './mime-type-validator';
import { SSBCEvent, ManageEventsDialogInput } from './../events.model';
import { EventsService, EVENTS_URL } from './../events.service';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ManageEventsDialogService } from './manage-events-dialog.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, Optional, OnInit } from '@angular/core';
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
    dateInput: 'dddd, MMMM Do, YYYY',
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
export class ManageEventsDialogComponent implements OnInit {

  requestPending$ = this.eventsService.requestPending$;

  eventForm = new FormGroup({
    event_date: new FormControl('', [
      Validators.required
    ]),
    event_description: new FormControl('', [
      Validators.required
    ]),
    event_image: new FormControl(null, {
      validators: [
        Validators.required
      ],
      asyncValidators: [mimeType]
    }),
    event_title: new FormControl('', [
      Validators.required
    ]),
    event_time: new FormControl('', [
      Validators.required
    ]),
  });

  imagePreview: string;

  // formBuilder: FormBuilder;

  // imageToUpload: File;

  // task: AngularFireUploadTask;
  // percentage: Observable<number>;
  // snapShot: Observable<any>;
  // downloadUrl: Observable<string>;


  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ManageEventsDialogInput,
    public dialogRef: MatDialogRef<ManageEventsDialogComponent>,
    private http: HttpClient,
    private eventsService: EventsService
    // private manageEventService: ManageEventsDialogService,
    // private storage: AngularFireStorage,
    // private db: AngularFirestore
  ) { }

  ngOnInit() {
    if (this.data && this.data.event && this.data.isEdit) {
      this.event_date.setValue(moment(Number.parseInt(this.data.event.event_date)));
      this.event_description.setValue(this.data.event.event_description);
      this.event_title.setValue(this.data.event.event_title);
      this.event_time.setValue(this.data.event.event_time);
      this.imagePreview = this.data.event.event_image_path
    }
    console.log('preview: ', this.imagePreview)
  }

  addImage(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.event_image.patchValue(file);
    this.event_image.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  getCurrentEvent(): SSBCEvent {
    return {
      ...this.eventForm.value,
      event_date: moment(this.event_date.value).startOf('date').valueOf()
    }
  }

  saveEvent = (): void => this.data && this.data.isEdit ? this.editEventEvent() : this.addEvent();

  addEvent(): void {
    this.eventsService.addEvent(this.getCurrentEvent(), this.event_image.value)
      .subscribe(() => {
        this.dialogRef.close()
      });
  }

  editEventEvent(): void {
    const eventWithId: SSBCEvent = {
      ...this.getCurrentEvent(),
      id: this.data.event.id
    };
    this.eventsService.editEvent(eventWithId)
      .subscribe(() => {
        this.dialogRef.close()
      });
  }


  // this.dialogRef.close(event);


  // const n = Date.now();
  // const filePath = `images/events/${n}/${this.imageToUpload.name}`;
  // // this.task = this.storage.upload(filePath, this.imageToUpload);
  // this.storage.upload(filePath, this.imageToUpload).then(() => {
  //   this.storage.ref(filePath).getDownloadURL().pipe(take(1))
  //     .subscribe(url => this.db.collection('/events').add({
  //       ...this.event.value, event_image: url, event_date: moment(this.event_date.value).format('MMMM d, YYYY')
  //     })
  //       .then(() => {
  //         this.manageEventService.openSnackBar('Event added');
  //       }));
  // });
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
  // }

  // isActive(snapshot) {
  //   return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  // }

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
    return this.eventForm.get('event_date');
  }

  get event_image(): AbstractControl {
    return this.eventForm.get('event_image');
  }

  get event_description(): AbstractControl {
    return this.eventForm.get('event_description');
  }

  get event_time(): AbstractControl {
    return this.eventForm.get('event_time');
  }

  get event_title(): AbstractControl {
    return this.eventForm.get('event_title');
  }
}
