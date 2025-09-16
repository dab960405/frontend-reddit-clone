import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubredditModel } from './subreddit-response';
import { Observable } from 'rxjs';
// 1. Importa el environment
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {
  
  // 2. Define la URL base usando environment.apiUrl
  private apiUrl = `${environment.apiUrl}/subreddit`;

  constructor(private http: HttpClient) { }

  getAllSubreddits(): Observable<Array<SubredditModel>> {
    // 3. Usa this.apiUrl en lugar de la URL hardcodeada
    return this.http.get<Array<SubredditModel>>(this.apiUrl);
  }

  createSubreddit(subredditModel: SubredditModel): Observable<SubredditModel> {
    // 4. Usa this.apiUrl aquí también
    return this.http.post<SubredditModel>(this.apiUrl, subredditModel);
  }
}