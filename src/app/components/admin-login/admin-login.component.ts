import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  adminService : AdminService = inject(AdminService) ;
  AdminToken : any ;

  router : Router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      // let fd = new FormData();
      // fd.append('email', this.loginForm.get('email')?.value);
      // fd.append('password', this.loginForm.get('password')?.value);
      const loginData = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      };
      
      
      
      
      this.adminService.login(loginData).subscribe(
        (data) => {
          console.log('Logged in successfully', data);
          this.AdminToken = data
          localStorage.setItem('adminToken', this.AdminToken.mytoken)
          this.router.navigate(['/home']);
        },
        (err)=>{
          console.log(err);
          
        }
      )
    }
  }






}
