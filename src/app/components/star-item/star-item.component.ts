import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Star } from '../../Classes/StarClass/star';
import { DinarPipe } from '../../pipes/dinar.pipe';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { StarService } from '../../services/star.service';
import { NgClass, NgStyle } from '@angular/common';
import { UserService } from '../../services/user.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-star-item',
  standalone: true,
  imports: [DinarPipe, RouterLink, NgClass,],
  templateUrl: './star-item.component.html',
  styleUrl: './star-item.component.css'
})
export class StarItemComponent {
  @Input() star!: Star;
  @Output() updateEvent = new EventEmitter<string>();
  private cartService: CartService = inject(CartService);
  private starService: StarService = inject(StarService);
  readonly userService: UserService = inject(UserService);
  admineService : AdminService = inject(AdminService)
  readonly router: Router = inject(Router);

  i: number = 0; 

  ngOnInit() {
    const likedStar = localStorage.getItem(`likedStar_${this.star._id}`);
    if (likedStar) {
      this.i = 1;
    } else {
      this.i = 0;
      this.star.likes -= 1;
    }
  }

  onUpdate(s: Star) {
    if (this.i > 0) {
      this.i = 0;
      s.likes -= 1;

      localStorage.removeItem(`likedStar_${s._id}`);
    } else {
      this.i = 1;
      s.likes += 1;

      localStorage.setItem(`likedStar_${s._id}`, 'true');
    }

    const updatedStar: Star = { ...s, likes: s.likes };

    this.starService.updateStar(s._id, updatedStar).subscribe(
      (updatedStarFromServer) => {
        console.log('Successfully updated star:', updatedStarFromServer);
        this.updateEvent.emit(s._id); 
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
    alert("Star added to cart successfully")
  }
}
