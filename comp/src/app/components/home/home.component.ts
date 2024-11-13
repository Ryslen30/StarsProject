import { Component } from '@angular/core';
import { StarItemComponent } from '../star-item/star-item.component';
import { StarsListComponent } from '../stars-list/stars-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StarItemComponent, StarsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
