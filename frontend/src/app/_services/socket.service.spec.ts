import { TestBed } from '@angular/core/testing';
import { HttpClientModule  } from '@angular/common/http';

import { SocketService } from './socket.service';

describe('SocketService', () => {
  let service: SocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SocketService ],
      imports: [HttpClientModule]
    });
    service = TestBed.inject(SocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
