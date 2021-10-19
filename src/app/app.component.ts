import { Component } from '@angular/core';
import {  Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { GithubDataService } from './service/github-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GithubRepoShower';
  constructor(private githubDataService:GithubDataService) {
  }

  urlInputChange= new Subject<string>()
  repositoriesStream= this.urlInputChange.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(url=>this.githubDataService.fetchRepositories(url))
  );

}
