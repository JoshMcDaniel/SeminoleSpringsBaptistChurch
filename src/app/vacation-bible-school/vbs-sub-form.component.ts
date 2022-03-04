import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-vbs-sub-form',
  templateUrl: './vbs-sub-form.component.html'
})
export class VbsSubFormComponent {
  @Input() form: FormGroup; // This component is passed a FormGroup from the base component template

  get childFirstName(): AbstractControl {
    return this.form.get('childFirstName');
  }

  get childLastName(): AbstractControl {
    return this.form.get('childLastName');
  }

}
