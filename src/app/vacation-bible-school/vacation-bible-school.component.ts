import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vacation-bible-school',
  templateUrl: './vacation-bible-school.component.html',
  styleUrls: ['./vacation-bible-school.component.scss']
})
export class VacationBibleSchoolComponent implements OnInit {

  readonly formSparkLink = 'https://submit-form.com/56FALOlJ';
  readonly testFormSparkLink = 'https://submit-form.com/echo';
  // formGroup: FormGroup;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });



    // this.formGroup = this.formBuilder.group({
    //   name: ['', Validators.required],
    //   email: ['', [
    //     Validators.required,
    //     Validators.email
    //   ]],
    //   message: ['', Validators.required],
    //   elsed: ['', Validators.required],
    // })
  }

  get redirectPath(): string {
    return window.location.href.replace('/vbs', '');
  }

  // get name(): AbstractControl {
  //   return this.formGroup.get('name');
  // }

  // get email(): AbstractControl {
  //   return this.formGroup.get('email');
  // }

  // get message(): AbstractControl {
  //   return this.formGroup.get('message');
  // }


  // get elsed(): AbstractControl {
  //   return this.formGroup.get('elsed');
  // }
}
