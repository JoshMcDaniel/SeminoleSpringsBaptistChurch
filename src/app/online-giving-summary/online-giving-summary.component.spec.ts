import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineGivingSummaryComponent } from './online-giving-summary.component';

describe('OnlineGivingSummaryComponent', () => {
  let component: OnlineGivingSummaryComponent;
  let fixture: ComponentFixture<OnlineGivingSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineGivingSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineGivingSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
