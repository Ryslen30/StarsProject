import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { AdminComponent } from './components/admin/admin.component';
import { ErrorComponent } from './components/error/error.component';
import { StarsListComponent } from './components/stars-list/stars-list.component';

export const routes: Routes = [
  {path :'home', component: HomeComponent},
  { path: 'about', component: AboutComponent }, // Route for About
  { path: 'contact', component: ContactComponent }, // Route for Contact
  {path: 'stars', component: StarsListComponent }, // Route for stars
  {path:'rynou' , component: AdminComponent}, // Route for administration
  { path: '', component: HomeComponent }, 
  {path :'**', component: ErrorComponent},


    // Add other routes as needed
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
