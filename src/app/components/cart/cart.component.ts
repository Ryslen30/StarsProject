import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { DinarPipe } from '../../pipes/dinar.pipe';
import { Star } from '../../Classes/StarClass/star';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DinarPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  stars !: Star[];
  private cartService : CartService = inject(CartService);

  
  
 
  ngOnInit(): void {
    this.stars = this.cartService.getCart();
   
    
    
  }


}
