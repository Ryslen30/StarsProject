import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../Classes/UserClass/user';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  private readonly userService : UserService = inject(UserService);
  private readonly router : Router = inject(Router);
  
  user: User = {
    "username": "",
    "lastname": "",
    "email": "",
    "password": "",
  }

  signUp(){

    this.userService.register(this.user)
    .subscribe(res => {
      this.router.navigate(['/login'])
    }, err => {
      console.log(err);
    });

  }



}
