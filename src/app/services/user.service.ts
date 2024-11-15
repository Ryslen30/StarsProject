import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../Classes/UserClass/user';
import { Observable, retry } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL = "http://127.0.0.1:3000/user/";
  private readonly http : HttpClient = inject(HttpClient);

  constructor() { }
  register(user: User){
    return this.http.post(this.URL+'register', user);
  }

  login(user : any){
    return this.http.post(this.URL+'login', user);
  }
  isLoggedIn(){
    let token= localStorage.getItem('token');
    if(token){
      return true;
    }else{
      return false;
    }
  }
  getDataFromToken(){
    let token= localStorage.getItem('token');
    if(token){
      let data = JSON.parse(window.atob(token.split('.')[1]));
      return data;
    }
  }
  getById(id : string): Observable<User>{
    return this.http.get<User>(this.URL+'getUserByid/' +id);
  }


}
