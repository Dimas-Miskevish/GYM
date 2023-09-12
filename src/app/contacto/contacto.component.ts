import { Component, OnInit } from '@angular/core';

import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';



@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent  {
  enviadoExitosamente: boolean = false;
  

  public sendEmail(e: Event) {
    e.preventDefault();

    emailjs.sendForm('service_cbp6ata', 'template_v1xb09e', e.target as HTMLFormElement, 'vJRzSu8zVn0eEOlaw')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
        this.enviadoExitosamente = true; // Establece enviadoExitosamente en true después del envío exitoso
      }, (error) => {
        console.log(error.text);
      });
  }
}







