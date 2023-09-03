import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  formulario: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    asunto: ['', Validators.required],
    descripcion: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // Opcional: Puedes realizar más inicializaciones en ngOnInit si es necesario.
  }

  onSubmit() {
    if (this.formulario.valid) {
      // Aquí puedes manejar el envío del formulario
      console.log(this.formulario.value);
    } else {
      // Manejar errores de validación
    }
  }
}
