import { VbsRequest, VbsRequestService } from './../vbs-request.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { phoneNumberRegex } from 'src/app/common/regex';

@Component({
  selector: 'app-vbs-form',
  templateUrl: './vbs-form.component.html',
  styleUrls: ['./vbs-form.component.scss']
})
export class VbsFormComponent implements OnInit {

  readonly formSparkLink = 'https://submit-form.com/56FALOlJ';
  readonly testFormSparkLink = 'https://submit-form.com/echo';
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

  buildParentOrGuardianFormGroup(): FormGroup {
    return this.formBuilder.group({
      parentOrGuardianFirstName: ['', [Validators.required, Validators.maxLength(20)]],
      parentOrGuardianLastName: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      mailingAddress: ['', [Validators.maxLength(50)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(phoneNumberRegex)]]
    });
  }

  buildRegistrantForm(): FormGroup {
    return this.formBuilder.group({
      childFirstName: ['', [Validators.required, Validators.maxLength(20)]],
      childLastName: ['', [Validators.required, Validators.maxLength(20)]],
      childBirthDay: [new Date(), [Validators.required]],
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
    const form = this.getFormData();
    this.vbsRequestService.submitForm(form);

    // console.log('parent: ', this.parentOrGuardianFormGroup.value);
    // console.log('Children', this.registrantFormGroup.value);
    // Your form value is outputted as a JavaScript object.
    // Parse it as JSON or take the values necessary to use as you like
  }

  getFormData(): VbsRequest {
    return {
      ...this.parentOrGuardianFormGroup.value,
      registrants: this.formControlls.map(c => c.value),
      ...this.emergencyContactsFormGroup.value,
      ...this.additionalInfoFormGroup.value
    };
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

  get email(): AbstractControl {
    return this.parentOrGuardianFormGroup.get('email');
  }

  get address(): AbstractControl {
    return this.parentOrGuardianFormGroup.get('address');
  }

  get mailingAddress(): AbstractControl {
    return this.parentOrGuardianFormGroup.get('mailingAddress');
  }

  get phoneNumber(): AbstractControl {
    return this.parentOrGuardianFormGroup.get('phoneNumber');
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
