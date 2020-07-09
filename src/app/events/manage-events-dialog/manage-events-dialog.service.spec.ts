import { TestBed } from '@angular/core/testing';

import { ManageEventsDialogService } from './manage-events-dialog.service';

describe('ManageEventsDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageEventsDialogService = TestBed.get(ManageEventsDialogService);
    expect(service).toBeTruthy();
  });
});
