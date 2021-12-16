import { TestBed } from '@angular/core/testing';

import { SoccerSquadService } from './soccer-squad.service';

describe('SoccerSquadService', () => {
  let service: SoccerSquadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoccerSquadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
