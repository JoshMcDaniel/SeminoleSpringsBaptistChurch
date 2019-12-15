import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactSimpleComponent } from './contact-simple.component';

describe('ContactSimpleComponent', () => {
  let component: ContactSimpleComponent;
  let fixture: ComponentFixture<ContactSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
