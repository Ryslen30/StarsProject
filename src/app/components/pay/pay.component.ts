import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.css'
})
export class PayComponent {
  payForm!:FormGroup;
  readonly formbuilder: FormBuilder = inject(FormBuilder);
  readonly router:Router = inject(Router);
  
 ngOnInit(): void{
   this.payForm = this.formbuilder.group({
     name: ['',[Validators.required,Validators.pattern('^[A-Z](.)*$')]],
     cardNumber: ['',[Validators.required,Validators.minLength(16)]],
     expirationDate: ['',[Validators.required,Validators.pattern('^(0[1-9]|1[0-2])/(0[1-9]|1[0-9]|2[0-9]|3[0-1])$')]],
     cvv: [0,[Validators.required,Validators.minLength(3),Validators.maxLength(3)]]
   });
  }
  public isValid(): boolean {
    const cardNumber = this.payForm.get('cardNumber')?.value;
    return cardNumber && cardNumber.length != 16 && this.payForm.get('cardNumber')?.dirty;
  }
  

  buy() {
    if(this.payForm.valid){
    alert('Payment successfully received');
    this.generatePDF();}
    else{
      alert('Please fill out the form correctly');
    }
  }

  get name(){
    return this.payForm.get('name')?.value;
  }

  generatePDF() {
    let doc = new jsPDF();
    let cart = JSON.parse(localStorage.getItem("cart") || '[]');
    
    doc.setFontSize(20);
    doc.text('Certificate of Star Ownership', 105, 20, { align: 'center' });
  
    let userName = this.payForm.get('name')?.value || 'Unknown';
    let starName = '';
    if (cart.length === 1) {
      starName = cart[0].name;
    } else {
      for (let i = 0; i < cart.length; i++) {
        starName += cart[i].name + ', ';
      }
    }
    
    let purchaseDate = new Date().toLocaleDateString();
  
    doc.setFontSize(12);
    doc.text(`This certifies that ${userName} has officially named a star.`, 20, 40);
    doc.text(`Star Name(s): ${starName}`, 20, 50);
    doc.text(`Date of Purchase: ${purchaseDate}`, 20, 70);
    doc.text(`Certificate ID: STAR-${Math.random().toString(36).substring(2, 8).toUpperCase()}`, 20, 80);
  
    
    doc.save(`${userName}_Star_Certificate.pdf`);
  }
}
