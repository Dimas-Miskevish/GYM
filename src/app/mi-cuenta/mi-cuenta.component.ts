import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.services';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css'],
})
export class MiCuentaComponent {
  constructor(private router: Router, private userService: UserService) {}

  logout() {
    // Llama al servicio de autenticación (UserService) para cerrar la sesión
    this.userService.logout() // Asumiendo que UserService tiene un método logout para cerrar sesión
      .then(() => {
        // Redirige al usuario a la página de inicio de sesión o a donde desees después del logout
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.error(error);
      });
  }
}






