import {Injectable } from '@angular/core';
import { Star } from '../Classes/StarClass/star';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  addToCart(star: Star) : void {
    if (star){
      let cart = this.getCart();
      if(cart){
        cart.push(star);
        localStorage.setItem('cart', JSON.stringify(cart));

      }
    console.log("tableau des stars :" + JSON.stringify(cart));
    
    }
  }
  getCart(){
    let cart =localStorage.getItem('cart');
    if(cart)
    return JSON.parse(cart);
  else
    return [];
  }
  
  

  constructor() { }
}
