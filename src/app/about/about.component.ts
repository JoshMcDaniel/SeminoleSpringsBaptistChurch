import { take } from 'rxjs/operators';
import { StaffImage, StaffArray } from './about.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  readonly staffURL = '../assets/about-json/about.json';
  staffImages: StaffImage[];
  staffIndex: number;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getData(this.staffURL).pipe(take(1))
    .subscribe((results: StaffArray) => {
      this.staffImages = results.staffArray;
    })
  }

  setIndex(index: number): void {
    this.staffIndex =  index;
  }

}
