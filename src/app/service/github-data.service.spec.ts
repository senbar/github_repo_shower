import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Repo } from '../model/Repo.model';

import { GithubDataService } from './github-data.service';

describe('GithubDataServiceService', () => {
  let service: GithubDataService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get'])

    TestBed.configureTestingModule({
      providers:[
        GithubDataService,
        {provide: HttpClient, useValue:spy}
      ]
    });
    httpSpy= TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    service = TestBed.inject(GithubDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct number of repos', ()=>{
    const stub=[{name: "stubName", stargazers_count: 4}];
    httpSpy.get.and.returnValue(of(stub));

    let fetched= service.fetchRepositories("_");

    fetched.subscribe(res=>
      {
        expect(res?.length).toBe(1);
        expect(httpSpy.get.calls.count()).toBe(1);
      })
  })

  it('should return correct number of comments',()=>{
    const stub=["first","second"];
    httpSpy.get.and.returnValue(of(stub))

    let fetched= service.fetchNumberOfComments("_", "_");

    fetched.subscribe(res=>{
      expect(res).toBe(2)
        expect(httpSpy.get.calls.count()).toBe(1);
    })

  })
});
