import { Component, inject } from '@angular/core';
import { ContactComponent } from '../contact/contact.component';
import { Router, RouterLink,RouterLinkActive  } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { DinarPipe } from '../../pipes/dinar.pipe';
import { UserService } from '../../services/user.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ContactComponent, RouterLink, CartComponent,RouterLinkActive,DinarPipe,NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
   readonly userService: UserService = inject(UserService);
   private router : Router = inject(Router);
 


  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/home']);


  }
  isActive(route: string): boolean {
    return this.router.url === route;
  }


 
}
