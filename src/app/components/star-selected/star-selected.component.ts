import { Component, inject, OnInit } from '@angular/core';
import { Star } from '../../Classes/StarClass/star';
import { StarService } from '../../services/star.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-star-selected',
  standalone: true,
  imports: [RouterLink,CurrencyPipe,UpperCasePipe],
  templateUrl: './star-selected.component.html',
  styleUrl: './star-selected.component.css'
})
export class StarSelectedComponent implements OnInit {
  star!: Star;
  private starService: StarService = inject(StarService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private cartService: CartService = inject(CartService);


  id !: string;
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.starService.getStarsById(this.id)
      .subscribe((data) => {
        this.star = data;
      });
  }
  onClick() {
    console.log(this.star);
    this.cartService.addToCart(this.star);
    localStorage.setItem('star', JSON.stringify(this.star)); // Save to localStorage
  }

}
