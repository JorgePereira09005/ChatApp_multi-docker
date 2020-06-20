import { TestBed } from '@angular/core/testing';
import { HttpClientModule  } from '@angular/common/http';

import { TokenStorageService } from './token-storage.service';

describe('TokenStorageService', () => {
  let service: TokenStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenStorageService ],
      imports: [HttpClientModule]
    });
    service = TestBed.inject(TokenStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
