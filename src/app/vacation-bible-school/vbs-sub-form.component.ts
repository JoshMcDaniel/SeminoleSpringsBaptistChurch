import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-vbs-sub-form',
  templateUrl: './vbs-sub-form.component.html',
  styleUrls: ['./vacation-bible-school.component.scss']
})
export class VbsSubFormComponent {
  // This component is passed a FormGroup from the base component template
  @Input() form: FormGroup;

  readonly grades = [
    '1st',
    '2nd',
    '3rd',
    '4th',
    '5th',
    '6th',
    '7th',
    '8th',
    '9th',
    '10th',
    '11th',
    '12th',
  ];

  get childFirstName(): AbstractControl {
    return this.form.get('childFirstName');
  }

  get childLastName(): AbstractControl {
    return this.form.get('childLastName');
  }

  get childMedicalInformation(): AbstractControl {
    return this.form.get('childMedicalInformation');
  }

}
