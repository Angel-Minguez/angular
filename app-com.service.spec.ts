import { TestBed, inject } from '@angular/core/testing';

import { AppComService } from './app-com.service';

describe('AppComService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppComService]
    });
  });

  it('should be created', inject([AppComService], (service: AppComService) => {
    expect(service).toBeTruthy();
  }));
});
