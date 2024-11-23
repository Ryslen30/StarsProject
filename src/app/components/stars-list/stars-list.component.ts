import { Component, inject, OnInit } from '@angular/core';
import { Star } from '../../Classes/StarClass/star';
import { StarService } from '../../services/star.service';
import { DatePipe, JsonPipe } from '@angular/common';
import { DinarPipe } from '../../pipes/dinar.pipe';
import { StarItemComponent } from '../star-item/star-item.component';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-stars-list',
  standalone: true,
  imports: [StarItemComponent, FormsModule],
  templateUrl: './stars-list.component.html',
  styleUrls: ['./stars-list.component.css']
})
export class StarsListComponent implements OnInit {
  private _starService: StarService = inject(StarService);

  stars!: Star[]; // Original list of stars
  filteredStars: Star[] = []; // List of filtered stars
  category!: string;
  state!: string;
  name! : string;
 
  onUpdate($event: string) {
    this.getStars();
  }

  getStars() {
    this._starService.getStars().subscribe((data) => {
      this.stars = data;
      this.filteredStars = data // get the cards on init
     
    });
  }

  filter() {
    
    // Start filtering from the original list
    this.filteredStars = this.stars.filter((star) => {
      let matchesCategory = this.category
        ? star.category === this.category
        : true; // Match if no category selected
        if(this.category=="all"){
          matchesCategory=true;
        }
      let matchesState = this.state
        ? JSON.stringify(star.state) === this.state
        : true; // Match if no state selected
        if(this.state=="all"){
          matchesState=true;
        }

      return matchesCategory && matchesState;
    });

    // If no results, reset the filtered list and show an alert
    if (this.filteredStars.length === 0) {
      alert('No stars match the selected filters.');
      this.filteredStars = this.stars; // Reset to original list
    }
  }
  search( e :Event){
    let searchName =(e.target as HTMLInputElement).value.toLowerCase(); // we cant get value from a type event target ( we convert it to HTMLInputElement)
    this.filteredStars= this.stars.filter(
      (star)=> 
        star.name.toLowerCase().includes(searchName)
      
    )
  }



  ngOnInit() {
    this.getStars();
    
    
  }
}
