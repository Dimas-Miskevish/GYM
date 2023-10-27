import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent {

  usuarioAutenticado: boolean = false;

  constructor(private router: Router) {
    // Aquí puedes implementar la lógica de autenticación para establecer el valor de usuarioAutenticado
  }

  cerrarMisTurnos() {
    this.usuarioAutenticado = false;
    this.router.navigate(['/mi-cuenta']); // Redirige al componente raíz, que corresponde a la ruta '/' definida en tu enrutamiento.

    console.log("se cerro");
  }
}






