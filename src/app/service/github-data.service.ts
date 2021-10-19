import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubDataService {

  constructor(private http:HttpClient) { }

  public fetchRepositories(url:string): Observable<any> {
    return this.http.get(url);

  }

}
