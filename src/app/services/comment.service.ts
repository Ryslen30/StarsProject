import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commentaire } from '../Classes/CommentClass/commentaire';
import { Star } from '../Classes/StarClass/star';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  URL = "http://127.0.0.1:3000/comment/";

  private readonly http : HttpClient = inject(HttpClient);

  getCommentById(id :any): Observable<Commentaire>{
   return this.http.get<Commentaire>(this.URL +"/getComments/" + id);

  }
  deleteComment(id:any , star : Star) : Observable<Comment>{
    return this.http.delete<Comment>(this.URL + star._id+ '/deleteComment/' + id)
  }

  constructor() { }
}
