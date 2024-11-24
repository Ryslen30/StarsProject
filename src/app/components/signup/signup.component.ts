import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../Classes/UserClass/user';
import { Password } from 'primeng/password';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  private readonly userService: UserService = inject(UserService);
  private readonly router: Router = inject(Router);
  readonly formbuilder: FormBuilder = inject(FormBuilder);
  signupForm!: FormGroup;
  user: User = {
    "username": "",
    "lastname": "",
    "email": "",
    "password": "",
  };

  signUp() {
    this.userService.register(this.user).subscribe(
      res => {
        this.router.navigate(['/login']);
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group(
      {
        firstName: ['', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z ]*$')]],
        lastName: ['', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z ]*$')]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', Validators.required],
        termsAndConditions: [false, Validators.requiredTrue]
      },
    );
    this.signupForm.get('confirmPassword')?.setValidators([
      Validators.required,
      this.passwordMatchValidator.bind(this),
    ]);
  }

  // Custom validator to check if password and confirm password match
   passwordMatchValidator(control: any) {
    const password = this.signupForm.get('password')?.value;
    return control.value === password  ? null : { mismatch: true };
  }
}
