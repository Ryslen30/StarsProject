import { Component, inject, OnInit } from '@angular/core';
import { Star } from '../../Classes/StarClass/star';
import { StarService } from '../../services/star.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { Commentaire } from '../../Classes/CommentClass/commentaire';
import { UserService } from '../../services/user.service';
import { AdminService } from '../../services/admin.service';
import { StatePipe } from '../../pipes/state.pipe';


@Component({
  selector: 'app-star-selected',
  standalone: true,
  imports: [CurrencyPipe, UpperCasePipe, FormsModule, DatePipe,StatePipe],
  templateUrl: './star-selected.component.html',
  styleUrl: './star-selected.component.css'
})
export class StarSelectedComponent implements OnInit {

  private starService: StarService = inject(StarService);

  activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  private cartService: CartService = inject(CartService);

  router: Router = inject(Router);

  private commentService: CommentService = inject(CommentService);

  userService: UserService = inject(UserService);

  adminService: AdminService = inject(AdminService);


  star!: Star;
  id !: string;
  lesCom: Commentaire[] = [];
  commentaire: Commentaire = { username: '', message: '' };

  ngOnInit(): void {
    
    
    this.id = this.activatedRoute.snapshot.params['id'];

    let tokendata = this.userService.getDataFromToken();
    console.log(tokendata);

    this.commentaire.username = tokendata ? this.userService.getDataFromToken().name : 'Guest';
  
    console.log("username :" + this.commentaire.username);

    this.starService.getStarsById(this.id)
      .subscribe((data) => {
        this.star = data;

        if (this.star.comments) {
          data.comments.forEach(idComment => {
            this.commentService.getCommentById(idComment)
              .subscribe(
                (res) => {
                  if(res && res.message){
                    this.lesCom.unshift(res);
                    console.log(this.lesCom);

                  }

                  console.log(res)
                },
                (err) => {
                  console.log(err);

                }
              )
          }
          )
        }
      });
  }
  onClick() {
    if(this.userService.isLoggedIn()){

      console.log(this.star);
      this.cartService.addToCart(this.star);
      localStorage.setItem('star', JSON.stringify(this.star)); // Save to localStorage
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  onAdd() {
    if (!this.commentaire.message.trim()) {
      console.log("Empty message cannot be added.");
      return; // Prevent adding empty comments
    }
    this.starService.addComment(this.id, this.commentaire).subscribe(
      (updatedStar) => {
        console.log("Added comment successfully");
        const latestCommentId = updatedStar.comments[updatedStar.comments.length - 1];
        this.commentService.getCommentById(latestCommentId).subscribe(
          (latestComment) => {
            this.lesCom.unshift(latestComment); // Add the latest comment to the top of the array
          },
          (error) => {
            console.log("Error fetching latest comment:", error);
          }
        );
        this.commentaire.message = '';
      },
      (error) => {
        console.log("Error adding comment:", error);
      }
    );
  }


  Back() {
    this.router.navigate(['/home']);
  }
  deleteComment(indice: number) {
    let comment  = JSON.parse(JSON.stringify(this.lesCom[indice]));
    console.log(comment._id);
    this.starService.deleteComment(comment._id , this.star)
    .subscribe(
      ()=>{
        console.log("comment deleted")
        this.lesCom.splice(indice , 1);
        console.log("commentaires :" +JSON.stringify(this.lesCom));
        
      },
      (err)=>{
        console.log(err)
      }
    )
    console.log("commentaires :" +JSON.stringify(this.lesCom));
  }

  

}
