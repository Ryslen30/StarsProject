import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Star } from '../../Classes/StarClass/star';
import { DinarPipe } from '../../pipes/dinar.pipe';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { StarService } from '../../services/star.service';
import { NgClass } from '@angular/common';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-star-item',
  standalone: true,
  imports: [DinarPipe, RouterLink,NgClass],
  templateUrl: './star-item.component.html',
  styleUrl: './star-item.component.css'
})
export class StarItemComponent {
  @Input() star! : Star;
  @Output() updateEvent = new EventEmitter<string>();
  private cartService : CartService = inject(CartService);
  private starService : StarService = inject(StarService);
  readonly userService: UserService = inject(UserService);
  readonly router : Router = inject(Router);

   i: number = 0;
  onUpdate(s: Star) {
     if(this.i==0){
      let s1: Star;
      this.i++;
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
  }
  

  onClick(){
     console.log(this.star);
    this.cartService.addToCart(this.star);
    localStorage.setItem("star", JSON.stringify(this.star));

  }




}
