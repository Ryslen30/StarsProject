import { Component, inject, OnInit } from '@angular/core';
import { StarsListComponent } from '../stars-list/stars-list.component';
import { StarService } from '../../services/star.service';
import { Star } from '../../Classes/StarClass/star';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  starService : StarService = inject (StarService);

  stars : Star [] = [];
  filteredStars : Star[]= [];


  getStars() {
    this.starService.getStars().subscribe((data) => {
      this.stars = data; 
      this.filteredStars = data;    
    });
  }
  delete(id : string , indice : number){
    this.starService.deleteStar(id).subscribe(
      (data)=>{
        this.stars.splice(indice , 1);
        console.log("succesfully deleted");
        
      }
    )
  }
  search( e :Event){
    let searchName =(e.target as HTMLInputElement).value.toLowerCase(); // we cant get value from a type event target ( we convert it to HTMLInputElement)
    this.stars= this.filteredStars.filter(
      (star)=> 
        star.name.toLowerCase().includes(searchName)
      
    )
   
  }
  ngOnInit(){
    this.getStars();
  }
}
