import { Component, inject } from '@angular/core';
import { ContactComponent } from '../contact/contact.component';
import { Router, RouterLink,RouterLinkActive  } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { DinarPipe } from '../../pipes/dinar.pipe';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ContactComponent, RouterLink, CartComponent,RouterLinkActive,DinarPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
   readonly userService: UserService = inject(UserService);
   private router : Router = inject(Router);
 


  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    this.router.navigate(['/home']);


  }

 
}
