import { Component } from '@angular/core';
import { StarItemComponent } from '../star-item/star-item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [StarItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
