import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Star } from '../../Classes/StarClass/star';
import { ActivatedRoute, Router } from '@angular/router';
import { StarService } from '../../services/star.service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  activatedRoute : ActivatedRoute = inject(ActivatedRoute);

  starService : StarService = inject(StarService);

  router : Router = inject (Router);
  
  readonly formBuilder : FormBuilder = inject(FormBuilder);
  

  star! : Star ;
 
  StarForm! : FormGroup;

  ngOnInit(): void {
   
  
      // Initialize the form after data is fetched
      this.StarForm = this.formBuilder.group({
        name: [''  ,[Validators.required, Validators.minLength(3)]],
        price: [200 ,  [Validators.required, Validators.min(200)] ],
        photo: [null],
        category: ['' , Validators.required],
        description: ['' , [Validators.required, Validators.maxLength(500)]],
        state: ['' , [Validators.required,]]
      });
    }
    
  
  image ! : any;
  onFileChange(event: any): void {
  
  this.image = event.target.files[0];
    console.log(this.image);
    
    if (this.image) {
      this.StarForm.patchValue({ photo: this.image });
    }
  }
  

  onCreate(){
    let fd = new FormData();
    fd.append('name', this.StarForm.get('name')?.value);
    fd.append('price', this.StarForm.get('price')?.value);
    if(this.image){

      fd.append('photo', this.image);
    }
    fd.append('category', this.StarForm.get('category')?.value);
    fd.append('description', this.StarForm.get('description')?.value);
    fd.append('state', this.StarForm.get('state')?.value);



   
    
    this.starService.createStar(fd).subscribe(
      (data)=>{
        console.log("star created:" + JSON.stringify(data))
        this.router.navigate(['/admin'])
        alert('star created');
      },
      (err)=>{
        console.log(err);
        alert('sthg is wrong');
        
      }
    )

  }

  

  
 


}
