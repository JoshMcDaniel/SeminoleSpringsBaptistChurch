import { FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vbs-form-summary',
  templateUrl: './vbs-form-summary.component.html',
  styleUrls: ['./vbs-form-summary.component.scss']
})
export class VbsFormSummaryComponent implements OnInit {

  @Input() parentOrGuardian: FormGroup;
  @Input() emergencyContacts: FormGroup;
  @Input() registrant: FormGroup;
  @Input() additionalInfo: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  get formControlls() {
    const formControlls = <FormArray>this.registrant.controls['formArray']
    return formControlls.controls;
  }

  get redirectPath(): string {
    return window.location.href.replace('/vbs', '');
  }

  get parentOrGuardianFirstName(): AbstractControl {
    return this.parentOrGuardian.get('parentOrGuardianFirstName');
  }

  get parentOrGuardianLastName(): AbstractControl {
    return this.parentOrGuardian.get('parentOrGuardianLastName');
  }

  get parentOrGuardianEmail(): AbstractControl {
    return this.parentOrGuardian.get('parentOrGuardianEmail');
  }

  get parentOrGuardianAddress(): AbstractControl {
    return this.parentOrGuardian.get('parentOrGuardianAddress');
  }

  get parentOrGuardianMailingAddress(): AbstractControl {
    return this.parentOrGuardian.get('parentOrGuardianMailingAddress');
  }

  get parentOrGuardianPhoneNumber(): AbstractControl {
    return this.parentOrGuardian.get('parentOrGuardianPhoneNumber');
  }

  get emergencyContact1FirstName(): AbstractControl {
    return this.emergencyContacts.get('emergencyContact1FirstName');
  }

  get emergencyContact1LastName(): AbstractControl {
    return this.emergencyContacts.get('emergencyContact1LastName');
  }

  get emergencyContact1PhoneNumber(): AbstractControl {
    return this.emergencyContacts.get('emergencyContact1PhoneNumber');
  }

  get emergencyContact2FirstName(): AbstractControl {
    return this.emergencyContacts.get('emergencyContact2FirstName');
  }

  get emergencyContact2LastName(): AbstractControl {
    return this.emergencyContacts.get('emergencyContact2LastName');
  }

  get emergencyContact2PhoneNumber(): AbstractControl {
    return this.emergencyContacts.get('emergencyContact2PhoneNumber');
  }

  get pickupFirstName(): AbstractControl {
    return this.additionalInfo.get('pickupFirstName');
  }

  get pickupLastName(): AbstractControl {
    return this.additionalInfo.get('pickupLastName');
  }

  get churchAttendance(): AbstractControl {
    return this.additionalInfo.get('churchAttendance');
  }

  get additionalComments(): AbstractControl {
    return this.additionalInfo.get('additionalComments');
  }

}
