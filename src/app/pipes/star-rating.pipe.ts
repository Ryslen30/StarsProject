import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starRating',
  standalone: true
})
export class StarRatingPipe implements PipeTransform {

  
  transform(value: number, maxStars: number = 5): string {
    if (value < 0) value = 0;
    if (value > maxStars) value = maxStars;

    const fullStars = Math.floor(value); // Full stars
    const emptyStars = maxStars - Math.ceil(value); // Remaining stars to fill

    return '⭐'.repeat(fullStars) + '☆'.repeat(emptyStars);
  }

}
