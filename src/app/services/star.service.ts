import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Star } from '../Classes/StarClass/star';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StarService {
  URL = "http://127.0.0.1:3000/star/";

  private readonly http : HttpClient = inject(HttpClient);

  getStars(): Observable<Star[]> {
    return this.http.get<Star[]>(this.URL+'getStars');
  }
  getStarsById(id :string): Observable<Star>{
    return this.http.get<Star>(this.URL+'getStar/' +id);

  }
  updateStar(id:string, s : Star):Observable<Star>{
    return this.http.put<Star>(this.URL+'StarUpdate/' + id, s );

  }

  

  constructor() { }
}
