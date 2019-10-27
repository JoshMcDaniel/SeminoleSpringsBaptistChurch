import { take } from 'rxjs/operators';
import { StaffImage, StaffArray } from './staff.model';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  readonly staffURL = '../assets/about-json/staff.json';
  staffImages: StaffImage[];
  staffIndex: number;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getData(this.staffURL).pipe(take(1))
      .subscribe((results: StaffArray) => {
        this.staffImages = results.staffArray;
      })
  }

  /**
   * Sets the staffIndex to keep it synchronized with
   * the current index emitted from the Carousel component.
   * @param index The index emitted from the Carousel component.
   */
  setIndex(index: number): void {
    this.staffIndex = index;
  }

}
