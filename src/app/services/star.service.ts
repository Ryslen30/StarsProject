import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Star } from '../Classes/StarClass/star';
import { Observable } from 'rxjs';

import { Commentaire } from '../Classes/CommentClass/commentaire';
@Injectable({
  providedIn: 'root'
})
export class StarService {
  URL = "http://127.0.0.1:3000/star/";

  private readonly http : HttpClient = inject(HttpClient);

  createStar(s : any): Observable<Star>{
    return this.http.post<Star>(this.URL + 'create' , s)
  }

  getStars(): Observable<Star[]> {
    return this.http.get<Star[]>(this.URL+'getStars');
  }
  getStarsById(id :string): Observable<Star>{
    return this.http.get<Star>(this.URL+'getStar/' +id);

  }
  updateStar(id:string, s : any):Observable<Star>{
    return this.http.put<Star>(this.URL+'StarUpdate/' + id, s );

  }


  deleteStar(id:string): Observable<Star>{
    return this.http.delete<Star>(this.URL+'deleteStar/' + id);
  }
  addComment(id:any, comment : Commentaire): Observable<Star>{
    return this.http.post<Star>(this.URL+'addCommentToStar/' + id , comment)
  }
 
  deleteComment(id:any , star : Star) : Observable<Comment>{
    return this.http.delete<Comment>(this.URL + star._id+ '/deleteComment/' + id)
  }

  
}
