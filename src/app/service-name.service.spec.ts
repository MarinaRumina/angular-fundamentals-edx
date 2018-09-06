import { TestBed, inject } from '@angular/core/testing';

import { ServiceNameService } from './service-name.service';

describe('ServiceNameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceNameService]
    });
  });

  it('should be created', inject([ServiceNameService], (service: ServiceNameService) => {
    expect(service).toBeTruthy();
  }));
});
