import { TestBed, inject } from '@angular/core/testing';

import { SearchPageService } from './search-page.service';

describe('SearchPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchPageService]
    });
  });

  it('should be created', inject([SearchPageService], (service: SearchPageService) => {
    expect(service).toBeTruthy();
  }));
});
