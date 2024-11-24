import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../Classes/UserClass/user';
import { AdminService } from '../../services/admin.service';
import { AdminClass } from '../../Classes/AdminClass/admin-class';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [FormsModule , ReactiveFormsModule, NgClass],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.css'
})
export class ChangepasswordComponent implements OnInit {
  readonly userService : UserService = inject(UserService);
  activatedRoute : ActivatedRoute = inject(ActivatedRoute);

  adminService : AdminService = inject(AdminService);
  
  id : any; 
  user!:User;


  admin!:AdminClass;


  form! : FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      currentPass: ['', [Validators.required]],
      newPass: ['', [Validators.required]],
      confirmPass: ['', [Validators.required]],
    });
    this.form.get('confirmPass')?.setValidators([
      Validators.required,
      this.matchPasswords.bind(this),
    ]);
  }
  
  // Custom function to check if passwords match
  matchPasswords(control: any) {
    const newPass = this.form.get('newPass')?.value;
    return control.value === newPass ? null : { passwordsMismatch: true };
  }



  editUser() {
    const currentPass = this.form.get('currentPass')?.value;
    const newPass = this.form.get('newPass')?.value;
  
    // Send current and new passwords to the backend
    this.userService.updateUser(this.id, { currentPassword: currentPass, newPassword: newPass }).subscribe(
      (res) => {
        console.log("Password updated successfully", res);
        alert("Password updated successfully");
      },
      (err) => {
        console.error(err);
        alert(err.error.message || "An error occurred while updating the password");
      }
    );
  }
 editAdmin() {
  const currentPass = this.form.get('currentPass')?.value;
  const newPass = this.form.get('newPass')?.value;

  // Send current and new passwords to the backend
  this.adminService.updateAdmin(this.id, { currentPassword: currentPass, newPassword: newPass }).subscribe(
    (res) => {
      console.log("Password updated successfully", res);
      alert("Password updated successfully");
    },
    (err) => {
      console.error(err);
      alert(err.error.message || "An error occurred while updating the password");
    }
  );
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
 )
 this.adminService.getById(this.id).subscribe(
  (res)=>{
    this.admin = res;
  },
  (err)=>{
    console.log(err);
    
  }
)

 
}


}
