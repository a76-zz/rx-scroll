import { TestBed, inject } from '@angular/core/testing';

import { GroupedSetService } from './grouped-set.service';

describe('GroupedSetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupedSetService]
    });
  });

  it('should be created', inject([GroupedSetService], (service: GroupedSetService) => {
    expect(service).toBeTruthy();
  }));
});
