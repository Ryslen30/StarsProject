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
export const routes: Routes = [
  {path :'home', component: HomeComponent},
  { path: 'about', component: AboutComponent }, // Route for About
  { path: 'contact', component: ContactComponent }, // Route for Contact
  {path: 'stars', component: StarsListComponent }, // Route for stars
  {path:'rynou' , component: AdminComponent}, // Route for administration
  {path:'login',component: LoginComponent}, // Route for login
  {path:'signup',component: SignupComponent}, // Route for signup
  // {path:'forgotpassword',component: ForgotPasswordComponent}, // Route for forgot passwordng
  { path: '', component: HomeComponent }, 
  {path :'**', component: ErrorComponent},
  

        // Add other routes as needed
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }