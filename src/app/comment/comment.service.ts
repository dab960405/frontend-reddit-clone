import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentPayload } from './comment.payload';
import { Observable } from 'rxjs';
// 1. Importa el environment
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  // 2. Usa la URL del environment en lugar de localhost
  private apiUrl = `${environment.apiUrl}/comments`;

  constructor(private httpClient: HttpClient) { }

  
  getAllCommentsForPost(postId: number): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(`${this.apiUrl}/by-post/${postId}`);
  }

  
  postComment(commentPayload: CommentPayload): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl, commentPayload);
  }

  
  getAllCommentsByUser(name: string): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>(`${this.apiUrl}/by-user/${name}`);
  }
}