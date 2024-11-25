import { Component } from '@angular/core';
import { NasaService } from '../../services/nasa.service';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from "../loader/loader.component";
import { StarRatingPipe } from '../../pipes/star-rating.pipe';

@Component({
  selector: 'app-view-stars',
  standalone: true,
  imports: [ LoaderComponent,StarRatingPipe],
  templateUrl: './view-stars.component.html',
  styleUrl: './view-stars.component.css'
})
export class ViewStarsComponent {
  apod: any;
  isLoading : boolean = false;
  rating!:number
  
  constructor(private nasaService: NasaService) {}

  ngOnInit() {
    this.nasaService.getApod().subscribe((data) => {
      this.apod = data;
      this.isLoading = true;
  
      const storedRating = localStorage.getItem('starRating');
      const storedDate = localStorage.getItem('ratingDate');
      const today = new Date().toISOString().split('T')[0];
  
      if (storedRating && storedDate === today) {
        this.rating = parseFloat(storedRating);
      } else {
        this.rating = Math.random() * 5;
        this.rating = parseFloat(this.rating.toFixed(1));
  
        localStorage.setItem('starRating', this.rating.toString());
        localStorage.setItem('ratingDate', today);
      }
    });
  }
  
}
