import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VbsFormSummaryComponent } from './vbs-form-summary.component';

describe('VbsFormSummaryComponent', () => {
  let component: VbsFormSummaryComponent;
  let fixture: ComponentFixture<VbsFormSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VbsFormSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VbsFormSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
