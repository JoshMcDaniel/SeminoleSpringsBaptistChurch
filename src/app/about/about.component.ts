import { take } from 'rxjs/operators';
import { StaffArray, StaffImage } from './staff/staff.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  readonly staffURL = '../assets/about-json/staff.json';
  staffImages: StaffImage[];
  deaconImages: StaffImage[];
  staffTitle = 'Meet the Staff';
  deaconTItle = 'Meet our Deacons';

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getData(this.staffURL).pipe(take(1))
      .subscribe((results: StaffArray) => {
        this.staffImages = results.staffArray;
        this.deaconImages = results.deaconArray;
      });
  }

}
