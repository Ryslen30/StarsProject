import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Star } from '../../Classes/StarClass/star';
import { DinarPipe } from '../../pipes/dinar.pipe';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { StarService } from '../../services/star.service';


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
  private starService : StarService = inject(StarService);

  onUpdate(s: Star) {
    let s1: Star;
    s1 = s;
    s1.likes++;
    console.log("Updated star:", s1); // Log the star before sending
    this.starService.updateStar(s._id, s1).subscribe(
      (updatedStar) => {
        console.log("Successfully updated star:", updatedStar);
        this.updateEvent.emit(s._id);
      },
      (error) => {
        console.error("Error updating star:", error);
      }
    );
  }
  
  onClick(){
    console.log(this.star);
    this.cartService.addToCart(this.star);
    localStorage.setItem("star", JSON.stringify(this.star));
  }




}
