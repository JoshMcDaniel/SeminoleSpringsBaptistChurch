import { NgForm, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { WEBSITE_NAME } from '../app.component';
// import { ContactService } from './../contact/contact.service';
// import { take } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  // Currently, we are using FormSpree for handling contact requests.
  // This will be changed in the future when a back end is created.

  readonly redirectLink = 'https://seminolespringsbaptist.com/';
  isFormSubmitted = false;
  submittedFirstName: string;
  email = new FormControl('', [Validators.required, Validators.email]);
  readonly title = WEBSITE_NAME;

  constructor() { }
  // constructor(private contactService: ContactService) { }

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
    // The contact service will be used in the future.
    //   this.contactService.submitForm(form).pipe(take(1))
    //     .subscribe(val => {
    //       console.log(val);
    //     });
    //   // On success response...

    this.success(form);
  }

  success(form: NgForm): void {
    form.reset();
    this.isFormSubmitted = true;
  }

}
