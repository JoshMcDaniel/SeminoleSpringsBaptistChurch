import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationBibleSchoolComponent } from './vacation-bible-school.component';

describe('VacationBibleSchoolComponent', () => {
  let component: VacationBibleSchoolComponent;
  let fixture: ComponentFixture<VacationBibleSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacationBibleSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationBibleSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
