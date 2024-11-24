import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  visible: boolean = false;
  private userService: UserService= inject(UserService);
  private readonly router : Router = inject(Router);
  readonly formbuilder: FormBuilder = inject(FormBuilder);
  loginForm!: FormGroup;
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
  ngOnInit(): void{
    this.loginForm = this.formbuilder.group({
      password: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.email]]

    });
   }
  


}
