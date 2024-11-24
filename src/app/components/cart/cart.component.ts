import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { DinarPipe } from '../../pipes/dinar.pipe';
import { Star } from '../../Classes/StarClass/star';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ DatePipe, CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  

  stars !: Star[];
  private cartService : CartService = inject(CartService);

  totals: number = 0;
  

  ngOnInit(): void {
    this.stars = this.cartService.getCart();
   this.calculatTotal();
    
  }
  calculatTotal(){
    this.totals = 0;  
    let cart = JSON.parse(localStorage.getItem("cart") || '[]');
    for(let i=0;i<cart.length;i++){
     this.totals += cart[i].price; 
 
    }
  }
  public deleteFromCart(indice : number){
    let updatedStars = this.stars.splice(indice , 1);
   let cart = JSON.parse(localStorage.getItem("cart") || '[]');
   console.log(cart);
   cart.splice(indice ,1);
   localStorage.setItem("cart" , JSON.stringify(cart));
   console.log(cart);
   this.calculatTotal();

  }
}
