import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GithubDataService } from './service/github-data.service';

describe('AppComponent', () => {

  let dataServiceSpy: jasmine.SpyObj<GithubDataService>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers:[
        {provide: GithubDataService, useValue:dataServiceSpy}
      ]
    }).compileComponents();
    dataServiceSpy=TestBed.inject(GithubDataService) as jasmine.SpyObj<GithubDataService>
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'GithubRepoShower'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('GithubRepoShower');
  });

  it('should render input with placeholder for Enter Github', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input')?.placeholder).toContain('Enter Github');
  });
});
