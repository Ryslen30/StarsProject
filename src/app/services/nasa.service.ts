import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NasaService {
  private apiKey = 'Nxv7wFDGrtlgogMMhZ4XMMkQSzDv4MCEiYDogGfI';
  private apodUrl = `https://api.nasa.gov/planetary/apod`;

  constructor(private http: HttpClient) {}

  getApod() {
    return this.http.get(`${this.apodUrl}?api_key=${this.apiKey}`);
  }
}
