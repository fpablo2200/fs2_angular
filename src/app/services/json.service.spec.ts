import { TestBed } from '@angular/core/testing';

import { JsonService } from './json.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('JsonService', () => {
  let service: JsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule], 
            providers: [
              { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } }
            ]
    });
    service = TestBed.inject(JsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
