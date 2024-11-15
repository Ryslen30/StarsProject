import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private userService: UserService= inject(UserService);
  private readonly router : Router = inject(Router);
  user={
    password : "",
    email : "",
  }
  error: any;
  token: any;
  login() {
    this.userService.login(this.user).subscribe(res=>{
      this.token = res;
      localStorage.setItem('token', this.token.mytoken);
      this.router.navigate(['/home'])

    }, err => {
      console.log(err)
      this.error=JSON.stringify(err.error);
    }
    
  )
  }



}
