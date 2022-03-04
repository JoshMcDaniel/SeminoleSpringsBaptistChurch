import { ArrayType } from '@angular/compiler';
import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vacation-bible-school',
  templateUrl: './vacation-bible-school.component.html',
  styleUrls: ['./vacation-bible-school.component.scss']
})
export class VacationBibleSchoolComponent implements OnInit {

  readonly formSparkLink = 'https://submit-form.com/56FALOlJ';
  readonly testFormSparkLink = 'https://submit-form.com/echo';
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    let newForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(25)]],
      formArray: this.formBuilder.array([])
    });

    const arrayControl = <FormArray>newForm.controls['formArray'];
    let newGroup = this.formBuilder.group({
      childFirstName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(2)]],
      childLastName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(2)]]
    });
    arrayControl.push(newGroup);

    this.formGroup = newForm;



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

  addInput(): void {
    const arrayControl = <FormArray>this.formGroup.controls['formArray'];
    let newGroup = this.formBuilder.group({

      /* Fill this in identically to the one in ngOnInit */
      childFirstName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(2)]],
      childLastName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(2)]]

    });
    arrayControl.push(newGroup);
  }
  delInput(index: number): void {
    const arrayControl = <FormArray>this.formGroup.controls['formArray'];
    arrayControl.removeAt(index);
  }
  onSubmit(): void {
    console.log(this.formGroup.value);
    // Your form value is outputted as a JavaScript object.
    // Parse it as JSON or take the values necessary to use as you like
  }

  get formControlls() {
    const formControlls = <FormArray>this.formGroup.controls['formArray']
    return formControlls.controls
  }

  get redirectPath(): string {
    return window.location.href.replace('/vbs', '');
  }

  // get name(): AbstractControl {
  //   return this.formGroup.get('name');
  // }

  get email(): AbstractControl {
    return this.formGroup.get('email');
  }

  // get message(): AbstractControl {
  //   return this.formGroup.get('message');
  // }


  // get elsed(): AbstractControl {
  //   return this.formGroup.get('elsed');
  // }
}
