import { TestBed, inject } from '@angular/core/testing';

import { VgisService } from './vgis.service';

describe('VgisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VgisService]
    });
  });

  it('should be created', inject([VgisService], (service: VgisService) => {
    expect(service).toBeTruthy();
  }));
});
