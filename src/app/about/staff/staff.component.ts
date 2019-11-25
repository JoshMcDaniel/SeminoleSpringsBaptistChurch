import { StaffImage } from './staff.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  @Input()
  title = '';
  @Input()
  staffImages: StaffImage[] = [];
  staffIndex = 0;

  constructor() { }

  ngOnInit() { }

  /**
   * Sets the staffIndex to keep it synchronized with
   * the current index emitted from the Carousel component.
   * @param index The index emitted from the Carousel component.
   */
  setIndex(index: number): void {
    this.staffIndex = index;
  }

}
