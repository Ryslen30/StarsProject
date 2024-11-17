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
  imports: [DinarPipe, RouterLink, NgClass],
  templateUrl: './star-item.component.html',
  styleUrl: './star-item.component.css'
})
export class StarItemComponent {
  @Input() star!: Star;
  @Output() updateEvent = new EventEmitter<string>();
  private cartService: CartService = inject(CartService);
  private starService: StarService = inject(StarService);
  readonly userService: UserService = inject(UserService);
  readonly router: Router = inject(Router);

  i: number = 0; // Tracks like state

  ngOnInit() {
    // Retrieve the like state from localStorage (if available)
    const likedStar = localStorage.getItem(`likedStar_${this.star._id}`);
    if (likedStar) {
      // If the star was liked (stored in localStorage), set the like state accordingly
      this.i = 1;
    } else {
      this.i = 0;
      // Decrement the likes of the star if it was not liked
      this.star.likes -= 1;
    }
  }

  // Update the like status
  onUpdate(s: Star) {
    if (this.i > 0) {
      // Unlike logic
      this.i = 0;
      s.likes -= 1;

      // Remove the like from localStorage
      localStorage.removeItem(`likedStar_${s._id}`);
    } else {
      // Like logic
      this.i = 1;
      s.likes += 1;

      // Store the like state in localStorage
      localStorage.setItem(`likedStar_${s._id}`, 'true');
    }

    const updatedStar: Star = { ...s, likes: s.likes };

    // Call the service to update the star on the backend
    this.starService.updateStar(s._id, updatedStar).subscribe(
      (updatedStarFromServer) => {
        console.log('Successfully updated star:', updatedStarFromServer);
        this.updateEvent.emit(s._id); // Emit the update event
      },
      (error) => {
        console.error('Error updating star:', error);
      }
    );
  }

  onClick() {
    console.log(this.star);
    this.cartService.addToCart(this.star);
    localStorage.setItem('star', JSON.stringify(this.star));
  }
}
