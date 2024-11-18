import { Component } from '@angular/core';
import { NasaService } from '../../services/nasa.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-stars',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './view-stars.component.html',
  styleUrl: './view-stars.component.css'
})
export class ViewStarsComponent {
  apod: any;

  constructor(private nasaService: NasaService) {}

  ngOnInit() {
    this.nasaService.getApod().subscribe((data) => (this.apod = data));
  }
}
