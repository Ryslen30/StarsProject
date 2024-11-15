import { Component, inject, OnInit } from '@angular/core';
import { Star } from '../../Classes/StarClass/star';
import { StarService } from '../../services/star.service';
import { DatePipe, JsonPipe } from '@angular/common';
import { DinarPipe } from '../../pipes/dinar.pipe';
import { StarItemComponent } from '../star-item/star-item.component';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-stars-list',
  standalone: true,
  imports: [StarItemComponent],
  templateUrl: './stars-list.component.html',
  styleUrl: './stars-list.component.css'
})
export class StarsListComponent implements OnInit {
  private _starService: StarService= inject(StarService);

  
  stars! :Star[];
  
  onUpdate($event: string) {
    this.getStars();
  }


getStars(){
  this._starService.getStars().subscribe(data => this.stars=data);
}

 


ngOnInit(){
  this.getStars();
}
}
