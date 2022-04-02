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

  buildParentOrGuardianFormGroup(): FormGroup {
    return this.formBuilder.group({
      parentOrGuardianFirstName: ['test', [Validators.required, Validators.maxLength(20)]],
      parentOrGuardianLastName: ['test_last', [Validators.required, Validators.maxLength(20)]],
      parentOrGuardianEmail: ['test@test.ccom', [Validators.required, Validators.email]],
      parentOrGuardianAddress: ['test123', [Validators.required, Validators.maxLength(50)]],
      parentOrGuardianMailingAddress: ['test321', [Validators.maxLength(50)]],
      parentOrGuardianPhoneNumber: ['1231232134', [Validators.required, Validators.pattern(phoneNumberRegex)]]
    });
  }

  buildRegistrantForm(): FormGroup {
    return this.formBuilder.group({
      childFirstName: ['test_c', [Validators.required, Validators.maxLength(20)]],
      childLastName: ['test_cl', [Validators.required, Validators.maxLength(20)]],
      childBirthDay: [this.initDate, [Validators.required]],
      childLastGradeCompleted: ['1st', [Validators.required]],
      childMedicalInformation: ['test test', [Validators.maxLength(200)]],
      childPhotographPermission: ['No', [Validators.required]],
    });
  }

  buildEmergencyContactsFormGroup(): FormGroup {
    return this.formBuilder.group({
      emergencyContact1FirstName: 'test_ef',
      emergencyContact1LastName: 'test_el',
      emergencyContact1PhoneNumber: '3213213211',
      emergencyContact2FirstName: 'test_sdsd',
      emergencyContact2LastName: 'test_l_sdsd',
      emergencyContact2PhoneNumber: '3213214324',
    });
  }

  buildAdditionalInfoForm(): FormGroup {
    return this.formBuilder.group({
      pickupFirstName: 'test_fsfs',
      pickupLastName: 'test_l_dsd',
      churchAttendance: 'test test test',
      additionalComments: 'test test test test test test test test',
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
    this.vbsRequestService.submitForm(form).subscribe();

    // console.log('parent: ', this.parentOrGuardianFormGroup.value);
    // console.log('Children', this.registrantFormGroup.value);
    // Your form value is outputted as a JavaScript object.
    // Parse it as JSON or take the values necessary to use as you like
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
