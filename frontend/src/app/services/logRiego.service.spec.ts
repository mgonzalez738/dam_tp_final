import { TestBed } from '@angular/core/testing';

import { LogRiegoService } from './logRiego.service';

describe('LogRiegoService', () => {
  let service: LogRiegoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogRiegoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
