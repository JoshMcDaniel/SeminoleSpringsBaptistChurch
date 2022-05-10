import { VbsRequest, VbsRequestService } from './../vbs-request.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { phoneNumberRegex } from 'src/app/common/regex';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-vbs-form',
  templateUrl: './vbs-form.component.html',
  styleUrls: ['./vbs-form.component.scss']
})
export class VbsFormComponent implements OnInit, OnDestroy {

  @ViewChild('stepper', { static: false }) private stepper: MatStepper;

  readonly formSparkLink = 'https://submit-form.com/56FALOlJ';
  readonly testFormSparkLink = 'https://submit-form.com/echo';
  initDate = new Date();
  parentOrGuardianFormGroup: FormGroup;
  emergencyContactsFormGroup: FormGroup;
  registrantFormGroup: FormGroup;
  additionalInfoFormGroup: FormGroup;

  // https://submit-form.com/56FALOlJ?name=&email=&message=&_redirect=http://localhost:4200/events

  readonly maxRegistrants = 5;

  constructor(
    private formBuilder: FormBuilder,
    private vbsRequestService: VbsRequestService
  ) { }

  ngOnInit() {
    this.parentOrGuardianFormGroup = this.buildParentOrGuardianFormGroup();
    this.emergencyContactsFormGroup = this.buildEmergencyContactsFormGroup();
    this.initializeRegistrantGroup();
    this.additionalInfoFormGroup = this.buildAdditionalInfoForm();
  }

  ngOnDestroy(): void {
    this.vbsRequestService.cancelRequest$.next();
  }

  buildParentOrGuardianFormGroup(): FormGroup {
    return this.formBuilder.group({
      parentOrGuardianFirstName: ['', [Validators.required, Validators.maxLength(20)]],
      parentOrGuardianLastName: ['', [Validators.required, Validators.maxLength(20)]],
      parentOrGuardianEmail: ['', [Validators.required, Validators.email]],
      parentOrGuardianAddress: ['', [Validators.required, Validators.maxLength(50)]],
      parentOrGuardianMailingAddress: ['', [Validators.maxLength(50)]],
      parentOrGuardianPhoneNumber: ['', [Validators.required, Validators.pattern(phoneNumberRegex)]]
    });
  }

  buildRegistrantForm(): FormGroup {
    return this.formBuilder.group({
      childFirstName: ['', [Validators.required, Validators.maxLength(20)]],
      childLastName: ['', [Validators.required, Validators.maxLength(20)]],
      childBirthDay: [this.initDate, [Validators.required]],
      childLastGradeCompleted: ['', [Validators.required]],
      childMedicalInformation: ['', [Validators.maxLength(200)]],
      childPhotographPermission: ['', [Validators.required]],
    });
  }

  buildEmergencyContactsFormGroup(): FormGroup {
    return this.formBuilder.group({
      emergencyContact1FirstName: '',
      emergencyContact1LastName: '',
      emergencyContact1PhoneNumber: '',
      emergencyContact2FirstName: '',
      emergencyContact2LastName: '',
      emergencyContact2PhoneNumber: '',
    });
  }

  buildAdditionalInfoForm(): FormGroup {
    return this.formBuilder.group({
      pickupFirstName: '',
      pickupLastName: '',
      churchAttendance: '',
      additionalComments: '',
    });
  }

  initializeRegistrantGroup(): void {
    let registrantGroup = this.formBuilder.group({
      formArray: this.formBuilder.array([])
    });

    const arrayControl = <FormArray>registrantGroup.controls['formArray'];
    const initialRegistrantGroup = this.buildRegistrantForm();
    arrayControl.push(initialRegistrantGroup);

    this.registrantFormGroup = registrantGroup;
  }

  addInput(): void {
    const arrayControl = <FormArray>this.registrantFormGroup.controls['formArray'];
    let newGroup = this.buildRegistrantForm();
    arrayControl.push(newGroup);
  }

  delInput(index: number): void {
    const arrayControl = <FormArray>this.registrantFormGroup.controls['formArray'];
    arrayControl.removeAt(index);
  }

  onSubmit(): void {
    const isRequestPending = this.vbsRequestService.requestPending$.getValue();
    if (!isRequestPending) {
      const form = this.getFormData();
      this.vbsRequestService.submitForm(form).subscribe({
        next: () => this.stepper.reset()
      })
    }
  }

  getFormData(): VbsRequest {
    return {
      ...this.parentOrGuardianFormGroup.value,
      registrants: this.formControlls.map(c => {
        return {
          ...c.value,
          childBirthDay: this.formatBirthday(c.value['childBirthDay'])
        }
      }),
      ...this.emergencyContactsFormGroup.value,
      ...this.additionalInfoFormGroup.value
    };
  }

  formatBirthday(date: Date): string {
    return !!date
      ? new Date(date).toLocaleDateString('en-Us')
      : this.initDate.toLocaleDateString('en-Us');
  }

  get formControlls() {
    const formControlls = <FormArray>this.registrantFormGroup.controls['formArray']
    return formControlls.controls;
  }

  get redirectPath(): string {
    return window.location.href.replace('/vbs', '');
  }

  get parentOrGuardianFirstName(): AbstractControl {
    return this.parentOrGuardianFormGroup.get('parentOrGuardianFirstName');
  }

  get parentOrGuardianLastName(): AbstractControl {
    return this.parentOrGuardianFormGroup.get('parentOrGuardianLastName');
  }

  get parentOrGuardianEmail(): AbstractControl {
    return this.parentOrGuardianFormGroup.get('parentOrGuardianEmail');
  }

  get parentOrGuardianAddress(): AbstractControl {
    return this.parentOrGuardianFormGroup.get('parentOrGuardianAddress');
  }

  get parentOrGuardianMailingAddress(): AbstractControl {
    return this.parentOrGuardianFormGroup.get('parentOrGuardianMailingAddress');
  }

  get parentOrGuardianPhoneNumber(): AbstractControl {
    return this.parentOrGuardianFormGroup.get('parentOrGuardianPhoneNumber');
  }

  get emergencyContact1FirstName(): AbstractControl {
    return this.emergencyContactsFormGroup.get('emergencyContact1FirstName');
  }

  get emergencyContact1LastName(): AbstractControl {
    return this.emergencyContactsFormGroup.get('emergencyContact1LastName');
  }

  get emergencyContact1PhoneNumber(): AbstractControl {
    return this.emergencyContactsFormGroup.get('emergencyContact1PhoneNumber');
  }

  get emergencyContact2FirstName(): AbstractControl {
    return this.emergencyContactsFormGroup.get('emergencyContact2FirstName');
  }

  get emergencyContact2LastName(): AbstractControl {
    return this.emergencyContactsFormGroup.get('emergencyContact2LastName');
  }

  get emergencyContact2PhoneNumber(): AbstractControl {
    return this.emergencyContactsFormGroup.get('emergencyContact2PhoneNumber');
  }

  get pickupFirstName(): AbstractControl {
    return this.additionalInfoFormGroup.get('pickupFirstName');
  }

  get pickupLastName(): AbstractControl {
    return this.additionalInfoFormGroup.get('pickupLastName');
  }

  get churchAttendance(): AbstractControl {
    return this.additionalInfoFormGroup.get('churchAttendance');
  }

  get additionalComments(): AbstractControl {
    return this.additionalInfoFormGroup.get('additionalComments');
  }

}
