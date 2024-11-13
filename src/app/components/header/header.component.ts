import { Component, inject } from '@angular/core';
import { ContactComponent } from '../contact/contact.component';
import { RouterLink,RouterLinkActive  } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../../../comp/src/app/services/cart.service';
import { Star } from '../../Classes/StarClass/star';
import { DinarPipe } from '../../pipes/dinar.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ContactComponent, RouterLink, CartComponent,RouterLinkActive,DinarPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
 
}
