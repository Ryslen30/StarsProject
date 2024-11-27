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
    this.generatePDF();
    localStorage.removeItem("cart");
  }
    else{
      alert('Please fill out the form correctly');
    }
  }

  get name(){
    return this.payForm.get('name')?.value;
  }
  generatePDF() {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
    });
  
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
  
    doc.setFillColor('#000033');
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
  
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * pageWidth;
      const y = Math.random() * pageHeight;
      const starSize = Math.random() * 1.5;
      doc.setFillColor('#FFFFFF'); 
      doc.circle(x, y, starSize, 'F'); 
    }
  
    doc.setFillColor('#FFD700'); 
    doc.circle(pageWidth / 2, 120, 40, 'F'); 
  
    doc.setFontSize(24);
    doc.setTextColor('#FFD700');
    doc.text('Certificate of Star Ownership', pageWidth / 2, 180, { align: 'center' });
  
    const userName = this.payForm.get('name')?.value || 'Unknown';
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const starNames = cart.map((item: any) => item.name).join(', ') || 'Unnamed Star(s)';
    const purchaseDate = new Date().toLocaleDateString();
    const certificateId = `STAR-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  
    doc.setFontSize(14);
    doc.setTextColor('#FFFFFF'); 
    doc.text(`This certifies that ${userName} has officially named a star.`, 50, 230);
    doc.text(`Star Name(s): ${starNames}`, 50, 260);
    doc.text(`Date of Purchase: ${purchaseDate}`, 50, 290);
    doc.text(`Certificate ID: ${certificateId}`, 50, 320);
  
    doc.setFontSize(10);
    doc.setTextColor('#AAAAAA');
    doc.text('© Star Registry | For entertainment purposes only.', pageWidth / 2, pageHeight - 40, { align: 'center' });
  
    doc.save(`${userName}_Star_Certificate.pdf`);
  }
  
}
