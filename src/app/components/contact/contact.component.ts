import { Component } from '@angular/core';
import emailjs from 'emailjs-com';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})

export class ContactComponent {
 

from_name: String ='';
email_id: String ='';
message: String ='';


ngOnInit() {
  // Initialize EmailJS with your User ID
  emailjs.init('BIu4hlHuTea4WKQnT'); // Replace with your actual User ID from EmailJS
}

//+
sendMail(){
  var params = {
    from_name :this.from_name,
    email_id : this.email_id,
    message :this.message,

  }
//-
emailjs.send("service_6ngl3zv", "template_rz883pf", params)
.then((res) => {
  alert("Success! Status: " + res.status);
})
.catch((error) => {
  console.error("Error sending email:", error);
});
}

}
