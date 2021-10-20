import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Repo } from '../model/Repo.model';

@Injectable({
  providedIn: 'root'
})
export class GithubDataService {

  constructor(private http: HttpClient) { }

  public fetchRepositories(name: string): Observable<Repo[] | undefined> {
    return this.http.get(this.entityReposFromName(name)).pipe(
      map((reposList: any) =>
        reposList.map((repo: any) => {
          let repoModel = new Repo();
          repoModel.Name = repo.name;
          repoModel.NumberOfComments = 0;
          repoModel.NumberOfStars = repo.stargazers_count;
          repoModel.NumberOfCommits = 0;
          repoModel.NumberOfForks = repo.forks_count;
          repoModel.OwnerAvatarUrl = repo.owner.avatar_url;
          repoModel.RepoUrl = repo.html_url;
          return repoModel
        })),
      // enrich model by #comments
      mergeMap((reposList: Repo[]) =>
        forkJoin(
          reposList.map((repo: Repo) => {
            return this.fetchNumberOfComments(name, repo.Name).pipe(
              map((numberOfComments: number) => {
                repo.NumberOfComments = numberOfComments;
                return repo;
              })
            )
          })
        ))
    );
  }

  public fetchNumberOfComments(entityName:string,repoName: string): Observable<number> {
    return this.http.get<any[]>(this.commentsUrlFromRepo(entityName,repoName)).pipe(
      map((res: any[]) => res.length),
    )
  }

  private entityReposFromName(entityName:string){
    return `https://api.github.com/users/${entityName}/repos`
  }
  private commentsUrlFromRepo(entityName:string, repoName:string){
    return `https://api.github.com/repos/${entityName}/${repoName}/comments`
  }
}
