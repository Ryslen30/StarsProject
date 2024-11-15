import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../Classes/UserClass/user';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
   readonly userService : UserService = inject(UserService);
   activatedRoute : ActivatedRoute = inject(ActivatedRoute);
   router : Router = inject(Router);

  id : any; 
  user!:User;

  onclick(){
    this.router.navigate(['/change/' + this.id]);
  }
ngOnInit(){
  this.id = this.activatedRoute.snapshot.params['id'];
  this.userService.getById(this.id).subscribe(
    (res)=>{
      this.user = res;
    },
    (err)=>{
      console.log(err);
      
    }
  );
}
}
