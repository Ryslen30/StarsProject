import { inject, Injectable } from '@angular/core';
import { Star } from '../Classes/StarClass/star';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private stars: Star[]=[];
  
  addToCart(star: Star) : void {
    if (star){
    this.stars.push(star);
    console.log("tableau des stars :" +JSON.stringify(this.stars));
    
    }
  }
  getCart(){
    return this.stars;
  }
  
  

  constructor() { }
}
