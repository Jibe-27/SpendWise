import { TestBed } from '@angular/core/testing';

import { NewCategorieService } from './new-categorie.service';

describe('NewCategorieService', () => {
  let service: NewCategorieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewCategorieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
