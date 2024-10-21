import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
   { path: '', component: HomeComponent }, // Default route
    { path: 'about', component: AboutComponent }, // Route for About
    { path: 'contact', component: ContactComponent }, // Route for Contact
    // Add other routes as needed
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
