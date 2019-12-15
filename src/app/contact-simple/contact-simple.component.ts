import { ContactInformation } from './contact.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-contact-simple',
  templateUrl: './contact-simple.component.html',
  styleUrls: ['./contact-simple.component.scss']
})
export class ContactSimpleComponent implements OnInit {

  readonly contactURL = '../assets/contact-json/contact.json';
  churchEmail: string;
  churchPhone: string;
  churchPhoneRaw: number;
  churchAddress: string;
  churchLocation: string;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getData(this.contactURL)
      .subscribe((contactInfo: ContactInformation) => {
        this.churchEmail = contactInfo.email;
        this.churchPhone = contactInfo.phoneNumber;
        this.churchPhoneRaw = contactInfo.phoneNumberRaw;
        this.churchAddress = contactInfo.address;
        this.churchLocation = contactInfo.location;
      });
  }

}
