import { TestBed, inject } from '@angular/core/testing';

import { AtndMgtService } from './atnd-mgt.service';

describe('AtndMgtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtndMgtService]
    });
  });

  it('should be created', inject([AtndMgtService], (service: AtndMgtService) => {
    expect(service).toBeTruthy();
  }));
});
