import { Component, inject, OnInit } from '@angular/core';
import { Star } from '../../Classes/StarClass/star';
import { StarService } from '../../services/star.service';
import { DatePipe, JsonPipe } from '@angular/common';
import { DinarPipe } from '../../pipes/dinar.pipe';
import { StarItemComponent } from '../star-item/star-item.component';
import { CartService } from '../../services/cart.service';

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



getStars(){
  this._starService.getStars().subscribe(data => this.stars=data);
}
onUpdate(id : string) {
  const parkUpdated= this.stars.find(p=> p._id== id);
  if(parkUpdated){
    parkUpdated.likes++;
  }

 }
 


ngOnInit(){
  this.getStars();
}
}
