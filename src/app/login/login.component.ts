import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el servicio Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoginFormVisible = false;

  constructor(private router: Router) {}

  closeLoginForm() {
    console.log("SE CERRO");
    this.isLoginFormVisible = false;
    this.router.navigate(['/']); // Redirige al componente raíz, que corresponde a la ruta '/' definida en tu enrutamiento.
  }
}


