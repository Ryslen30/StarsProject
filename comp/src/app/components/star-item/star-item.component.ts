import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Star } from '../../Classes/StarClass/star';
import { DinarPipe } from '../../pipes/dinar.pipe';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-star-item',
  standalone: true,
  imports: [DinarPipe, RouterLink],
  templateUrl: './star-item.component.html',
  styleUrl: './star-item.component.css'
})
export class StarItemComponent {
  @Input() star! : Star;
  @Output() updateEvent = new EventEmitter<string>();
  private cartService : CartService = inject(CartService);

  onUpdate(){
    this.updateEvent.emit(this.star._id);
    
  }
  onClick(){
    console.log(this.star);
    this.cartService.addToCart(this.star);
  }




}
