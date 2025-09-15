import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VotePayload } from './vote-button/vote-payload';
import { Observable } from 'rxjs';
// 1. Importa el environment
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  // 2. Define la URL base usando environment.apiUrl
  private apiUrl = `${environment.apiUrl}/api/votes`;

  constructor(private http: HttpClient) { }

  vote(votePayload: VotePayload): Observable<any> {
    // 3. Usa this.apiUrl en lugar de la URL hardcodeada
    return this.http.post(this.apiUrl, votePayload);
  }
}