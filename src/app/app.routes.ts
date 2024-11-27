import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { AdminComponent } from './components/admin/admin.component';
import { ErrorComponent } from './components/error/error.component';
import { StarsListComponent } from './components/stars-list/stars-list.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { CartComponent } from './components/cart/cart.component';
import { StarSelectedComponent } from './components/star-selected/star-selected.component';
import { UserComponent } from './components/user/user.component';
import { ViewStarsComponent } from './components/view-stars/view-stars.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { EditComponent } from './components/edit/edit.component';
import { AddComponent } from './components/add/add.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { adminGuard } from './guards/admin.guard';
import { PayComponent } from './components/pay/pay.component';

export const routes: Routes = [
  {path :'home', component: HomeComponent},
  { path: 'about', component: AboutComponent }, // Route for About
  { path: 'contact', component: ContactComponent }, // Route for Contact
  {path: 'stars', component: StarsListComponent }, // Route for stars
  {path: 'pay', component: PayComponent }, // Route for stars
  {path:'login',component: LoginComponent}, // Route for login
  {path:'signup',component: SignupComponent},
  {path:'cart',component: CartComponent}, // Route for cart
  {path:'stars/:id',component: StarSelectedComponent}, // Route for star selection
  {path:'user/:id' , component: UserComponent}, // Route for user
  {path:'viewstars',component: ViewStarsComponent}, // Route for
  {path:'change/:id', component: ChangepasswordComponent}, // Route for change
  {path:'forgotpassword',component: ForgotpasswordComponent}, // Route for forgot password
  {path:'pay',component: PayComponent}, // Route for pay
  
  
  {path: 'rynou', component: AdminLoginComponent},
  {path: 'admin' ,
    canActivate: [adminGuard],
    children :[
      {path :'' , component: AdminComponent},
      {path: 'add', component: AddComponent },
      {path: ':id', component: ChangepasswordComponent},
      {path: 'edit/:id', component: EditComponent },
      
     ]

   },

  
  {path: '', component: HomeComponent },  
  {path :'**', component: ErrorComponent},
  

       
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
