import { TestBed } from '@angular/core/testing';
import { HttpClientModule  } from '@angular/common/http';
import { BackendRequestService } from './backend-request.service';

describe('BackendRequestService', () => {
  let service: BackendRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(BackendRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
