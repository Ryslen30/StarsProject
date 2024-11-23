import { Component } from '@angular/core';
import { NasaService } from '../../services/nasa.service';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-view-stars',
  standalone: true,
  imports: [RouterLink, LoaderComponent],
  templateUrl: './view-stars.component.html',
  styleUrl: './view-stars.component.css'
})
export class ViewStarsComponent {
  apod: any;
  isLoading : boolean = false;

  constructor(private nasaService: NasaService) {}

  ngOnInit() {
    this.nasaService.getApod().subscribe((data) => {
      this.apod = data
      this.isLoading=true
    }
  );
  }
}
