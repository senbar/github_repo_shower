import { Component } from '@angular/core';
import {  Subject } from 'rxjs';
import { debounceTime,  mergeMap } from 'rxjs/operators';
import { GithubDataService } from './service/github-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GithubRepoShower';
  constructor(private githubDataService: GithubDataService) {
    this.urlInputChange.next("senbar")
  }

  urlInputChange = new Subject<string>()
  repositoriesStream = this.urlInputChange.pipe(
    debounceTime(1000),
    mergeMap(url => this.githubDataService.fetchRepositories(url))
  )
  
  // wanted to do error handling but unfortunately hit github api request limit
  // repositoryHandle= this.repositoriesStream.subscribe(
  //   succ=>{console.log("success")}
  //   , error=>{ console.log("no user found") })

}
