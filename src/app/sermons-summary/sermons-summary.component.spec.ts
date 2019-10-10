import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SermonsSummaryComponent } from './sermons-summary.component';

describe('SermonsSummaryComponent', () => {
  let component: SermonsSummaryComponent;
  let fixture: ComponentFixture<SermonsSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SermonsSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SermonsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
