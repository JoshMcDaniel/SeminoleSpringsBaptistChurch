import { TestBed } from '@angular/core/testing';
import { YouTubeService } from './youtube.service';


describe('YoutubeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YouTubeService = TestBed.get(YoutubeService);
    expect(service).toBeTruthy();
  });
});
