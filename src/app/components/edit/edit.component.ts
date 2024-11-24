import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StarService } from '../../services/star.service';
import { Star } from '../../Classes/StarClass/star';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../app.routes';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  activatedRoute : ActivatedRoute = inject(ActivatedRoute);

  starService : StarService = inject(StarService);

  readonly formBuilder : FormBuilder = inject(FormBuilder);

  router : Router = inject(Router);
  
  id!: string ;
  star! : Star ;
 
  UpdateStarForm! : FormGroup;

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.starService.getStarsById(this.id).subscribe((data) => {
      this.star = data;
  
      // Initialize the form after data is fetched
      this.UpdateStarForm = this.formBuilder.group({
        name: [this.star.name],
        price: [this.star.price],
        photo: [''],
        category: [this.star.category],
        description: [this.star.description],
        state: [this.star.state] 
      });
    }
  )
    
    
  }
  image ! : any;
  onFileChange(event: any): void {
    const file = event.target.files[0];
    console.log(file);
    
  //  this.image =event.target.files[0].lastModified + '.' + event.target.files[0].type.split('/')[1];
  this.image = event.target.files[0];
    console.log(this.image);
    
    if (this.image) {
      this.UpdateStarForm.patchValue({ photo: this.image });
    }
  }
  

  onUpdate(id: string , s : Star){
    let fd = new FormData();
    fd.append('name', this.UpdateStarForm.get('name')?.value);
    fd.append('price', this.UpdateStarForm.get('price')?.value);
    if(this.image){

      fd.append('photo', this.image);
    }
    fd.append('category', this.UpdateStarForm.get('category')?.value);
    fd.append('description', this.UpdateStarForm.get('description')?.value);
    fd.append('state', this.UpdateStarForm.get('state')?.value);
    this.starService.updateStar(id , fd).subscribe(
      ()=>{
        console.log("star updated")
        alert('updated successfully')
        this.router.navigate(['/admin'])
      },
      (err)=>{
        console.log(err);
        
      }
    )

  }

  

  
 
}

