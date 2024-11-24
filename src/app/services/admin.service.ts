import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminClass } from '../Classes/AdminClass/admin-class';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  URL = "http://127.0.0.1:3000/admin/";
  private readonly http : HttpClient = inject(HttpClient);
  login(user : any) :Observable<AdminClass>{
    return this.http.post<AdminClass>(this.URL+'login', user);
  }
  isLoggedIn(){
    let token = localStorage.getItem("adminToken");
    if(token){
      return true;
    }
    else{
      return false;
    }
  }
  getDataFromToken(){
    let token= localStorage.getItem('adminToken');
    if(token){
      let data = JSON.parse(window.atob(token.split('.')[1]));
      return data;
    }
  }
  getById(id : string): Observable<AdminClass>{
    return this.http.get<AdminClass>(this.URL+'getAdminByid/' +id);
  }
  updateAdmin(id:string, admin : any):Observable<AdminClass>{
    return this.http.put<AdminClass>(this.URL+'adminUpdate/' + id, admin );
  }
 
}
