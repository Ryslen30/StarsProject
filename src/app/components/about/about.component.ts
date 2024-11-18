import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  router : Router = inject (Router);
  onclick(){
    this.router.navigate(['/home']); // Navigate to home page when clicked 
  }
}
