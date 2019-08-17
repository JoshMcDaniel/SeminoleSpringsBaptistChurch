import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSummaryComponent } from './about-summary.component';

describe('AboutSummaryComponent', () => {
  let component: AboutSummaryComponent;
  let fixture: ComponentFixture<AboutSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
