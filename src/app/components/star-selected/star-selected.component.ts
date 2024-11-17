import { Component, inject, OnInit } from '@angular/core';
import { Star } from '../../Classes/StarClass/star';
import { StarService } from '../../services/star.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { Comment } from '../../Classes/CommentClass/comment';


@Component({
  selector: 'app-star-selected',
  standalone: true,
  imports: [RouterLink,CurrencyPipe,UpperCasePipe,FormsModule ],
  templateUrl: './star-selected.component.html',
  styleUrl: './star-selected.component.css'
})
export class StarSelectedComponent implements OnInit {
  star!: Star;
  id !: string;
 commentaire: Comment = {username : '', message : ''};




  private starService: StarService = inject(StarService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private cartService: CartService = inject(CartService);
  router : Router = inject(Router);





  
  
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.starService.getStarsById(this.id)
      .subscribe((data) => {
        this.star = data;
      });

    
  }
  onClick() {
    console.log(this.star);
    this.cartService.addToCart(this.star);
    localStorage.setItem('star', JSON.stringify(this.star)); // Save to localStorage
  }
  onAdd(){
   
    this.starService.addComment(this.id, this.commentaire).subscribe(
      (data)=>{
        console.log(data);
        console.log("added comment succesfully");
        this.commentaire = {username : '', message : ''};

      },
      (error)=>{
        console.log(error);
        
      }
    );  
    
  
    
  }
  Back(){
    this.router.navigate(['/stars']);
  }

}
