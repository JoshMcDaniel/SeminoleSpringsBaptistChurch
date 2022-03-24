import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

export interface VbsRequest {
  // Parent/Guardian info
  parentOrGuardianFirstName: string;
  parentOrGuardianLastName: string;
  email: string;
  address: string;
  mailingAddress: string;
  phoneNumber: string;

  // Registrant info
  registrants: {
    childFirstName: string;
    childLastName: string;
    childBirthDay: string;
    childAge?: number;
    childLastGradeCompleted: string;
    childMedicalInformation: string;
    childPhotographPermission: string;
  }[];

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

  readonly formSparkLink = 'https://submit-form.com/56FALOlJ';
  readonly testFormSparkLink = 'https://submit-form.com/echo';

  constructor(
    private http: HttpClient
  ) { }

  submitForm(form: VbsRequest) {
    // const body = this.formatVbsRequest(form);
    console.log(form)
    // this.http.post(this.formSparkLink, form).pipe(
    //   map(response => {
    //     console.log(response)
    //   }),
    //   catchError(error => {
    //     console.log(error)
    //     return of()
    //   })
    // );
  }

  formatVbsRequest(form: VbsRequest) {
    const { registrants, ...rest } = form;
    const formattedRegistrants = registrants.map((registrant, index) => {
      const num = index + 1;
      return {
        [`childFirstName_${num}`]: registrant.childFirstName,
        [`childLastName_${num}`]: registrant.childLastName,
        [`childBirthDay_${num}`]: registrant.childBirthDay,
        [`childAge_${num}`]: this.getAge(registrant.childBirthDay),
        [`childLastGradeCompleted_${num}`]: registrant.childLastGradeCompleted,
        [`childMedicalInformation_${num}`]: registrant.childMedicalInformation,
        [`childPhotographPermission_${num}`]: registrant.childPhotographPermission
      }
    });

    const formattedForm = {
      ...rest,
      ...formattedRegistrants
    };

    return formattedForm;
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
}
