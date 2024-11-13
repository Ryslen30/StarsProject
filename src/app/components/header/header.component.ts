import { Component } from '@angular/core';
import { ContactComponent } from '../contact/contact.component';
import { RouterLink,  } from '@angular/router';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ContactComponent, RouterLink, CartComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
