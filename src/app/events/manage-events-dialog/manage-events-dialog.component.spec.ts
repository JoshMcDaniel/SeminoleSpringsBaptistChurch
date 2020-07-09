import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEventsDialogComponent } from './manage-events-dialog.component';

describe('AddEventsDialogComponent', () => {
  let component: ManageEventsDialogComponent;
  let fixture: ComponentFixture<ManageEventsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageEventsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEventsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
