import { TestBed } from '@angular/core/testing';

import { UploadImageServiceService } from './upload-image-service.service';

describe('UploadImageServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadImageServiceService = TestBed.get(UploadImageServiceService);
    expect(service).toBeTruthy();
  });
});
