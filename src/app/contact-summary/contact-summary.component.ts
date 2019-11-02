import { NgForm, FormControl, Validators } from '@angular/forms';
import { ContactService } from './../contact/contact.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-contact-summary',
  templateUrl: './contact-summary.component.html',
  styleUrls: ['./contact-summary.component.scss']
})
export class ContactSummaryComponent implements OnInit {

  isFormSubmitted = false;
  submittedFirstName: string;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private contactService: ContactService) { }

  ngOnInit() { }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  onSubmit(form: NgForm): void {
    console.log(form.value);
    if (form.value.firstName) {
      this.submittedFirstName = `, ${form.value.firstName}`;
    }
    this.contactService.submitForm(form)
    .pipe(take(1))
    .subscribe(val => {
      console.log(val);
    });
    // On success response...
    this.success(form);
  }

  success(form: NgForm): void {
    form.reset();
    this.isFormSubmitted = true;
  }

}
