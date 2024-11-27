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

  // generatePDF() {
  //   let doc = new jsPDF();
  //   let cart = JSON.parse(localStorage.getItem("cart") || '[]');
    
  //   doc.setFontSize(20);
  //   doc.text('Certificate of Star Ownership', 105, 20, { align: 'center' });
  
  //   let userName = this.payForm.get('name')?.value || 'Unknown';
  //   let starName = '';
  //   if (cart.length === 1) {
  //     starName = cart[0].name;
  //   } else {
  //     for (let i = 0; i < cart.length; i++) {
  //       starName += cart[i].name + ', ';
  //     }
  //   }
    
  //   let purchaseDate = new Date().toLocaleDateString();
  
  //   doc.setFontSize(12);
  //   doc.text(`This certifies that ${userName} has officially named a star.`, 20, 40);
  //   doc.text(`Star Name(s): ${starName}`, 20, 50);
  //   doc.text(`Date of Purchase: ${purchaseDate}`, 20, 70);
  //   doc.text(`Certificate ID: STAR-${Math.random().toString(36).substring(2, 8).toUpperCase()}`, 20, 80);
  
    
  //   doc.save(`${userName}_Star_Certificate.pdf`);
  // }
  generatePDF() {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
    });
  
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
  
    // Simulate a starry background
    doc.setFillColor('#000033'); // Deep space blue
    doc.rect(0, 0, pageWidth, pageHeight, 'F'); // Fill entire page with background color
  
    // Add stars manually
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * pageWidth;
      const y = Math.random() * pageHeight;
      const starSize = Math.random() * 1.5;
      doc.setFillColor('#FFFFFF'); // White for stars
      doc.circle(x, y, starSize, 'F'); // Add small white circles for stars
    }
  
    // Add a large central star
    doc.setFillColor('#FFD700'); // Golden yellow for the star
    doc.circle(pageWidth / 2, 120, 40, 'F'); // Central large star
  
    // Certificate Title
    doc.setFontSize(24);
    doc.setTextColor('#FFD700'); // Golden text
    doc.text('Certificate of Star Ownership', pageWidth / 2, 180, { align: 'center' });
  
    // User and Star Information
    const userName = this.payForm.get('name')?.value || 'Unknown';
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const starNames = cart.map((item: any) => item.name).join(', ') || 'Unnamed Star(s)';
    const purchaseDate = new Date().toLocaleDateString();
    const certificateId = `STAR-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  
    doc.setFontSize(14);
    doc.setTextColor('#FFFFFF'); // White text
    doc.text(`This certifies that ${userName} has officially named a star.`, 50, 230);
    doc.text(`Star Name(s): ${starNames}`, 50, 260);
    doc.text(`Date of Purchase: ${purchaseDate}`, 50, 290);
    doc.text(`Certificate ID: ${certificateId}`, 50, 320);
  
    // Footer
    doc.setFontSize(10);
    doc.setTextColor('#AAAAAA'); // Light gray footer text
    doc.text('© Star Registry | For entertainment purposes only.', pageWidth / 2, pageHeight - 40, { align: 'center' });
  
    // Save the PDF
    doc.save(`${userName}_Star_Certificate.pdf`);
  }
  
}
