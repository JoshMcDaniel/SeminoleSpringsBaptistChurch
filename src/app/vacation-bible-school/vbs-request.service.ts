import { DataService } from './../data.service';
import { BusySpinnerComponent } from './../busy-spinner/busy-spinner.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map, catchError, finalize, takeUntil, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, BehaviorSubject, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

export interface Registrant {
  childFirstName: string;
  childLastName: string;
  childBirthDay: string;
  childAge?: number;
  childLastGradeCompleted: string;
  childMedicalInformation: string;
  childPhotographPermission: string;
}

export interface VbsRequest {
  // Parent/Guardian info
  parentOrGuardianFirstName: string;
  parentOrGuardianLastName: string;
  email: string;
  address: string;
  mailingAddress: string;
  phoneNumber: string;

  // Registrant info
  registrants: Registrant[];

  // Emergency info
  emergencyContact1FirstName: string;
  emergencyContact1LastName: string;
  emergencyContact1PhoneNumber: string;
  emergencyContact2FirstName: string;
  emergencyContact2LastName: string;
  emergencyContact2PhoneNumber: string;

  // Additional info
  pickupFirstName: string;
  pickupLastName: string;
  churchAttendance: string;
  additionalComments: string;
}

@Injectable({
  providedIn: 'root'
})
export class VbsRequestService {

  readonly getSubmitFormData = '../assets/form-keys/formspark_vbs_2022.json';
  submitFormURL = null;

  requestPending$ = new BehaviorSubject<boolean>(false);
  cancelRequest$ = new Subject();

  dialogRef: MatDialogRef<BusySpinnerComponent>;

  constructor(
    private data: DataService,
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private _requestPendingDialog: MatDialog
  ) {
    this.requestPending$.subscribe(isPending => this.handleDialogState(isPending));
    this.data.getData(this.getSubmitFormData).pipe(
      take(1),
      map(config => config['production'])
    ).subscribe((config) => {
      this.submitFormURL = config.route + config.key;
    });
  }

  submitForm(form: VbsRequest) {
    this.requestPending$.next(true);

    const body = this.formatVbsRequest(form);

    return this.http.post(this.submitFormURL, body).pipe(
      takeUntil(this.cancelRequest$),
      map((response) => {
        const message = 'Registration submitted successfully!';
        this.openSnackBar(message, 'Close');

        return of(response);
      }),
      catchError(error => {
        const message = 'Unable to submit Registration. Please try again.';
        this.openSnackBar(message, 'Close');

        return of(error);
      }),
      finalize(() => this.requestPending$.next(false))
    );
  }

  formatVbsRequest(form: VbsRequest) {
    const { registrants, ...rest } = form;

    registrants.forEach((registrant, index) => {
      const num = index + 1;

      rest[`childFirstName_${num}`] = registrant.childFirstName;
      rest[`childLastName_${num}`] = registrant.childLastName;
      rest[`childBirthDay_${num}`] = registrant.childBirthDay;
      rest[`childAge_${num}`] = this.getAge(registrant.childBirthDay);
      rest[`childLastGradeCompleted_${num}`] = registrant.childLastGradeCompleted;
      rest[`childMedicalInformation_${num}`] = registrant.childMedicalInformation;
      rest[`childPhotographPermission_${num}`] = registrant.childPhotographPermission;
    });

    return rest;
  }

  getAge(dateString: string): number {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  handleDialogState(isPending: boolean): void {
    if (isPending) {
      this.dialogRef = this._requestPendingDialog.open(BusySpinnerComponent,
        {
          panelClass: 'transparent',
          disableClose: true,
          data: 'Submitting Registration...'
        });

      this.dialogRef.afterClosed().subscribe(() => {
        this.cancelRequest$.next();
        this.dialogRef = null;
      });

    } else {
      if (this.dialogRef) {
        this.dialogRef.close();
        this.cancelRequest$.next();
      }
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3_000
    });
  }
}
