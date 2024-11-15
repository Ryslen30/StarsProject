import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../Classes/UserClass/user';

@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.css'
})
export class ChangepasswordComponent implements OnInit {
  readonly userService : UserService = inject(UserService);
  activatedRoute : ActivatedRoute = inject(ActivatedRoute);
  
  id : any; 
  user!:User;
  pass : any;

 edit(){
   this.user.password= this.pass;
   this.userService.updateUser(this.id,this.user).subscribe(
    (res)=>{
      console.log("updated successfully");
      
    },
    (err)=>{
      console.log(err);
      
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
 );
}


}
